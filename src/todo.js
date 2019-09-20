// SEARCH


// LOG OUT


// USUŃ ZADANIE


// POKAŻ LISTĘ
// po kliknięciu listy "urgent"
$('.btn-urgent').click(function () {
    $('#urgent').show();
    $('#moderate').hide();
    $('#forLater').hide();
});
// po kliknięciu listy "moderate"
$('.btn-moderate').click(function () {
    $('#urgent').hide();
    $('#moderate').show();
    $('#forLater').hide();
});
// po kliknięciu listy "na potem"
$('.btn-forLater').click(function () {
    $('#urgent').hide();
    $('#moderate').hide();
    $('#forLater').show();
});


// POKAŻ ZADANIA
async function showTasks() {

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('myParam');

    await fetch('https://cors-anywhere.herokuapp.com/https://kiwitodoapp.herokuapp.com/tasks', {         // DODAĆ ADRES!
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": myParam
        }
    })
    // .then(res => res.text())
    // .then(text => console.log(text)) 
    .then(res => res.json())
    .then(res => {

        if(res){
            for (i=0;i<res.length;i++){
                const el = document.createElement("div");
                let newDiv = "";
                newDiv += `<div id=${res[i]._id} spellcheck="false">
                <b class="nameTask">${res[i].nameTask}</b>
                </br><span class="dateTask">${res[i].dateTask}</span>
                </br><span class="description">
                </br>${res[i].description}</span>
                </br><b class="status">${res[i].status}</b></div>`;
                el.innerHTML = newDiv;
                document.getElementById(`"${res[i].status}"`).appendChild(el);
            }
        }

    })
    .catch(err => alert(err));
}


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
    const nameTask = document.getElementById('name-task').value;
    const dateTask = document.getElementById('date-task').value;
    const description = document.getElementById('description').value;
    const e = document.getElementById('status-choice');
    const status = e.options[e.selectedIndex].value;

    /*if (nameTask == '' || nameTask == null || description == '' || description == null) {
        alert("Brak tytułu lub opisu zadania!")
        return;
    }*/

    const body = {
        'nameTask': nameTask,
        'dateTask': dateTask,
        'description': description,
        'status': status
    }

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('myParam');

    await fetch('https://cors-anywhere.herokuapp.com/https://kiwitodoapp.herokuapp.com/tasks', { // DODAĆ ADRES!
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": myParam
            }
        })
        // .then(res => res.text())
        // .then(text => console.log(text)) 
        .then(res => res.json())
        .then(res => {
            const el = document.createElement("div");
            let newDiv = "";
            newDiv += `<div id=${res._id} spellcheck="false">
            <b class="nameTask">${res.nameTask}</b>
            </br><span class="dateTask">${res.dateTask}</span>
            </br><span class="description">
            </br>${res.description}</span>
            </br><b class="status">${res.status}</b></div>`;
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