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

module.exports = router;