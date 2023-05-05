"use strict";

$(document).ready(function () {
  //#region dichiarazioni
  let currentUser = localStorage.getItem("username");
  let intest = "ACCOUNT CORRENTE: "
  let isModal = false;
  //#endregion

  //#region PuntatoriJquery
  $("#acc").text(intest);
  $("#curr").text(currentUser.toUpperCase()).css({ "text-align": "center" })
  $("#curr").css("color", "green")
  //#endregion

  //#region .on functions

  $("#modalPush").modal("show");

  $("yes").on("click", function () {
    let gestPushNotification = sendRequestNoCallback("/api/getUser", "GET", {})

    gestPushNotification.fail(function (jqXHR) {
      $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
    });

    gestPushNotification.done(function(serverData){
      serverData = JSON.parse(serverData);
      console.log(serverData);
    })

  });

  $("no").on("click", function(){
    $("modalPush").modal('hide');
  })

  $("#UserDetails").hide(300);
  $("#libri").show(300);


  $("#btnSubPost").on("click", function () {
    let username = $("input[name=usernameModal]").val();
    let tipo = $("input[name=typeModal]").val();
    let content = $("input[name=limitedtextfield]").val();
    let Reg = sendRequestNoCallback("/api/posts", "POST", { userModal: username, typeModal: tipo, contentModal: content });
    Reg.fail(function (jqXHR) {
      $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
    });
    Reg.done(function (serverData) {
      alert("Annuncio pubblicato correttamente, ora mi aggiorno!");
      window.location.href = "main.html";
    });
  });

  $("#btnModal").on("click", function () {
    $("#userModal").val(currentUser);
    $("#userModal").prop("readonly", true);
  })




  $("#logout").on("click", function () {
    let isExecuted = confirm("Sei sicuro di voler uscire?");
    if (isExecuted) {
      window.location.href = "login.html"
    }
  })

  $("#aDetails").on("click", function () {

    $(".books").hide(300);
    $("#UserDetails").show(300);
    $("#libri").hide(300)

  })

  $("#libri").on("click", function () {
    $("#exampleModalCenter").show();
    $("body").css("backgorund-color", "black");
  })
  $("input[name=contentModal]").on("keydown", limitText($("#contentLimit"), "", 100))
  //#endregion

  //#region addEvent
  let btnPost = document.getElementById("btnSubPost");
  btnPost.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btnSubPost").click();
    }
  })
  //#endregion
});

//#region Outsides Functions!!

function limitText(limitField, limitCount, limitNum) {
  if (limitField.value.length > limitNum) {
    limitField.value = limitField.value.substring(0, limitNum);
  } else {
    limitCount.value = limitNum - limitField.value.length;
  }
};

//#endregion









