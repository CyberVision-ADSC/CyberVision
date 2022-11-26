var database = require("../database/config")

function listar(idAndar) {
    var instrucao = `
        select sa.*, comp.total_computador, qtd_problema.total_computador as total_problemas from andar 
        left join sala as sa on andar.id_andar = sa.fk_andar
        left join (select id_computador, count(*) as total_computador, fk_sala from computador group by fk_sala) as comp on sa.id_sala = comp.fk_sala
        left join (select id_computador, count(*) as total_computador, fk_sala from computador WHERE computador.is_ativo = 1 AND (computador.problema_cpu = 1 OR computador.problema_disco = 1 OR computador.problema_memoria = 1 OR computador.problema_fisico = 1)) as qtd_problema on sa.id_sala = comp.fk_sala
        where id_andar = ${idAndar};
    `;
    return database.executar(instrucao);
}

function listarPorId(idSala) {
    var instrucao = `
        select sa.*, comp.total_computador, qtd_problema.total_computador as total_problemas from andar 
        left join sala as sa on andar.id_andar = sa.fk_andar
        left join (select id_computador, count(*) as total_computador, fk_sala from computador group by fk_sala) as comp on sa.id_sala = comp.fk_sala
        left join (select id_computador, count(*) as total_computador, fk_sala from computador WHERE computador.is_ativo = 1 AND (computador.problema_cpu = 1 OR computador.problema_disco = 1 OR computador.problema_memoria = 1 OR computador.problema_fisico = 1)) as qtd_problema on sa.id_sala = comp.fk_sala
        where id_sala = ${idSala};
    `;
    return database.executar(instrucao);
}

function cadastrar(numeroSala, descricaoSala, idAndar) {
    var instrucao = `
        INSERT INTO sala (identificador_sala, descricao_sala, fk_andar, is_ativo)
        VALUES ('${numeroSala}', '${descricaoSala}', ${idAndar}, 1);
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
        UPDATE sala SET is_ativo = 0 WHERE id_sala = ${idSala};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir,
    listarPorId
};