process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();
var usuarioRouter = require("./src/routes/usuarios");
var acessosRouter = require("./src/routes/acessos");
var andaresRouter = require("./src/routes/andares");
var salasRouter = require("./src/routes/salas");
var maquinasRouter = require("./src/routes/maquinas");
var processosRouter = require("./src/routes/processos");
var kpiRouter = require("./src/routes/kpi");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/usuarios", usuarioRouter);
app.use("/acessos", acessosRouter);
app.use("/andares", andaresRouter);
app.use("/salas", salasRouter);
app.use("/maquinas", maquinasRouter);
app.use("/processos", processosRouter);
app.use("/kpi", kpiRouter);

app.listen(PORTA, function () {
    console.log(`\nServidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}\nVocê está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO}\n`);
});
