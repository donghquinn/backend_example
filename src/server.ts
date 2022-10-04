import Koa from 'koa';
import json from 'koa-json';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import {Server} from 'http'
import { Logger } from './utils';

// Server 및 라우터 시작
export class KoaServer {
    private port: number;

    private server: Server | null;

    private koa: Koa;


    constructor() {
        this.port = Number(process.env.APP_PORT);
        this.koa = new Koa();
        this.server = null;
    }

    private attachMiddleWare() {
        this.koa.use(helmet());
        this.koa.use(json());
        this.koa.use(bodyParser());
        this.koa.use(logger((str) => Logger.info('[MAIN] %o', str)));
    }

    start() {
        if (!this.server) {
            this.attachMiddleWare();

            this.server = this.koa.listen(this.port, () => {
                const message = `[SERVER] Server Is Now Listening On ${this.port}`;
                const environment = `[NODE_ENVIRONMENT] ${process.env.NODE_ENV}`;
                const wrapChar = '@'.repeat(message.length);

                Logger.info(wrapChar);
                Logger.info(message);
                Logger.info(environment);
                Logger.info(wrapChar);
            });

            return;
        }
        Logger.info('[SERVER] Server Already Started. Ignore.')
    }

    stop() {
        if (this.server) {
            const listening = this.server;

            if (listening) {
                this.server.close();

                Logger.info('[SERVER] Server is Closed.')
            }
        }
    }
}
