var database = require("../database/config")

function listar(idFaculdade) {
    var instrucao = `
        SELECT * FROM usuario WHERE fk_faculdade = ${idFaculdade};
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, email, senha, idFaculdade) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fk_faculdade) 
        VALUES ('${nome}', '${email}', '${senha}', ${idFaculdade});
    `;
    return database.executar(instrucao);
}

function atualizar(nome, email, senha, idAcesso) {
    var instrucao = `
        UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}' 
        WHERE id_usuario = ${idAcesso};
    `;

    return database.executar(instrucao);
}

function excluir(idAcesso) {
    var instrucao = `
        DELETE FROM usuario where id_usuario = ${idAcesso}
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
};