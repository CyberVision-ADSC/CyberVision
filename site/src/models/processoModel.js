var database = require("../database/config")

function listar(idMaquina) {
    var instrucao = `
    SELECT processo.* FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    LEFT JOIN processo as processo on processo.fk_computador = computador.id_computador 
    WHERE computador.id_computador = ${idMaquina} order by processo.data_hora_atualizado desc LIMIT 10;
    `;
    return database.executar(instrucao);
}

function kill(idMaquina, pid) {
    var instrucao = `
        INSERT INTO processo_matar (pid_processo, is_executado, fk_computador) values (${pid}, 0, ${idMaquina});
    `;
    database.executarAzure(instrucao);
    return database.executar(instrucao);
}

function notificarAluno(idMaquina) {
    var instrucao = `
        INSERT INTO notificar_aluno (is_executado,fk_computador) values (0, ${idMaquina});
    `;
    database.executarAzure(instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    kill,
    notificarAluno
};