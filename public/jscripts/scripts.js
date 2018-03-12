// jQuery on load
$( () => {
    $('.tap-target').tapTarget('open');
    $('.tap-target').tapTarget('close');
}
);

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