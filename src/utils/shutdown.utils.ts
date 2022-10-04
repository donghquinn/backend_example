
import { KoaServer } from "server";
import { Logger } from "./logger.utils";

// GraceFul 한 프로세스 종료
export function shutdown(server: KoaServer) {
    try {
        // 서버 종료
        server.stop();

        Logger.info('[SYSTEM] Graceful Shutdown');

        process.exitCode = 0;
    } catch (error) {
        Logger.error('[SYSTEM_ERROR] Error Detected While Graceful Shutdown');
        Logger.error('%o', error);

        process.exitCode = 1;
    }
}