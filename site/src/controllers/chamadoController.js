var chamadoModel = require("../models/chamadoModel");

function listar(req, res) {
    var idFaculdade = req.query.idFaculdade
    chamadoModel.listar(idFaculdade)
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

function listarPorMaisRecente(req, res) {
    var idFaculdade = req.query.idFaculdade

    chamadoModel.listarPorMaisRecente(idFaculdade)
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

function listarPorMenosRecente(req, res) {
    var idFaculdade = req.query.idFaculdade

    chamadoModel.listarPorMenosRecente(idFaculdade)
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

function alterarStatus(req, res) {
    var idChamado = req.body.idChamado
    var data = req.body.dataAtual

    if (idChamado == undefined) {
        res.status(400).send("O ID do chamado está undefined!");

    } else if (data == undefined) {
        res.status(400).send("A data do chamado está undefined!");
    } else {
        chamadoModel.alterarStatus(idChamado, data)
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
    listarPorMaisRecente,
    listarPorMenosRecente,
    alterarStatus
}