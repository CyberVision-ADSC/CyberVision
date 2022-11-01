var database = require("../database/config")

function listarMaquinasPorFaculdade(idFaculdade) {
    var instrucao = `
    SELECT computador.* FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade};
    `;
    return database.executar(instrucao);
}

function listarMaquinasPorSala(idSala) {
    var instrucao = `
        SELECT * FROM computador WHERE fk_sala = ${idSala};
    `;
    return database.executar(instrucao);
}

function listarMaquinasComProblemas(idFaculdade) {
    var instrucao = `
    SELECT computador.* FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    INNER JOIN relatorio ON computador.id_computador = relatorio.id_relatorio
    WHERE faculdade.id_faculdade = ${idFaculdade} AND relatorio.uso_ram >= 80 OR relatorio.uso_disco >= 80 OR relatorio.uso_cpu >= 80;
`;
return database.executar(instrucao);
}

function cadastrar(processador, placaMae, ram, memoria, sistemaOperacional, fkSala) {
    var instrucao = `
    INSERT INTO computador (processador, placa_mae, ram, memoria, sistema_operacional, fk_sala) 
    VALUES ('${processador}', '${placaMae}', ${ram}, ${memoria}, '${sistemaOperacional}', ${fkSala})
    `;
    return database.executar(instrucao);
}

function atualizar(processador, placaMae, ram, memoria, sistemaOperacional, fkSala, idMaquina) {
    var instrucao = `
    UPDATE computador SET processador = '${processador}', placa_mae = '${placaMae}', ram = ${ram}, 
    memoria = ${memoria}, sistema_operacional = '${sistemaOperacional}', fk_sala = ${fkSala} 
    WHERE id_computador = ${idMaquina};
    `;

    return database.executar(instrucao);
}

function excluir(idComputador) {
    var instrucao = `
        DELETE FROM computador where id_computador = ${idComputador}
    `;
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    atualizar,
    excluir,

    listarMaquinasPorFaculdade,
    listarMaquinasPorSala,
    listarMaquinasComProblemas
};