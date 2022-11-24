var database = require("../database/config")

function listarMaquinasPorFaculdade(idFaculdade) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
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
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE sala.id_sala = ${idSala};
    `;
    return database.executar(instrucao);
}

function listarMaquinaPorId(idMaquina) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.id_andar, andar.identificador_andar, processo.* FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    left join processo as processo on processo.fk_computador = computador.id_computador 
    WHERE computador.id_computador = ${idMaquina} order by processo.data_hora_atualizado desc LIMIT 10;
    `
    return database.executar(instrucao);
}

function cadastrar(identificadorComputador, idSala, hostname) {
    var instrucao = `INSERT INTO computador (identificador_computador, hostname, fk_sala, is_ativo) VALUES ('${identificadorComputador}', '${hostname}', ${idSala}, 1)`;
    return database.executar(instrucao);
}

function atualizar(identificadorComputador, idSala, idMaquina) {
    var instrucao = `UPDATE computador SET identificador_computador = '${identificadorComputador}', fk_sala = ${idSala} where id_computador = ${idMaquina}; `;
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

function listarQuantidadeFiltroMaquinas(idFaculdade) {
    var instrucao = `
    select "Problema-fisico" as problema, count(*) as total FROM faculdade
        INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
        INNER JOIN sala ON andar.id_andar = sala.fk_andar
        INNER JOIN computador ON sala.id_sala = computador.fk_sala
        where computador.problema_fisico = 1 and computador.is_ativo = 1 and faculdade.id_faculdade = ${idFaculdade}
        union all
        select "Problema-disco" as problema, count(*) as total FROM faculdade
        INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
        INNER JOIN sala ON andar.id_andar = sala.fk_andar
        INNER JOIN computador ON sala.id_sala = computador.fk_sala
        where computador.problema_disco = 1 and computador.is_ativo = 1 and faculdade.id_faculdade = ${idFaculdade}
        union all
        select "Problema-cpu" as problema, count(*) as total FROM faculdade
        INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
        INNER JOIN sala ON andar.id_andar = sala.fk_andar
        INNER JOIN computador ON sala.id_sala = computador.fk_sala
        where computador.problema_cpu = 1 and computador.is_ativo = 1 and faculdade.id_faculdade = ${idFaculdade}
        union all
        select "Problema-memoria" as problema, count(*) as total FROM faculdade
        INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
        INNER JOIN sala ON andar.id_andar = sala.fk_andar
        INNER JOIN computador ON sala.id_sala = computador.fk_sala
        where computador.problema_memoria = 1 and computador.is_ativo = 1 and faculdade.id_faculdade = ${idFaculdade};
    `

    return database.executar(instrucao);
}

function listarQuantidadeFiltroMaquinasPorSala(idFaculdade, idSala) {
    var instrucao = `
    select "Problema-fisico" as problema, count(*) as total FROM faculdade
        INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
        INNER JOIN sala ON andar.id_andar = sala.fk_andar
        INNER JOIN computador ON sala.id_sala = computador.fk_sala
        where computador.problema_fisico = 1 and computador.is_ativo = 1 and faculdade.id_faculdade = ${idFaculdade} and sala.id_sala = ${idSala}
        union all
        select "Problema-disco" as problema, count(*) as total FROM faculdade
        INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
        INNER JOIN sala ON andar.id_andar = sala.fk_andar
        INNER JOIN computador ON sala.id_sala = computador.fk_sala
        where computador.problema_disco = 1 and computador.is_ativo = 1 and faculdade.id_faculdade = ${idFaculdade} and sala.id_sala = ${idSala}
        union all
        select "Problema-cpu" as problema, count(*) as total FROM faculdade
        INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
        INNER JOIN sala ON andar.id_andar = sala.fk_andar
        INNER JOIN computador ON sala.id_sala = computador.fk_sala
        where computador.problema_cpu = 1 and computador.is_ativo = 1 and faculdade.id_faculdade = ${idFaculdade} and sala.id_sala = ${idSala}
        union all
        select "Problema-memoria" as problema, count(*) as total FROM faculdade
        INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
        INNER JOIN sala ON andar.id_andar = sala.fk_andar
        INNER JOIN computador ON sala.id_sala = computador.fk_sala
        where computador.problema_memoria = 1 and computador.is_ativo = 1 and faculdade.id_faculdade = ${idFaculdade} and sala.id_sala = ${idSala};
    `

    return database.executar(instrucao);
}

//filtros da dash
function filtrarPorCpu(idFaculdade) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade} AND computador.problema_cpu = 1 AND computador.is_ativo = 1;
    `;
    return database.executar(instrucao);
}

function filtrarPorCpuComSala(idFaculdade, idSala) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade} AND sala.id_sala = ${idSala} AND computador.problema_cpu = 1 AND computador.is_ativo = 1;
    `;
    return database.executar(instrucao);
}

function filtrarPorDisco(idFaculdade) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade} AND computador.problema_disco = 1 AND computador.is_ativo = 1;
    `;
    return database.executar(instrucao);
}

function filtrarPorDiscoComSala(idFaculdade, idSala) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade} AND sala.id_sala = ${idSala} AND computador.problema_disco = 1 AND computador.is_ativo = 1;
    `;
    return database.executar(instrucao);
}

function filtrarPorFisico(idFaculdade) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade} AND computador.problema_fisico = 1 AND computador.is_ativo = 1;
    `;
    return database.executar(instrucao);
}

function filtrarPorFisicoComSala(idFaculdade, idSala) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade} AND sala.id_sala = ${idSala} AND computador.problema_fisico = 1 AND computador.is_ativo = 1;
    `;
    return database.executar(instrucao);
}

function filtrarPorMemoria(idFaculdade) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade} AND computador.problema_memoria = 1 AND computador.is_ativo = 1;
    `;
    return database.executar(instrucao);
}

function filtrarPorMemoriaComSala(idFaculdade, idSala) {
    var instrucao = `
    SELECT computador.*, sala.identificador_sala, andar.identificador_andar, computador.problema_cpu, computador.problema_disco, computador.problema_memoria, computador.problema_fisico FROM faculdade
    INNER JOIN andar ON faculdade.id_faculdade = andar.fk_faculdade
    INNER JOIN sala ON andar.id_andar = sala.fk_andar
    INNER JOIN computador ON sala.id_sala = computador.fk_sala
    WHERE faculdade.id_faculdade = ${idFaculdade} AND sala.id_sala = ${idSala} AND computador.problema_memoria = 1 AND computador.is_ativo = 1; 
    `;
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    atualizar,
    excluir,
    listarMaquinasPorFaculdade,
    listarMaquinasPorSala,
    listarMaquinasPorHostname,
    validarHostNameExistente,
    listarMaquinaPorId,
    listarQuantidadeFiltroMaquinas,
    listarQuantidadeFiltroMaquinasPorSala,
    
    filtrarPorCpu,
    filtrarPorCpuComSala,
    filtrarPorDisco,
    filtrarPorDiscoComSala,
    filtrarPorFisico,
    filtrarPorFisicoComSala,
    filtrarPorMemoria,
    filtrarPorMemoriaComSala
};