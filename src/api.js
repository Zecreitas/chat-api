var express = require('express');
var app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/', (req, res, next)=>{
    res.status(200).send("<h1>API - CHAT</h1>")
}))

app.use('/sobre', router.get("/sobre", (req, res, next) => {
    res.status(200).send({
        "nome":"API - CHAT",
        "versão":"0.1.0",
        "autor":"Guilherme Schuh"
    })
}));

app.use("/salas", router.get("/salas", async (req, res, next) => {
    const salaController = require("./controllers/salaController");
    let resp = await salaController.get();
    res.status(200).send(resp);
}));

module.exports=app;