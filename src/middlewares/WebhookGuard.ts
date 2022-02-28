import { NextFunction, Request } from '@app/controllers/types';
import { createHmac } from 'crypto';
import { Response } from 'express';
import { ENV, SHORTCUT_SECRET_KEY } from '../utils/constants';

function WebhookGuard(req: Request, _: Response, next: NextFunction) {
  try {
    const signature = req.headers['payload-signature'] ?? '';

    if (ENV === 'dev') return next();

    const message = Buffer.from(JSON.stringify(req.body)).toString('utf8');
    const meSignature = createHmac('sha256', SHORTCUT_SECRET_KEY!)
      .update(message)
      .digest('hex');

    if (meSignature !== signature) {
      next({ message: 'Shortcut Signature is not valid', code: 400 });
      return;
    }

    next();
  } catch {
    next({ message: 'Failed on check Shortcut Signature', code: 400 });
  }
}

export default WebhookGuard;
