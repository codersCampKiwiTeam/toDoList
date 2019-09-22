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
let user;
const logIn = () => {
    let loginName = document.getElementById("login-name").value;
    let loginPassword = document.getElementById("login-password").value;
    logData(loginName, loginPassword);
}
const logData = async (loginName, loginPassword) => {
    let userData = {
        "loginName": loginName,
        "loginPassword": loginPassword
    }
    // Autentykacja do poprawy
    await fetch('https://kiwitodoapp.herokuapp.com/users/login', { // Dodać adres!
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
            console.log(res);
            var queryString = `?myParam=${res}`;
            window.location.href = "./todo.html" + queryString;
        }
    })
    .catch(err => console.log(err));
}

// Rejestracja:
const register = async () => {
    let registerEmail = document.getElementById("register-email").value;
    let registerName = document.getElementById("register-name").value;
    let registerPassword = document.getElementById("register-password").value;
    registerData(registerEmail, registerName, registerPassword);
}
const registerData = async (registerEmail, registerName, registerPassword) => {
    let registerUser = {
        "registerEmail": registerEmail,
        "registerName": registerName,
        "registerPassword": registerPassword
    }
    // Autentykacja do poprawy
    await fetch('https://kiwitodoapp.herokuapp.com/users/register', { // Dodać adres!
        method: "POST",
        body: JSON.stringify(registerUser),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.text())
    .then(res => {console.log(res)
        if (res[0] !== "{") {
            return alert(res);
        }
        else {
            return window.location.href = "./index.html"
        }
    })
    .catch(err => console.log(err));
}