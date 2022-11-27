var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/quantidade-maquinas-ativas", function (req, res) {
    kpiController.quantidadeMaquinasAtivas(req, res);
})

router.get("/quantidade-maquinas-inativas", function (req, res) {
    kpiController.quantidadeMaquinasInativas(req, res);
})

router.get("/quantidade-maquinas-problemas", function (req, res) {
    kpiController.quantidadeMaquinasProblemas(req, res);
})

router.get("/quantidade-chamados-pendentes", function (req, res) {
    kpiController.quantidadeChamadosPendentes(req, res);
})

router.get("/quantidade-problemas/:idFaculdade", function (req, res) {
    kpiController.quantidadeProblemas(req, res);
})

router.get("/quantidade-problemas-andar/:idFaculdade", function (req, res) {
    kpiController.quantidadeProblemasAndar(req, res);
})

router.get("/tempo-real/:idFaculdade", function (req, res) {
    kpiController.grafTempoReal(req, res);
})

module.exports = router;