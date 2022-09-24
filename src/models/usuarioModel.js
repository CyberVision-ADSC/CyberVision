var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT * FROM usuario;
    `;
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

async function cadastrar(nomeFantasia, razao, cnpj, cep, nome, email, senha) {
    var instrucao = `
    INSERT INTO faculdade (nome_fantasia, razao_social, cnpj, cep) VALUES ('${nomeFantasia}', '${razao}', '${cnpj}', '${cep}');
    `;
    await database.executar(instrucao);
    return cadastroUsuario(nome, email, senha, cnpj)
}

async function cadastroUsuario(nome, email, senha, cnpj) {
    var instrucaoSelect = `
    SELECT id_faculdade FROM faculdade WHERE cnpj = '${cnpj}';`
    await database.executar(instrucaoSelect).then(async (faculdade) => {
        var fkFaculdade = Object.values(JSON.parse(JSON.stringify(faculdade)))
        var idFaculdade = fkFaculdade[0].id_faculdade

        var instrucao = `
            INSERT INTO usuario(nome, email, senha, fk_faculdade) VALUES ('${nome}', '${email}', '${senha}', ${idFaculdade});
        `;
        return await database.executar(instrucao);
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    entrar,
    listar,
    cadastrar,
    cadastroUsuario
};