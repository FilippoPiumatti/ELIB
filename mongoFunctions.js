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


mongoFunctions.prototype.getUser = function (req, nomeDb, collection, query, callback) {
    setConnection(nomeDb, collection, function (errConn, coll, conn) {
        if (errConn.codeErr == -1) {
            let dataUser = coll.find(query);
            dataUser.then(function (data) {
                conn.close();
                let errData;
                if (data == null)

                    errData = { codeErr: 401, message: "no utenti available" };
                else {
                    errData = { codeErr: -1, message: "" };
                }
                callback(errData, data);
            });
            dataLogin.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });
        } else
            callback(errConn, {});
    });
}

mongoFunctions.prototype.getProfile = function(req, nomeDb, collection, query, callback){
    setConnection(nomeDb, collection, function(errConn, coll, conn){
        if (errConn.codeErr == -1) {
            let dataUser = coll.find(query);
            dataUser.then(function (data) {
                conn.close();
                let errData;
                if (data == null)

                    errData = { codeErr: 401, message: "no utenti available" };
                else {
                    errData = { codeErr: -1, message: "" };
                }
                callback(errData, data);
            });
            dataLogin.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });
        } else
            callback(errConn, {});
    })
}

mongoFunctions.prototype.updateUsername = function (req, nomeDb, collection,query, callback) {
    setConnection(nomeDb, collection, function (errConn, coll, conn) {
        if (errConn.codeErr == -1) {
            let dataUser = coll.updateOne(query);
            //db.players.updateOne({_id:11,"infortuni.anno":2012,"infortuni.tipo":"gomito"},{$set:{"infortuni.$.mesi_out":0}})
            dataUser.then(function (data) {
                conn.close();
                let errData;
                
                callback(errData, data);
            });
            dataUser.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });
            
        } else
            callback(errConn, {});
    });
}

mongoFunctions.prototype.elencoPost=function (req,nomeDb,collection,callback){
    setConnection(nomeDb,collection,function (errConn,coll,conn){
        if(errConn.codeErr==-1){
            let domande = coll.find().toArray();
            domande.then(function (data){
                conn.close();
                let errData =  {codeErr:200, message: "ok ava"}
                if(data==null)
                    errData = {codeErr:401, message: "Errore estrapolazione domande"};
                callback(errData,data);
            });
            domande.catch((err)=>{
                let errQuery = {codeErr: 500, message: "Errore durante l'esecuzione della query"};
                callback(errQuery,{});
            });
        }else
            callback(errConn,{});
    });
}


mongoFunctions.prototype.getPosts = function (req, nomeDb, collection, query, callback) {
    setConnection(nomeDb, collection, function (errConn, coll, conn) {
        if (errConn.codeErr == -1) {
            let post = coll.find(query);
            post.then(function (data) {
                conn.close();
                let errData;
                if (data == null)

                    errData = { codeErr: 401, message: "no utenti available" };
                else {
                    errData = { codeErr: -1, message: "" };
                }
                callback(errData, data);
            });
            dataLogin.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });
        } else
            callback(errConn, {});
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
        } else
            callback(errConn, {});
    });
}


mongoFunctions.prototype.findMail = function (req, nomeDb, collection, query, callback) {
    setConnection(nomeDb, collection, function (errConn, coll, conn) {
        if (errConn.codeErr == -1) {
            let dataMail = coll.findOne(query);
            dataMail.then(function (data) {
                conn.close();
                let errData;
                if (data == null)
                    errData = { codeErr: 401, message: "Mail non presente" };   
                else
                    errData = { codeErr: -1, message: "Mail presente", mail:data };
                    errData = { codeErr: -1, message: "Mail presente", elencoDomande: data };
               
                callback(errData, data);
            });
            dataMail.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });
            
        } else
            callback(errConn, {});
    });
}

mongoFunctions.prototype.findPost = function (req, nomeDb, collection, query, callback) {
    setConnection(nomeDb, collection, function (errConn, coll, conn) {
        if (errConn.codeErr == -1) {
            let dataMail = coll.findOne(query);
            dataMail.then(function (data) {
                conn.close();
                let errData;
                if (data == null)
                    errData = { codeErr: 401, message: "Errore" };   
                else
                    errData = { codeErr: -1, message: "Ok!", mail:data };
                    errData = { codeErr: -1, message: "Ok!", elencoDomande: data };
                    console.log(errData)
               
                callback(errData, data);
            });
            dataMail.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });
            
        } else
            callback(errConn, {});
    });
}

mongoFunctions.prototype.updatePassword = function (req, nomeDb, collection, mail,password, callback) {
    setConnection(nomeDb, collection, function (errConn, coll, conn) {
        if (errConn.codeErr == -1) {
            let dataMail = coll.updateOne(mail,{$set:password});
            //db.players.updateOne({_id:11,"infortuni.anno":2012,"infortuni.tipo":"gomito"},{$set:{"infortuni.$.mesi_out":0}})
            dataMail.then(function (data) {
                conn.close();
                let errData;
                
                callback(errData, data);
            });
            dataMail.catch((err) => {
                let errQuery = { codeErr: 500, message: "Errore durante l'esecuzione della query" };
                callback(errQuery, {});
            });
            
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