var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listar", function (req, res) {
    maquinaController.listar(req, res);
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

module.exports = router;