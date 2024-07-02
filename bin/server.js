require("dotenv").config();
const app = require("../src/api");

app.use((req, res, next)=> {
    next();
})

let port = process.env.API_PORT || 4000;

app.listen(port);

console.log("Starting in port " + port);
// console.log(process.env.API_PORT);
// let port = process.env.API_PORT || 3001;
// app.listen(port);