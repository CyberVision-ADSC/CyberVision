var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listar", function (req, res) {
    maquinaController.listarMaquinasPorFaculdade(req, res);
})

router.get("/listarPorId", function (req, res) {
    maquinaController.listarMaquinaPorId(req, res);
})

router.get("/listarPorHostname", function (req, res) {
    maquinaController.listarMaquinasPorHostname(req, res);
})

router.get("/listarPorSala", function (req, res) {
    maquinaController.listarMaquinasPorSala(req, res);
})

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
})

router.post("/atualizar", function (req, res) {
    maquinaController.atualizar(req, res);
});

router.delete("/excluir", function (req, res) {
    maquinaController.excluir(req, res);
});

router.get("/validarhostname", function (req, res) {
    maquinaController.validarHostNameExistente(req, res);
})

router.get("/listarQuantidadeFiltroMaquinas", function (req, res) {
    maquinaController.listarQuantidadeFiltroMaquinas(req, res);
})

router.get("/countComputadoresComProblemas", function (req, res) {
    maquinaController.countComputadoresComProblemas(req, res);
})

router.get("/filtrarPorComponente", function (req, res) {
    maquinaController.filtrarPorComponente(req, res);
})

router.get("/filtrarPorComponenteComSala", function (req, res) {
    maquinaController.filtrarPorComponenteComSala(req, res);
})
module.exports = router;