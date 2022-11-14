var database = require("../database/config")

function listar(idFaculdade) {
    var instrucao = `
    select andar.*, sa.total_sala, comp.total_computador from andar 
    left join (select id_sala, count(*) as total_sala, fk_andar from sala group by fk_andar) as sa on andar.id_andar = sa.fk_andar
    left join (select id_computador, count(*) as total_computador, fk_sala from computador group by fk_sala) as comp on sa.id_sala = comp.fk_sala
    where fk_faculdade = ${idFaculdade};
    `;
    return database.executar(instrucao);
}

function cadastrar(numeroAndar, descricaoAndar, idFaculdade) {
    var instrucao = `
        INSERT INTO andar (identificador_andar, descricao_andar, fk_faculdade, is_ativo)
        VALUES ('${numeroAndar}', '${descricaoAndar}', ${idFaculdade}, 1);
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
        UPDATE andar SET is_ativo = 0 WHERE id_andar = ${idAndar};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
};