var express = require("express");
var router = express.Router();

var acessoController = require("../controllers/acessoController");

router.get("/listar", function (req, res) {
    acessoController.listar(req, res);
})

router.get("/listarporid", function (req, res) {
    acessoController.listarpPorId(req, res);
})

router.post("/cadastrar", function (req, res) {
    acessoController.cadastrar(req, res);
})

router.post("/atualizar", function (req, res) {
    acessoController.atualizar(req, res);
});

router.delete("/excluir", function (req, res) {
    acessoController.excluir(req, res);
});

module.exports = router;