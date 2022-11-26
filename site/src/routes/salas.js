var express = require("express");
var router = express.Router();

var salaController = require("../controllers/salaController");

router.get("/listar", function (req, res) {
    salaController.listar(req, res);
})

router.get("/listarPorId", function (req, res) {
    salaController.listarPorId(req, res);
})

router.post("/cadastrar", function (req, res) {
    salaController.cadastrar(req, res);
})

router.post("/atualizar", function (req, res) {
    salaController.atualizar(req, res);
});

router.delete("/excluir", function (req, res) {
    salaController.excluir(req, res);
});

module.exports = router;