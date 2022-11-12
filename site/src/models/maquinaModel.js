var database = require("../database/config")

function listarMaquinasPorFaculdade(idFaculdade) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade};
    `;
    return database.executar(instrucao);
}

function listarMaquinasPorHostname(hostname) {
    var instrucao = `
    select * from faculdade 
    inner join andar on faculdade.id_faculdade = andar.fk_faculdade
    inner join sala on  andar.id_andar = sala.fk_andar
    inner join computador on sala.id_sala = computador.fk_sala
    where computador.hostname like '%${hostname}%';
    `;
    return database.executar(instrucao);
}

function listarMaquinasPorSala(idSala) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE sala.id_sala = ${idSala};
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

function cadastrar(identificadorComputador, idSala, hostname) {
    var instrucao = `INSERT INTO computador (identificador_computador, hostname, fk_sala, is_ativo) VALUES ('${identificadorComputador}', '${hostname}', ${idSala}, 1)`;
    return database.executar(instrucao);
}

function atualizar(identificadorComputador, idMaquina, hostname) {
    var instrucao = `UPDATE computador SET identificador_computador = '${identificadorComputador}', hostname = '${hostname}' WHERE id_computador = ${idMaquina}`;
    return database.executar(instrucao);
}

function excluir(idComputador) {
    var instrucao = `UPDATE computador SET is_ativo = 0 where id_computador = ${idComputador}`;
    return database.executar(instrucao);
}

function validarHostNameExistente(hostname) {
    var instrucao = `SELECT * FROM computador WHERE hostname = '${hostname}';`
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    atualizar,
    excluir,
    listarMaquinasPorFaculdade,
    listarMaquinasPorSala,
    listarMaquinasComProblemas,
    listarMaquinasPorHostname,
    validarHostNameExistente
};