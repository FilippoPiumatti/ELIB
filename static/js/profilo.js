"use strict"
let currentUser = localStorage.getItem("username");
let intest = "ACCOUNT CORRENTE: "
let isModal = false;


$(document).ready(function () {

  //puntatori

  let _txtNome = $("input[name=txtNome]");
  let _txtCognome = $("input[name=txtCognome]");
  let _txtCitta = $("input[name=txtCitta]");
  let _txtIndirizzo = $("input[name=txtIndirizzo]");
  let _txtCell = $("input[name=txtCell]");
  let _txtEmail = $("input[name=txtEmail]");
  let _userSpan = $("#userSpan");

  _userSpan.text(currentUser)

  //richiesta alla api

  let findEmail = sendRequestNoCallback("/api/findMail", "POST", {user: _userSpan.text()});
            findEmail.fail(function (jqXHR) {
                $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
            });
            findEmail.done(function (serverData) {
              serverData = JSON.parse(serverData);
              console.log(serverData);
              let email = serverData.email
         });

  $("btnModifica").on("click",function(){
    //richiesta per insert

    let updateProfile = sendRequestNoCallback("/api/updateProfile", "POST", { nome: _txtNome.val(), cognome: _txtCognome.val(), citta: _txtCitta.val(), indirizo: _txtIndirizzo.val(), email: _txtEmail.val(), cell: _txtCell.val(), });
            updateProfile.fail(function (jqXHR) {
                $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
            });
            updateProfile.done(function (serverData) {
              $(".msg").html("Dati inseriti correttamente!!").css({ color: "#a00", "marginBottom": "10px" });
                $("#doneRegModal").modal("show");
                window.location.href = "main.html";
         });
  })
  
  $("#logout").on("click", function () {
    let isExecuted = confirm("Sei sicuro di voler uscire?");
    if (isExecuted) {
      window.location.href = "index.html"
    }
  })

});
