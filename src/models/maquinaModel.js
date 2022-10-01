var database = require("../database/config")

function listar(idSala) {
    var instrucao = `
        SELECT * FROM computador WHERE fk_sala = ${idSala};
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
    listar,
    cadastrar,
    atualizar,
    excluir
};