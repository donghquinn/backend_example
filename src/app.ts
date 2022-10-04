import './env';
import { KoaServer } from "server";
import { shutdown } from 'utils';

const server = new KoaServer();

// 서버 시작
server.start();

// Graceful 한 종료
process.on('SIGTERM', () => shutdown(server));
