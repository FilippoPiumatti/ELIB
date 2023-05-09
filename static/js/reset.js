$(()=>{
    $("#divConferma").hide();
    $("#divErrore").hide();
    $("#btnReset").on("click", function () {
        let mail = localStorage.getItem("mail");
        $("#mail").html(mail);
        let password1 = $("input[name=password1]").val();
        let password2 = $("input[name=password2]").val();
        console.log(password1,password2);
        if(password1!=password2)
            $("#divErrore").show();
        else{
            let reset = sendRequestNoCallback("/api/resetPassword", "POST", { mail: mail,password:password1 });
            reset.fail(function (jqXHR) {
                $("#errorMessage").show();
            });
            reset.done(function (serverData){
                
            });
        //
        }
    });
});
    
