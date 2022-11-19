var salaModel = require("../models/salaModel");

function listar(req, res) {
    var idAndar = req.query.idAndar
    salaModel.listar(idAndar)
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
    var numeroSala = req.body.numeroSalaServer;
    var descricaoSala = req.body.descricaoServer;
    var idAndar = req.body.idAndarServer;

    if (numeroSala == undefined) {
        res.status(400).send("O numero da sala está undefined!");
    } else if (descricaoSala == undefined) {
        res.status(400).send("A descricao da sala está undefined!");
    } else if (idAndar == undefined) {
        res.status(400).send("O ID da sala está undefined!");
    } else {
        salaModel.cadastrar(numeroSala, descricaoSala, idAndar)
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
    var numeroSala = req.body.numeroSalaServer;
    var descricaoSala = req.body.descricaoServer;
    var idSala = req.body.idSalaServer;

    if (numeroSala == undefined) {
        res.status(400).send("O numero da sala está undefined!");
    } else if (descricaoSala == undefined) {
        res.status(400).send("A descricao da sala está undefined!");
    } else if (idSala == undefined) {
        res.status(400).send("O ID da sala está undefined!");
    } else {
        salaModel.atualizar(numeroSala, descricaoSala, idSala)
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
    var idSala = req.body.idSalaServer

    if (idSala == undefined) {
        res.status(400).send("O ID do acesso está undefined!");
    } else {
        salaModel.excluir(idSala)
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
    excluir
}