/*"Use strict"
$(document).ready(function () {

    $("#btnLogBack").on("click", function () {
        window.location.href = "login.html"
    });

    $("#btnConferma").on("click", function () {
        let username = $("input[name=username]").val();
        let pwd = $("input[name=password]").val();
        let Reg = sendRequestNoCallback("/api/registrati", "POST", { username: username, password: pwd });
        Reg.fail(function (jqXHR) {
            $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
        });
        Reg.done(function (serverData) {
            window.location.href = "login.html";
        });
    })
})*/