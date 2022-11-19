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

function listarMaquinaPorId(req, res) {
    var idMaquina = req.query.idMaquina

    maquinaModel.listarMaquinaPorId(idMaquina)
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

function listarQuantidadeFiltroMaquinas(req, res) {
    var idFaculdade = req.query.idFaculdade
    var idSala = req.query.idSala

    if (idSala != null) {
        maquinaModel.listarQuantidadeFiltroMaquinasPorSala(idFaculdade, idSala)
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
    } else {
        maquinaModel.listarQuantidadeFiltroMaquinas(idFaculdade)
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

}

function countComputadoresComProblemas(req, res) {
    var idFaculdade = req.query.idFaculdade
    var idAndar = req.query.idAndar
    var idSala = req.query.idSala

    if (idSala != null) {
        maquinaModel.countComputadoresComProblemasPorSala(idFaculdade, idSala)
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
    } else if (idAndar != null) {
        maquinaModel.countComputadoresComProblemasPorAndar(idFaculdade, idAndar)
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
    } else {
        res.status(400).send("BAD_REQUEST: necessario alguns dos parâmetros");
    }
}

function filtrarPorComponente(req, res) {
    var componente = req.query.componente
    var idFaculdade = req.query.idFaculdade
    switch (componente) {
        case "CPU":
            maquinaModel.filtrarPorCpu(idFaculdade)
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
            break;
        case "DISCO":
            maquinaModel.filtrarPorDisco(idFaculdade)
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
            break;
        case "RAM":
            maquinaModel.filtrarPorMemoria(idFaculdade)
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
            break;
        case "FISICO":
            maquinaModel.filtrarPorFisico(idFaculdade)
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
            break;
        default:
            break;
    }
}

function filtrarPorComponenteComSala(req, res) {
    var componente = req.query.componente
    var idFaculdade = req.query.idFaculdade
    var idSala = req.query.idSala
    switch (componente) {
        case "CPU":
            maquinaModel.filtrarPorCpuComSala(idFaculdade, idSala)
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
            break;
        case "DISCO":
            maquinaModel.filtrarPorDiscoComSala(idFaculdade, idSala)
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
            break;
        case "RAM":
            maquinaModel.filtrarPorMemoriaComSala(idFaculdade, idSala)
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
            break;
        case "FISICO":
            maquinaModel.filtrarPorFisicoComSala(idFaculdade, idSala)
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
            break;
        default:
            break;
    }
}

module.exports = {
    cadastrar,
    atualizar,
    excluir,
    listarMaquinasPorFaculdade,
    listarMaquinasPorSala,
    listarMaquinasPorHostname,
    validarHostNameExistente,
    listarMaquinaPorId,
    listarQuantidadeFiltroMaquinas,
    countComputadoresComProblemas,
    filtrarPorComponente,
    filtrarPorComponenteComSala
}