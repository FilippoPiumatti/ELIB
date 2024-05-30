"use strict";


$(() => {
    $("#closeModal").on("click", function () {
        $("#closeModal").modal("hide");
    })
    $("#btnLogin").on("click", function () {
        let username = $("input[name=username]").val();
        let pwd = $("input[name=password]").val();

        localStorage.removeItem("token");

        let loginTest = sendRequestNoCallback("/api/login", "POST", { username: username, password: pwd });
        loginTest.fail(function (jqXHR) {
            $("#myModal").modal("show");
            $(".msg").text("Errore: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
        });
        loginTest.done(function (serverData) {
            serverData = JSON.parse(serverData);
            console.log("NEW TOKEN: " + serverData.token);
            localStorage.setItem("token", serverData.token);
            localStorage.setItem("username", username);
            window.location.href = "main.html";
        });
    });
    let cont = 0
    $("#reg-log").on("click", function () {
        cont++;
        if (cont == 10) {
            cont = 0;
            $("#myModal").modal("show")
            $(".msg").text("errore: La smetti di cliccare come un pazzo").css({ color: "#a00", "marginBottom": "10px" })
        }
    })

    $("#btnRegistrati").on("click", function () {
        let username = $("input[name=username2]").val();
        let email = $("input[name=email]").val();
        let pwd = $("input[name=passwordReg]").val();
        let regUser = /^[a-zA-Z0-9]+$/;
        let regEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let regPwd = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$') //NON FUNZIONA!

        console.log(pwd)
        if ($("#confPass").val() == pwd && regUser.test(username) && regEmail.test(email)) { //regPwd.test(pwd) condizione da rimettere quando hai trovato una nuova regex
            $(".msg").hide();
            let Reg = sendRequestNoCallback("/api/registrati", "POST", { username2: username, email: email, password2: pwd });
            Reg.fail(function (jqXHR) {
                $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
                console.log($(".msg").text())
            });
            Reg.done(function (serverData) {
                console.log("done")
                $("#doneRegModal").modal("show");
                window.location.href = "login.html";
            });
        } 
        else if ($("#confPass").val() != pwd) {
            $("#myModal").modal("show")
            $(".msg").text("Le password non corrispondono").css({ color: "#a00", "marginBottom": "10px" })

        } else if (!regUser.test(username)) {
            $("#myModal").modal("show")
            $(".msg").text("Username invalido").css({ color: "#a00", "marginBottom": "10px" })

        } else if (!regEmail.test(email)) {
            $("#myModal").modal("show")
            $(".msg").text("Email invalida").css({ color: "#a00", "marginBottom": "10px" })

        } 

    })
});