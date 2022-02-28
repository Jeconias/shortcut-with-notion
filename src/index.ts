import App from './core/App';
import { PORT } from './utils/constants';
import ShortcutController from './controllers/ShortcutController';
import HandlerError from './middlewares/HandlerError';
import WebhookGuard from './middlewares/WebhookGuard';

const app = new App();

app.server.get('/', (_, res) => res.json({ done: 'yes!' }));
app.server.post('/', WebhookGuard, ShortcutController.webhook);
app.server.use(HandlerError);

app.server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
