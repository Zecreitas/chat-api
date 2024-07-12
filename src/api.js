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
    if(await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)){
        let resp = await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuário não autorizado"});
    }
}));

app.use("/sala/entrar", router.get("/sala/entrar", async (req, res) => {
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.entrar(req.headers.iduser, req.headers.idsala);
    res.status(200).send(resp);
}));

app.use("/sala/mensagem/", router.post("/sala/mensagem", async (req, res) => {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) 
        return false;
    let resp= await salaController.enviarMensagem(req.headers.nick, req.body.msg,req.body.idSala);
    res.status(200).send(resp);
  }))  

module.exports=app;