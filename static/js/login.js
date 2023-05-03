"use strict";

$(()=>{
    $("#btnLogin").on("click",function (){
        let username=$("input[name=username]").val();
        let pwd=$("input[name=password]").val();
        localStorage.removeItem("token");
        let loginTest=sendRequestNoCallback("/api/login","POST",{username:username,password:pwd});
        loginTest.fail(function (jqXHR){
            $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({color:"#a00","marginBottom":"10px"});
        });
        loginTest.done(function (serverData){
            serverData=JSON.parse(serverData);
            console.log("NEW TOKEN: " + serverData.token);
            localStorage.setItem("token", serverData.token);
            localStorage.setItem("username",username);
            window.location.href="index.html";
        });
    });
    let cont = 0
    $("#reg-log").on("click",function(){
        cont++;
        if (cont ==10) {
            cont = 0;
            alert("LA SMETTI DI CLICCARE COME UN PAZZO??");
        }
    })

    $("#btnRegistrati").on("click",function(){
        let username=$("input[name=username2]").val();
        let email = $("input[name=email]").val();
        let pwd=$("input[name=password2]").val();
        let Reg=sendRequestNoCallback("/api/registrati","POST",{username2:username,email:email,password2:pwd});
        Reg.fail(function (jqXHR){
            $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({color:"#a00","marginBottom":"10px"});
        });
        Reg.done(function (serverData){
            window.location.href="login.html";
        });
    })
});