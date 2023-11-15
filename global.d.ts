import { Knex } from "knex";
import { Socket } from "socket.io";

// global.d.ts
declare global {
    var _db: Knex;
    var io: Socket;
    var socketUrl: string;

    // Declaração de variáveis ou funções globais
    const minhaVariavelGlobal: string;
    function minhaFuncaoGlobal(param: string): void;
}

export { }