var database = require("../database/config")

function quantidadeMaquinasAtivas(idFaculdade) {
    var instrucao = `
        SELECT count(computador.id_computador) AS quantidade_ativo FROM andar 
        JOIN sala ON andar.id_andar = sala.fk_andar
        JOIN computador ON sala.id_sala = computador.fk_sala
        WHERE computador.is_ativo = 1 AND andar.fk_faculdade = ${idFaculdade} GROUP BY computador.is_ativo;
    `;
    return database.executar(instrucao);
}

function quantidadeMaquinasInativas(idFaculdade) {
    var instrucao = `
        SELECT count(computador.id_computador) AS quantidade_inativo FROM andar 
        JOIN sala ON andar.id_andar = sala.fk_andar
        JOIN computador ON sala.id_sala = computador.fk_sala
        WHERE computador.is_ativo = 0 AND andar.fk_faculdade = ${idFaculdade} GROUP BY computador.is_ativo;
    `;
    return database.executar(instrucao);
}

function quantidadeMaquinasProblemas(idFaculdade) {
    var instrucao = `
        SELECT count(computador.id_computador) AS quantidade_problema FROM andar 
        JOIN sala ON andar.id_andar = sala.fk_andar
        JOIN computador ON sala.id_sala = computador.fk_sala
        WHERE andar.fk_faculdade = ${idFaculdade} AND computador.is_ativo = 1 AND (computador.problema_cpu = 1 OR computador.problema_disco = 1 OR computador.problema_memoria = 1 OR computador.problema_fisico = 1);
    `;
    return database.executar(instrucao);
}

module.exports = {
    quantidadeMaquinasAtivas,
    quantidadeMaquinasInativas,
    quantidadeMaquinasProblemas
};