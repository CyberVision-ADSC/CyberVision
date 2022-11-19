var express = require("express");
var router = express.Router();

var processoController = require("../controllers/processoController");

router.get("/listar", function (req, res) {
    processoController.listar(req, res);
})

router.get("/kill", function (req, res) {
    processoController.listar(req, res);
})

module.exports = router;