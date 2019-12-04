function openModal() {
    var myInput = document.getElementById("psw");
    myInput.onkeyup = function() {
        console.log('helllooo')
    }
}

function enableButton() {
        //enable button if the password and email are in the database
        var myInput = document.getElementById("psw");
        var email = document.getElementByName("email");
        if (myInput.value != "" && email.value != ""){
            botton.disabled = false;
        }

    } 


function onClickFunction() {
    location.href = "../profile/profile.html";
}
