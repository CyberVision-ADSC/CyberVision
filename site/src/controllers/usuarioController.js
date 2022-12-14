var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    if (resultado.length == 1) {
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeFantasia = req.body.nomeFantasiaServer;
    var razao = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nomeFantasia == undefined) {
        res.status(400).send("Seu nome fantasia está undefined!");
    } else if (razao == undefined) {
        res.status(400).send("Sua razão está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if(cep == undefined){
        res.status(400).send("Seu cep está undefined!");
    } else if(nome == undefined){
        res.status(400).send("Seu nome está undefined!");
    } else if(email == undefined){
        res.status(400).send("Seu email está undefined!");
    } else if(senha == undefined){
        res.status(400).send("Seu senha está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeFantasia, razao, cnpj, cep, nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var idAcesso = req.body.idAcessoServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (idAcesso == undefined) {
        res.status(400).send("O ID do Acesso está undefined!");
    } else {
        usuarioModel.atualizar(nome, email, idAcesso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    entrar,
    cadastrar,
    atualizar
}