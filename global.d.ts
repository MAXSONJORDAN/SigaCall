import { Knex } from "knex";
import { env } from "process"; 654
import { Socket } from "socket.io";

// global.d.ts
declare global {
    var _db: Knex;
    var io: Socket;
    var socketUrl: string;

    namespace NodeJS {
        interface ProcessEnv {
            // NODE_ENV: 'development' | 'production';
            JWT_KEY: string
            // Adicione outras variáveis ​​de ambiente conforme necessário
        }
    }
    // Declaração de variáveis ou funções globais
    const minhaVariavelGlobal: string;
    function minhaFuncaoGlobal(param: string): void;
}

export { }