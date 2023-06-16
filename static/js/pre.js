"use strict";



$(document).ready(function () {

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
    
    //#region dichiarazioni
  let currentUser = localStorage.getItem("username");
  let intest = "ACCOUNT CORRENTE: "
  let isModal = false;
  //#endregion

  //#region PuntatoriJquery

  //#endregion
 
})
  
