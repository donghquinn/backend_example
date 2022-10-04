
import { Mysql } from "libraries/database";
import { KoaServer } from "server";
import { Logger } from "./logger.utils";

// GraceFul 한 프로세스 종료
export function shutdown(server: KoaServer) {
    const mysql = new Mysql();
    try {
        // 종료
        server.stop();
        mysql.stop();
        
        Logger.info('[SYSTEM] Graceful Shutdown');

        process.exitCode = 0;
    } catch (error) {
        Logger.error('[SYSTEM_ERROR] Error Detected While Graceful Shutdown');
        Logger.error('%o', error);

        process.exitCode = 1;
    }
}
