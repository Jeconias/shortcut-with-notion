import { ErrorRequestHandlerAPI } from '@app/controllers/types';

const HandlerError: ErrorRequestHandlerAPI = (err, _, resp, __) => {
  const defaultData = {
    ...err,
    code: err.code || 422,
    data:
      typeof err.data === 'object'
        ? { message: err.data.toString(), ...err.data }
        : err.data || {},
  };

  resp.status(defaultData.code).send(defaultData);
  console.error(defaultData);
};

export default HandlerError;
