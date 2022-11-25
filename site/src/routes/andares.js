var express = require("express");
var router = express.Router();

var andarController = require("../controllers/andarController");

router.get("/listar", function (req, res) {
    andarController.listar(req, res);
})

router.get("/listarPorId", function (req, res) {
    andarController.listarPorId(req, res);
})

router.post("/cadastrar", function (req, res) {
    andarController.cadastrar(req, res);
})

router.post("/atualizar", function (req, res) {
    andarController.atualizar(req, res);
});

router.delete("/excluir", function (req, res) {
    andarController.excluir(req, res);
});

module.exports = router;