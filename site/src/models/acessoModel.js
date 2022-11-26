var database = require("../database/config")

function listar(idFaculdade) {
    var instrucao = `SELECT * FROM usuario WHERE fk_faculdade = ${idFaculdade} and is_ativo = 1;`;
    return database.executar(instrucao);
}

function listarpPorId(idAcesso) {
    var instrucao = `
    SELECT faculdade.*, usuario.nome, usuario.id_usuario ,usuario.email, usuario.senha, usuario.tipo_usuario FROM faculdade 
    INNER JOIN usuario on fk_faculdade = id_faculdade 
    WHERE id_usuario = ${idAcesso};`;
    return database.executar(instrucao);
}

function cadastrar(nome, email, senha, tipoUsuario, idFaculdade) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, tipo_usuario, fk_faculdade, is_ativo) 
        VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}', ${idFaculdade}, 1);
    `;
    return database.executar(instrucao);
}

function atualizar(nome, email, senha, tipoUsuario, idAcesso) {
    var instrucao = `
        UPDATE usuario SET nome = '${nome}', email = '${email}', tipo_usuario = '${tipoUsuario}',  senha = '${senha}' 
        WHERE id_usuario = ${idAcesso};
    `;

    return database.executar(instrucao);
}

function excluir(idAcesso) {
    var instrucao = `
        UPDATE usuario SET is_ativo = 0 where id_usuario = ${idAcesso}
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir,
    listarpPorId
};