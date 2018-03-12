// jQuery on load
$("#menu").click(function(){
    clickEvent();
});

function clickEvent() {
  var clicked = $('#menu').attr('clicked'); 
  if (clicked ==="true"){$('#menu').attr('clicked', 'false')
                        $('.tap-target').tapTarget('open');} else {$('#menu').attr('clicked', 'true')
                                                                  $('.tap-target').tapTarget('close');}
  console.log($('#menu').attr('clicked'))
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function genKey() {
    document.getElementById("hash").value = makeid();
}


function saveHash() {
    let userhash = $("#IDHash").val()
    sessionStorage.userhash = userhash;
    ;
}


function validateHashKey() {
    if (sessionStorage.userhash === String) {
        return sessionStorage.userhash;
        console.log(sessionStorage.userhash)
    } else {
        console.log("Hash");
        return "User Hash"
    }
}

function updateHashinput() {
    let sessionHashstate = false
    if (sessionStorage.userhash === undefined) {
        document.getElementById("userHash").value = "User Hash"

    } else {
        document.getElementById("userHash").value = sessionStorage.userhash;
        console.log("changed")

    }
}

updateHashinput();