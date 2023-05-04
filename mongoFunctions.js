"use strict";

let mongo = require("mongodb");
let bcrypt = require("bcrypt");
const mongoClient = mongo.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";

let mongoFunctions = function () { }

function setConnection(nomeDb, col, callback) {
    let errConn = { codeErr: -1, message: "" };
    let collection = null;
    let client = null;
    let mongoConnection = mongoClient.connect(CONNECTIONSTRING);
    mongoConnection.catch((err) => {
        console.log("Errore di connessione al server Mongo. " + err);
        errConn.codeErr = 503;
        errConn.message = "Errore di connessione al server Mongo";
        callback(errConn, collection, client);
    });
    mongoConnection.then((client) => {
        let db = client.db(nomeDb);
        collection = db.collection(col);
        callback(errConn, collection, client);
    });
}

mongoFunctions.prototype.findLogin = function (req, nomeDb, collection, query, callback) {
    setConnection(nomeDb, collection, function (errConn, coll, conn) {
        if (errConn.codeErr == -1) {
            let dataLogin = coll.findOne(query);
            dataLogin.then(function (data) {
                conn.close();
                let errData;
                if (data == null)

                    errData = { codeErr: 401, message: "Errore login. Username o Password Errati" };
                else {
                    if (req.body.password == data.pwd) {
                        errData = { codeErr: -1, message: "" };
                    }
                    else
                        errData = { codeErr: 401, message: "Errore login. Password errata" };
                }
                callback(errData, data);
            });
            dataLogin.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });
            /*coll.findOne(query,function (errQ,data){
                conn.close();
                let errQuery;
                console.log("Query ok");
                if(!errQ){
                    let errData;
                    if(data==null)
                        errData = {codeErr:401, message: "Errore login. Username inesistente!"};
                    else{
                        if (req.body.password == data.pwd){
                            errData = {codeErr:-1, message:""};
                        }
                        else
                            errData =  {codeErr:401, message: "Errore login. Password errata"};
                    }
                    callback(errData,data);
                }else {
                    errQuery = {codeErr: 500, message: "Errore durante l'esecuzione della query"};
                    callback(errQuery,{});
                }
            });*/
        } else
            callback(errConn, {});
    });
}

mongoFunctions.prototype.registrati = function (req, nomeDb, collection, query, callback) {
    setConnection(nomeDb, collection, function (errConn, coll, conn) {
        if (errConn.codeErr == -1) {
            let dataReg = coll.insertOne(query);
            dataReg.then(function (data) {
                conn.close();
                let errData;
                if (data == null)
                    errData = { codeErr: 401, message: "Errore login. Username inesistente!" };
                else {
                    errData = { codeErr: -1, message: "" };
                }
                callback(errData, data);
            });
            dataReg.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });

        } else
            callback(errConn, {});
            
    });

}

mongoFunctions.prototype.posts = function (req, nomeDb, collection, query, callback) {
    setConnection(nomeDb, collection, function (errConn, coll, conn) {
        if (errConn.codeErr == -1) {
            let dataReg = coll.insertOne(query);
            dataReg.then(function (data) {
                conn.close();
                let errData;
                if (data == null)
                    errData = { codeErr: 401, message: "Inserisci Qualcosa almeno..." };
                else {
                    errData = { codeErr: -1, message: "" };
                }
                callback(errData, data);
            });
            dataReg.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });

        } else
            callback(errConn, {});
            
    });

}

module.exports = new mongoFunctions();