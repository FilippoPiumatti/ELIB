"use strict";
let express = require("express");
let bodyParser = require("body-parser");
let session = require("express-session");
let fs = require("fs");
const HTTPS = require("https");
const cors = require("cors");
let tokenAdministration = require("./tokenAdministration");
let mongoFunctions = require("./mongoFunctions");
let nodemailer = require("nodemailer");
let app = express();
let port = 8888;

const privateKey = fs.readFileSync("keys/privateKey.pem", "utf8");
const certificate = fs.readFileSync("keys/certificate.crt", "utf8");
const credential = { key: privateKey, cert: certificate };

let httpsServer = HTTPS.createServer(credential, app);
httpsServer.listen(port, "127.0.0.1", function () {
    console.log("Server running on port %s...", port);
});


/******** MIDDLEWARE ********/

// middleware per lettura dei parametri urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// middleware per lettura dei parametri in formato json
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    let d = new Date();
    console.log(d.toLocaleTimeString() + " >>> " + req.method + ": " + req.originalUrl);
    if (Object.keys(req.query).length != 0)
        console.log("Parametri GET: " + JSON.stringify(req.query));
    if (Object.keys(req.body).length != 0)
        console.log("Parametri POST: " + JSON.stringify(req.body));
    next();
});

app.use(express.static("static"));

app.post("/api/login", function (req, res) {
    let query = { user: req.body.username };
    mongoFunctions.findLogin(req, "ports", "users", query, function (err, data) {
        if (err.codeErr == -1) {
            console.log("Login OK");
            tokenAdministration.createToken(data);
            console.log("tokenAdministration.token = " + tokenAdministration.token);
            res.send({ msg: "Login OK", token: tokenAdministration.token });
        }
        else
            error(req, res, { code: err.codeErr, message: err.message });
    });
});

app.post("/api/registrati", function (req, res) {
    let query = { email: req.body.email , user: req.body.username2 ,pwd: req.body.password2 };
    mongoFunctions.registrati(req, "ports", "users", query, function (err, data) {
        if (err.codeErr == -1) {
            res.send({ msg: "ok" });
        }
        else
            error(req, res, { code: err.codeErr, message: err.message });
    });
});

app.post("/api/posts", function (req, res) {
    let query = { user: req.body.userModal , type: req.body.typeModal ,content: req.body.contentModal };
    mongoFunctions.registrati(req, "ports", "posts", query, function (err, data) {
        if (err.codeErr == -1) {
            res.send({ msg: "ok" });
        }
        else
            error(req, res, { code: err.codeErr, message: err.message });
    });
});




function error(req, res, err) {
    res.status(err.code).send(err.message);
}

/*********** MIDDLEWARE FINALE PER GESTIONE ERRORE RISORSA *****************/

app.use(function (req, res) {
    res.status(404);
    console.log("Pagina errore da static");
    res.sendFile("error.html", { root: "./static" });
});

app.use(function (req, res, next) {
    console.log("Pagina errore from root");
    res.status(404).sendFile(__dirname + '/error.html');
});