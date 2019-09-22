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

document.getElementsByClassName("login-btn")[0].addEventListener("click", event => {
    event.preventDefault();
    logIn();
}, false)

document.getElementsByClassName("register-btn")[0].addEventListener("click", event => {
    event.preventDefault();
    register();
}, false)

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

    await fetch('https://stormy-shore-69652.herokuapp.com/users/login', {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res =>{
        if(res.status !== 200){
			res.text()
			.then(body => {
				return alert(body);
			})
        } 
        else {
			res.text().
			then (body => {
				sessionStorage.setItem("token", body)
				window.location.href = "./todo.html";
			})
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
	
    await fetch('https://stormy-shore-69652.herokuapp.com/users/register', {
        method: "POST",
        body: JSON.stringify(registerUser),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.status !== 200) {
			res.text()
			.then(body => {
				return alert(body);
			});
        }
        else {
            return window.location.href = "./index.html"
        }
    })
    .catch(err => console.log(err));
}