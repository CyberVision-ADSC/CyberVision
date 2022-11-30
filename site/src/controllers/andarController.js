var andarModel = require("../models/andarModel");

function listar(req, res) {
    var idFaculdade = req.query.idFaculdade

    andarModel.listar(idFaculdade)
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

function listarProblemasPorAndar(req, res) {
    var id_andar = req.query.idAndar

    andarModel.listarProblemasPorAndar(id_andar)
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

function listarPorId(req, res) {
    var idAndar = req.query.idAndar

    andarModel.listarPorId(idAndar)
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
    var numeroAndar = req.body.numeroAndarServer;
    var descricaoAndar = req.body.descricaoServer;
    var idFaculdade = req.body.idFaculdadeServer;

    if (numeroAndar == undefined) {
        res.status(400).send("O numero do andar está undefined!");
    } else if (descricaoAndar == undefined) {
        res.status(400).send("A descricao do andar está undefined!");
    } else if (idFaculdade == undefined) {
        res.status(400).send("O ID da faculdade está undefined!");
    } else {
        andarModel.cadastrar(numeroAndar, descricaoAndar, idFaculdade)
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
    var idAndar = req.body.idAndarServer
    var numeroAndar = req.body.numeroAndarServer;
    var descricaoAndar = req.body.descricaoServer;

    if (numeroAndar == undefined) {
        res.status(400).send("O numero do andar está undefined!");
    } else if (descricaoAndar == undefined) {
        res.status(400).send("A descricao do andar está undefined!");
    } else if (idAndar == undefined) {
        res.status(400).send("O ID do andar está undefined!");
    } else {
        andarModel.atualizar(idAndar, numeroAndar, descricaoAndar)
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
    var idAndar = req.body.idAndarServer

    if (idAndar == undefined) {
        res.status(400).send("O ID do acesso está undefined!");
    } else {
        andarModel.excluir(idAndar)
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
    listarPorId,
    listarProblemasPorAndar
}