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
  $("#curr").css("color", "light-blue")
  //#endregion

  //#region .on functions


  //#region .on 
  $("no").on("click", function () {
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
      console.log("annucion pubblicato correttamente");

    });
  });

  $("#btnRedirect").on("click", function () {
    
  })

  $("#btnCloseModal").on("click", function () {
    $("#confirmModal").modal("hide");
  })

  $("#btnSubPost").on("click", function () {
    window.location.href = "main.html"
  });
  $("#btnModal").on("click", function () {
    $("#userModal").text(currentUser);
    $("#userModal").prop("readonly", true);
  })


  let username = $("input[name=usernameModal]").val();
  let tipo = $("input[name=typeModal]").val();
  let content = $("input[name=limitedtextfield]").val();
  let Reg = sendRequestNoCallback("/api/elencoPost", "POST", { userModal: username, typeModal: tipo, contentModal: content });
  Reg.fail(function (jqXHR) {
    $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
  });
  Reg.done(function (serverData) {
    serverData = JSON.parse(serverData);
    console.log(serverData);
    let quiz = serverData.domande;
    console.log(quiz)
    let domande = quiz.content;
    console.log(quiz.content)
    for (let i = 0; i < quiz.length; i++) {

      let row = $("<div class='card'>")
      row.css({
        "width": "700px",
        "height": "auto",
        "margin": "0px auto",
        "margin-bottom": "10px",
        
      })
      let div = $("<div class 'row'>");
      let div2 = $("<div class='card-body'>");
      let user = $("<h5 class='h5 g-color-gray-dark-v1 mb-0 text-muted'>")
      user.css({ "text-align": "left",  "margin-left": "20px", "margin-bottom": "50px" })
      let title = $("<h5>")
      title.css({
        "text-align": "center",
        "color": "black",
        "font-weight":"bold"
      })
      let p = $("<p class='card-text'style=' margin-top:20px; margin-left:30px;  font-weight:bold; color:black '  >");

      let footer = $("<div class = 'card-footer text-muted'>");
      let btnTest = $("<button class='btn btn-primary'>");
      console.log("Domanda " + i + ": " + quiz[i].content)

      let userModified = JSON.stringify(quiz[i].user)

      user.text("Autore: " + quiz[i].user)
      title.text(quiz[i].type)
      p.text(quiz[i].content)
      footer.css("text-align","center")
      btnTest.text("Rispondi")
      row.append(div2)
      row.append(user)
      row.append(title)
      row.append(p)
      row.append(div)
      footer.append(btnTest)
      row.append(footer)
      $("#postContainer").append(row)
    }
  });

  $("#btnModal1").on("click", function () {
    $("#userModal").prop("readonly", true);
  })

  $("#btnSubPost2").on("click", function () {
    let username = $("input[name=usernameModal]").val();
    let tipo = $("input[name=typeModal2]").val();
    let Reg = sendRequestNoCallback("/api/SearchPosts", "POST", { typeModal: tipo });
    Reg.fail(function (jqXHR) {
      $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
    });
    Reg.done(function (serverData) {
      alert("Ricerca eseguita correttamente");
      serverData = JSON.parse(serverData)
      console.log("dati: " + serverData)
      let div = $("<div>");
      div.appendTo($("#container"));
      div.text(serverData.data);
      // window.location.href = "main.html";
    });
  });

  $("#btnModal").on("click", function () {
    $("#userModal").val(currentUser);
    $("#userModal").prop("readonly", true);
  })

  $("#logout").on("click", function () {
    $("#modalConfirm").modal('show')
  })

  $("#aDetails").on("click", function () {
    let username = localStorage.getItem("username")

    $(".books").hide(300);
    let userD = sendRequestNoCallback("/api/SearchUser", "POST", { userDaPassare: username });
    Reg.fail(function (jqXHR) {
      $(".msg").html("Error: " + jqXHR.status + " - " + jqXHR.responseText).css({ color: "#a00", "marginBottom": "10px" });
    });
    Reg.done(function (serverData) {
      alert("Ricerca eseguita correttamente");
      console.log(serverData)
      let data = JSON.parse(serverData.data)
    });
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

function ElencoPostInArrivo() {


}

//#endregion









