// SEARCH


// LOG OUT


// DODAJ NOWĄ LISTĘ


// DODAJ NOWE ZADANIE
// pokazuje ukryty div
$('.add-new-task').click(function () {
    $('.add-task').toggle("slide");
});
// zmienia wskaźnik na palec (bez tego jest strzałka domyślna mimo cssa)
$('.add-new-task').hover(function () {
    $('.add-new-task').css('cursor', 'pointer');
});
// po kliknięciu na dowolny punkt poza "nowym zadaniem" div się ukrywa
$(".main").click(function (e) {
    $('.add-task').hide();
});


// NOWE ZADANIE - ZAPISZ
const addTask = document.getElementsByClassName('.add-task');
let editItem = null;

async function saveNewTask() {
    const nameTask = document.getElementById('name-task').innerText;
    const dateTask = document.getElementById('date-task').innerText;
    const description = document.getElementById('description').innerText;
    const e = document.getElementById('status-choice');
    const status = e.options[e.selectedIndex].value;

    /*if (nameTask == '' || nameTask == null || description == '' || description == null) {
        alert("Brak tytułu lub opisu zadania!")
        return;
    }*/

    const body = {
        'name-task': nameTask,
        'date-task': dateTask,
        'description': description
    }

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('myParam');

    await fetch('https://to-do-a.herokuapp.com/', { // DODAĆ ADRES!
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": myParam
            }
        })
        .then(res => res.json())
        .then(res => {
            const el = document.createElement("div");
            let newDiv = "";
            newDiv += `<div id=${res._id}><b class="name-task">${res.nameTask}</b>
            </br><span class="date-task">${res.dateTask}</span>
            </br><span class="description">
            </br>${res.description}</span></div>`;
            el.innerHTML = newDiv;
            document.getElementById(res.status).appendChild(el);
        })
        .catch(err => alert(err));

    closeNewTaskArea();
}

function clearNewTaskArea() {
    const allText = document.getElementsByClassName("text-area");
    for (let i = 0; i <= allText.length; i++) {
        if (allText[i] != null) {
            allText[i].innerText = null;
        }
    }
}

function closeNewTaskArea() {
    addTask.style.display = 'none';
    clearNewTaskArea();
}