var express = require("express");
var router = express.Router();

var processoController = require("../controllers/processoController");

router.get("/listar", function (req, res) {
    processoController.listar(req, res);
})

router.post("/kill", function (req, res) {
    processoController.kill(req, res);
})

router.post("/notificar-aluno", function (req, res) {
    processoController.notificarAluno(req, res);
})

module.exports = router;