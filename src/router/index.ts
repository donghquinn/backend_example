import Router from 'koa-router';
import { loginRouter } from './login.router';

const routerV1 = new Router<Record<string, never>>();

routerV1.use(loginRouter.routes());

export { routerV1 };
