$('.form p a').click(function () {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow")
})

$('.form button').click(function () {
    $('.panel').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow")
})

// Logowanie:
const logIn = () => {
    let loginName = document.getElementById("login-name").value;
    let loginPassword = document.getElementById("login-password").value;
    logData(loginName, loginPassword);
}
const logData = async (loginName, loginPassword) => {
    let userData = {
        "login-name": loginName,
        "login-password": loginPassword
    }
    // Autentykacja do poprawy
    await fetch('https://herokuapp.com/api/auth', { // Dodać adres!
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.text())
    .then(res =>{console.log(res)
        if(res=='Invalid email or password'){
            return alert("Invalid email or password")
        } 
        else{
            var queryString = `?myParam=${res}`;
            window.location.href = "./todo.html" + queryString;
        }
    })
    .catch(err => console.log(err));
}