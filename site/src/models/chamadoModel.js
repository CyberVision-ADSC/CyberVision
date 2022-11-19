var database = require("../database/config")

function listar(idFaculdade) {
    var instrucao = `
    SELECT chamados.*, DATE_FORMAT(data_hora_criacao, "%d/%m/%Y") as data_hora_criacao_formatada, DATE_FORMAT(data_hora_conclusao, "%d/%m/%Y") as data_hora_conclusao_formatada, andar.identificador_andar, sala.identificador_sala, computador.sistema_operacional FROM andar 
    JOIN sala ON andar.id_andar = sala.fk_andar
    JOIN computador ON sala.id_sala = computador.fk_sala
    JOIN chamados ON chamados.fk_computador = computador.id_computador
    WHERE andar.fk_faculdade = ${idFaculdade} AND computador.is_ativo = 1 order by status_chamado = 'Pendente' desc;
    `;
    return database.executar(instrucao);
}

function listarPorMaisRecente(idFaculdade) {
    var instrucao = `
    SELECT chamados.*, DATE_FORMAT(data_hora_criacao, "%d/%m/%Y") as data_hora_criacao_formatada, DATE_FORMAT(data_hora_conclusao, "%d/%m/%Y") as data_hora_conclusao_formatada, andar.identificador_andar, sala.identificador_sala, computador.sistema_operacional FROM andar 
    JOIN sala ON andar.id_andar = sala.fk_andar
    JOIN computador ON sala.id_sala = computador.fk_sala
    JOIN chamados ON chamados.fk_computador = computador.id_computador
    WHERE andar.fk_faculdade = ${idFaculdade} AND computador.is_ativo = 1 order by chamados.data_hora_criacao desc;
    `;
    return database.executar(instrucao);
}

function listarPorMenosRecente(idFaculdade) {
    var instrucao = `
    SELECT chamados.*, DATE_FORMAT(data_hora_criacao, "%d/%m/%Y") as data_hora_criacao_formatada, DATE_FORMAT(data_hora_conclusao, "%d/%m/%Y") as data_hora_conclusao_formatada, andar.identificador_andar, sala.identificador_sala, computador.sistema_operacional FROM andar 
    JOIN sala ON andar.id_andar = sala.fk_andar
    JOIN computador ON sala.id_sala = computador.fk_sala
    JOIN chamados ON chamados.fk_computador = computador.id_computador
    WHERE andar.fk_faculdade = ${idFaculdade} AND computador.is_ativo = 1 order by chamados.data_hora_criacao asc;
    `;
    return database.executar(instrucao);
}

function alterarStatus(idChamado, data) {
    var instrucao = `
        UPDATE chamados SET status_chamado = 'Finalizado', data_hora_conclusao = '${data}' WHERE id_chamado = ${idChamado};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarPorMaisRecente,
    listarPorMenosRecente,
    alterarStatus
};