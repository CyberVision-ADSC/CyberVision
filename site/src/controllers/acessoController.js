var acessoModel = require("../models/acessoModel");

function listar(req, res) {
    var idFaculdade = req.query.idFaculdade

    acessoModel.listar(idFaculdade)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function listarpPorId(req, res) {
    var idAcesso = req.query.idAcesso

    acessoModel.listarpPorId(idAcesso)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipoUsuario = req.body.tipoUsuarioServer;
    var idFaculdade = req.body.idFaculdadeServer

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idFaculdade == undefined) {
        res.status(400).send("O ID da faculdade está undefined!");
    } else if (tipoUsuario == undefined) {
        res.status(400).send("o tipo do usuario está undefined!");
    } else {
        acessoModel.cadastrar(nome, email, senha, tipoUsuario, idFaculdade)
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
    var senha = req.body.senhaServer;
    var tipoUsuario = req.body.tipoUsuarioServer;
    var idAcesso = req.body.idAcessoServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idAcesso == undefined) {
        res.status(400).send("O ID do Acesso está undefined!");
    } else if (tipoUsuario == undefined) {
        res.status(400).send("o tipo do usuario está undefined!");
    } else {
        acessoModel.atualizar(nome, email, senha, tipoUsuario, idAcesso)
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

function excluir(req, res) {
    var idAcesso = req.body.idAcessoServer

    if (idAcesso == undefined) {
        res.status(400).send("O ID do acesso está undefined!");
    } else {
        acessoModel.excluir(idAcesso)
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
    listar,
    cadastrar,
    atualizar,
    excluir,
    listarpPorId
}