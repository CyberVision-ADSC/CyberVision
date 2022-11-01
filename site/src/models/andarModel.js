var database = require("../database/config")

function listar(idFaculdade) {
    var instrucao = `
        SELECT * FROM andar WHERE fk_faculdade = ${idFaculdade};
    `;
    return database.executar(instrucao);
}

function cadastrar(numeroAndar, descricaoAndar, idFaculdade) {
    var instrucao = `
        INSERT INTO andar (identificador_andar, descricao_andar, fk_faculdade)
        VALUES ('${numeroAndar}', '${descricaoAndar}', ${idFaculdade});
    `;
    return database.executar(instrucao);
}

function atualizar(idAndar, numeroAndar, descricaoAndar) {
    var instrucao = `
        UPDATE andar SET identificador_andar = '${numeroAndar}', descricao_andar = '${descricaoAndar}' 
        WHERE id_andar = ${idAndar};
    `;

    return database.executar(instrucao);
}

function excluir(idAndar) {
    var instrucao = `
        DELETE FROM andar where id_andar = ${idAndar}
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
};