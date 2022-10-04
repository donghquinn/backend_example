import { MysqlError } from "error";
import { Pool, createPool } from "mysql2/promise";
import { DbQueryResult, Sql } from "types";
import { Logger } from "utils";

export class Mysql {
    private static instance: Mysql;

    private config: object;

    private pool: Pool;

    constructor() {
        this.config = {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWD,
            port: Number(process.env.MYSQL_PORT),
            database: process.env.MYSQL_NAME,
            waitForConnections: true,
            connectionLimit: 30,
            queueLimit: 0,
            supportBigNumbers: true,
            bigNumberStrings: true,
        };

        this.pool = createPool(this.config);
    }

    public static getInstance() {
        if (this.instance) {
            this.instance = new Mysql();
        }

        return this.instance;
    }

    public static async query<T>(sql: Sql, options?: unknown): Promise<DbQueryResult<T>> {
        const { pool } = Mysql.getInstance();

        try {
            const [result] = await pool.query<DbQueryResult<T>>(sql, options);

            return result;
        } catch (error) {
            if (error instanceof MysqlError) {
                throw new MysqlError('[MYSQL]', 'DATABASE_ERROR', error.message);
            }

            if (error instanceof Error) {
                throw new MysqlError('[MYSQL]', 'OTHER_DATABASE_ERROR', error.message);
            }

            throw new MysqlError('[MYSQL]', 'OTHER_DATABASE_ERROR', JSON.stringify(error));
        }
    }

    stop() {
        if (this.pool) {
            this.pool.end();

            Logger.info('[MYSQL] Server Is Gracefully Closed');
        }
    }
}
