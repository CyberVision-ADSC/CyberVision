var maquinaModel = require("../models/maquinaModel");

function listarMaquinasPorFaculdade(req, res) {
    var idFaculdade = req.query.idFaculdade

    maquinaModel.listarMaquinasPorFaculdade(idFaculdade)
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

function listarMaquinasPorHostname(req, res) {
    var hostname = req.query.hostname

    maquinaModel.listarMaquinasPorHostname(hostname)
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

function listarMaquinasPorSala(req, res) {
    var idSala = req.query.idSala

    maquinaModel.listarMaquinasPorSala(idSala)
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

function listarMaquinasComProblemas(req, res) {
    var idFaculdade = req.query.idFaculdade

    maquinaModel.listarMaquinasComProblemas(idFaculdade)
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
    var identificadorComputador = req.body.identificadorComputadorServer;
    var idSala = req.body.idSalaServer;
    var hostname = req.body.hostnameServer;

    if (identificadorComputador == undefined) {
        res.status(400).send("O processador está undefined!");
    } else if (idSala == undefined) {
        res.status(400).send("A placa mae está undefined!");
    } else if (hostname == undefined) {
        res.status(400).send("A ram está undefined!");
    } else {
        maquinaModel.cadastrar(identificadorComputador, idSala, hostname)
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
    var identificadorComputador = req.body.identificadorComputadorServer;
    var idMaquina = req.body.idMaquinaServer;
    var hostname = req.body.hostnameServer;

    if (identificadorComputador == undefined) {
        res.status(400).send("O identificador do computador está undefined!");
    } else if (idMaquina == undefined) {
        res.status(400).send("o id da maquina está undefined!");
    } else if (hostname == undefined) {
        res.status(400).send("o hostname está undefined!");
    } else {
        maquinaModel.atualizar(identificadorComputador, idMaquina, hostname)
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
    var idComputador = req.body.idComputadorServer

    if (idComputador == undefined) {
        res.status(400).send("O ID do computador está undefined!");
    } else {
        maquinaModel.excluir(idComputador)
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

function validarHostNameExistente(req, res) {
    var hostname = req.query.hostname

    maquinaModel.validarHostNameExistente(hostname)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(true);
        } else {
            res.status(200).send(false)
        }
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    cadastrar,
    atualizar,
    excluir,

    listarMaquinasPorFaculdade,
    listarMaquinasPorSala,
    listarMaquinasComProblemas,
    listarMaquinasPorHostname,
    validarHostNameExistente
}