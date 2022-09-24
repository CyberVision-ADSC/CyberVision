var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar_empresa", function (req, res) {
    usuarioController.cadastrar_empresa(req, res);
})

router.post("/cadastrar_usuario", function (req, res) {
    usuarioController.cadastrar_usuario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;