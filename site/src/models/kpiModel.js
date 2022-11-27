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

function quantidadeChamadosPendentes(idFaculdade) {
    var instrucao = `
    SELECT count(computador.id_computador) AS quantidade_chamados FROM andar 
    JOIN sala ON andar.id_andar = sala.fk_andar
    JOIN computador ON sala.id_sala = computador.fk_sala
    JOIN chamados ON chamados.fk_computador = computador.id_computador
    WHERE andar.fk_faculdade = ${idFaculdade} AND computador.is_ativo = 1 AND chamados.status_chamado = 'Pendente';
    `;
    return database.executar(instrucao);
}


function quantidadeProblemas(idFaculdade) {

    var instrucao = `
    SELECT COUNT(problema_memoria) AS ram FROM computador JOIN sala on fk_sala = id_sala JOIN andar ON fk_andar = id_andar JOIN faculdade ON fk_faculdade = id_faculdade WHERE problema_memoria > 0 AND fk_faculdade = ${idFaculdade}
    UNION ALL
    SELECT COUNT(problema_disco) FROM computador JOIN sala ON fk_sala = id_sala JOIN andar ON fk_andar = id_andar JOIN faculdade ON fk_faculdade = id_faculdade WHERE problema_disco > 0 AND fk_faculdade = ${idFaculdade}
    UNION ALL
    SELECT COUNT(problema_cpu) FROM computador JOIN sala ON fk_sala = id_sala JOIN andar ON fk_andar = id_andar JOIN faculdade ON fk_faculdade = id_faculdade WHERE problema_cpu > 0 AND fk_faculdade = ${idFaculdade}
    UNION ALL
    SELECT COUNT(problema_fisico) FROM computador JOIN sala ON fk_sala = id_sala JOIN andar ON fk_andar = id_andar JOIN faculdade ON fk_faculdade = id_faculdade WHERE problema_fisico > 0 AND fk_faculdade = ${idFaculdade};

    `;

    return database.executar(instrucao);
}

function quantidadeProblemasAndar(idFaculdade) {

    var instrucao = `
    SELECT rel_geral.total as problemas_totais,identificador_andar as andar FROM andar 
    JOIN sala ON andar.id_andar = sala.fk_andar
    JOIN computador ON sala.id_sala = computador.fk_sala
    LEFT JOIN relatorio ON relatorio.fk_computador = computador.id_computador
    LEFT JOIN (select id_relatorio, count(*) as total, fk_computador from relatorio
     where (uso_cpu >= 90 or uso_disco >= 90 or uso_ram >= 90) 
     AND DATE(data_hora) BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -10 DAY) AND CURRENT_DATE()) as rel_geral 
    on rel_geral.fk_computador = computador.id_computador
    WHERE andar.fk_faculdade = ${idFaculdade} group by andar.id_andar;
    `;

    return database.executar(instrucao);
}

function grafTempoReal(idFaculdade) {

    var instrucao = `

    SELECT uso_cpu, uso_disco, uso_ram,fk_computador FROM relatorio JOIN sala ON fk_sala = id_sala JOIN                  
    andar ON fk_andar = id_andar JOIN faculdade ON fk_faculdade = id_faculdade WHERE fk_computador = ${idFaculdade} ORDER BY id_relatorio DESC LIMIT 1;     

    `;

    return database.executar(instrucao);
}

module.exports = {
    quantidadeMaquinasAtivas,
    quantidadeMaquinasInativas,
    quantidadeMaquinasProblemas,
    quantidadeChamadosPendentes,
    quantidadeProblemas,
    quantidadeProblemasAndar,
    grafTempoReal
};