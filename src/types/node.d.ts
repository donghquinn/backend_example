declare global {
    namespace ProcessEnv {
        interface NodeJs {
            // 어플리케이션 관련
            APP_PORT: number;
            NODE_ENV: string;

            // MYSQL 관련
            MYSQL_USER: string;
            MYSQL_PASSWD: string;
            MYSQL_HOST: string;
            MYSQL_PORT: string;
            MYSQL_NAME: string;
        }
    }
}

export {};
