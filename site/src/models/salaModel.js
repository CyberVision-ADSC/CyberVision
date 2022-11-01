var database = require("../database/config")

function listar(idAndar) {
    var instrucao = `
        SELECT * FROM sala WHERE fk_andar = ${idAndar};
    `;
    return database.executar(instrucao);
}

function cadastrar(numeroSala, descricaoSala, idAndar) {
    var instrucao = `
        INSERT INTO sala (identificador_sala, descricao_sala, fk_andar)
        VALUES ('${numeroSala}', '${descricaoSala}', ${idAndar});
    `;
    return database.executar(instrucao);
}

function atualizar(numeroSala, descricaoSala, idSala) {
    var instrucao = `
        UPDATE sala SET identificador_sala = '${numeroSala}', descricao_sala = '${descricaoSala}' 
        WHERE id_sala = ${idSala};
    `;

    return database.executar(instrucao);
}

function excluir(idSala) {
    var instrucao = `
        DELETE FROM sala where id_sala = ${idSala}
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
};