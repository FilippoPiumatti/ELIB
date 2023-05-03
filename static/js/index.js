"use strict";

$(document).ready(function () {

  let currentUser = localStorage.getItem("username");
  let intest = "ACCOUNT CORRENTE: " 
  let isModal = false

  $("#acc").text(intest);
  $("#curr").text(currentUser.toUpperCase()).css({"text-align":"center"})
  $("#curr").css("color","green")

    $("#modalPush").modal("show");

    $("yes").on("click",function(){
      $("#modalPush").modal('hide')
    })
  

  $("#btnModal").on("click",function(){
    $("#userModal").val(currentUser);
    $("#userModal").prop("readonly",true);
  })


  $("#UserDetails").hide(300);
  $("#libri").show(300)
  
  $("#logout").on("click",function(){
    let isExecuted = confirm("Sei sicuro di voler uscire?");
    if (isExecuted) {
      window.location.href = "login.html"
    }
  })

  $("#aDetails").on("click",function () {
   
    $(".books").hide(300);
    $("#UserDetails").show(300);
    $("#libri").hide(300)

  })

  $("#libri").on("click",function(){
    $("#exampleModalCenter").show();
    $("body").css("backgorund-color", "black")
  })
});

