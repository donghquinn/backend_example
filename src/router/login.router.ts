import Router from 'koa-router';

const loginRouter = new Router();

// TODO login router -> JWT Auth 를 적용 예정
loginRouter.post('/login', (ctx) => {
    ctx.body.id
});

export { loginRouter };
