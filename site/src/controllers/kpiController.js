var kpiModel = require("../models/kpiModel");

function quantidadeMaquinasAtivas(req, res) {
    var idFaculdade = req.query.idFaculdade

    kpiModel.quantidadeMaquinasAtivas(idFaculdade)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function quantidadeMaquinasInativas(req, res) {
    var idFaculdade = req.query.idFaculdade

    kpiModel.quantidadeMaquinasInativas(idFaculdade)
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

function quantidadeMaquinasProblemas(req, res) {
    var idFaculdade = req.query.idFaculdade

    kpiModel.quantidadeMaquinasProblemas(idFaculdade)
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

function quantidadeChamadosPendentes(req, res) {
    var idFaculdade = req.query.idFaculdade

    kpiModel.quantidadeChamadosPendentes(idFaculdade)
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

function quantidadeProblemas(req, res) {

    var idFaculdade = req.params.idFaculdade;

    kpiModel.quantidadeProblemas(idFaculdade).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function quantidadeProblemasAndar(req, res) {

    var idFaculdade = req.params.idFaculdade;

    kpiModel.quantidadeProblemasAndar(idFaculdade).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function grafTempoReal(req, res) {

    var idFaculdade = req.params.idFaculdade;

    kpiModel.grafTempoReal(idFaculdade).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    quantidadeMaquinasAtivas,
    quantidadeMaquinasInativas,
    quantidadeMaquinasProblemas,
    quantidadeChamadosPendentes,
    quantidadeProblemas,
    quantidadeProblemasAndar,
    grafTempoReal
}