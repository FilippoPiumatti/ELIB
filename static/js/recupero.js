"use strict";

$(() => {
    $("#errorMessage").hide();
    $("#btnMandaEmail").on("click", function () {
        let mail = $("input[name=email]").val();
        console.log(mail);
        localStorage.removeItem("token");
        let mailTest = sendRequestNoCallback("/api/controlloMail", "POST", { mail: mail });
        mailTest.fail(function (jqXHR) {
            $("#errorMessage").show();
        });
        mailTest.done(function (serverData) {
            serverData = JSON.parse(serverData);
            console.log("file : " + serverData)
        });
    });
});