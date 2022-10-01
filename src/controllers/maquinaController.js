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
    var processador = req.body.processadorServer;
    var placaMae = req.body.placaMaeServer;
    var ram = req.body.ramServer;
    var memoria = req.body.memoriaServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;
    var fkSala = req.body.fkSalaServer;

    if (processador == undefined) {
        res.status(400).send("O processador está undefined!");
    } else if (placaMae == undefined) {
        res.status(400).send("A placa mae está undefined!");
    } else if (ram == undefined) {
        res.status(400).send("A ram está undefined!");
    } else if (memoria == undefined) {
        res.status(400).send("A memoria está undefined!");
    } else if (sistemaOperacional == undefined) {
        res.status(400).send("O sistema operacional está undefined!");
    } else if (fkSala == undefined) {
        res.status(400).send("O ID da sala está undefined!");
    } else {
        maquinaModel.cadastrar(processador, placaMae, ram, memoria, sistemaOperacional, fkSala)
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
    var processador = req.body.processadorServer;
    var placaMae = req.body.placaMaeServer;
    var ram = req.body.ramServer;
    var memoria = req.body.memoriaServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;
    var idMaquina = req.body.idMaquinaServer;
    var fkSala = req.body.fkSalaServer;

    if (processador == undefined) {
        res.status(400).send("O processador está undefined!");
    } else if (placaMae == undefined) {
        res.status(400).send("A placa mae está undefined!");
    } else if (ram == undefined) {
        res.status(400).send("A ram está undefined!");
    } else if (memoria == undefined) {
        res.status(400).send("A memoria está undefined!");
    } else if (sistemaOperacional == undefined) {
        res.status(400).send("O sistema operacional está undefined!");
    } else if (idMaquina == undefined) {
        res.status(400).send("O ID da maquina está undefined!");
    } else if (fkSala == undefined) {
        res.status(400).send("O ID da sala está undefined!");
   
    } else {
        maquinaModel.cadastrar(processador, placaMae, ram, memoria, sistemaOperacional, fkSala, idMaquina)
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

module.exports = {
    cadastrar,
    atualizar,
    excluir,

    listarMaquinasPorFaculdade,
    listarMaquinasPorSala,
    listarMaquinasComProblemas
}