var database = require("../database/config")

function listar(idFaculdade) {
    var instrucao = `
        SELECT * FROM usuario WHERE fk_faculdade = ${idFaculdade};
    `;
    return instrucao
}

function cadastrar(nome, email, senha, idFaculdade) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fk_faculdade) 
        VALUES ('${nome}', '${email}', '${senha}', ${idFaculdade});
    `;
    return instrucao
}

function atualizar(nome, email, senha, idFaculdade, idAcesso) {

}

function excluir(idAcesso) {

}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
};