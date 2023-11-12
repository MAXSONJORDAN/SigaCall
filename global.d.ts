import { Knex } from "knex";

// global.d.ts
declare global {
    var _db: Knex;

    // Declaração de variáveis ou funções globais
    const minhaVariavelGlobal: string;
    function minhaFuncaoGlobal(param: string): void;
}

export { }