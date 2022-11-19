var express = require("express");
var router = express.Router();

var chamadoModel = require("../controllers/chamadoController");

router.get("/listar", function (req, res) {
    chamadoModel.listar(req, res);
})

router.get("/listar-por-mais-recente", function (req, res) {
    chamadoModel.listarPorMaisRecente(req, res);
})

router.get("/listar-por-menos-recente", function (req, res) {
    chamadoModel.listarPorMenosRecente(req, res);
})

router.post("/alterar-status", function (req, res) {
    chamadoModel.alterarStatus(req, res);
})

module.exports = router;