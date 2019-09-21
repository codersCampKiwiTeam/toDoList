// SEARCH
$('#search-btn').on("click", function () {
	var szukana_fraza = $('#search').val();
	
  if(szukana_fraza.length === 0) {
		$('.tasks .taskOk').css("color", "black");
  	return;
  }
    
	$('.tasks').find(".taskOk").each( function() {
		if($(this).text().toUpperCase().indexOf(szukana_fraza.toUpperCase()) != -1)
		{
			$(this).css("color", "red");
		} else {
			$(this).css("color", "black");
  	}
	});
});


// LOG OUT

$('.logout').click(function () {
    window.location.href = "./index.html" + "?#";
});


// USUŃ ZADANIE
let taskID = document.getElementsByClassName('listItem');

for (let i=0; i < taskID.length; i++){
    taskID[i].addEventListener('click', function(e){

        console.log(e.target.id);

        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('myParam');
    
        fetch(`https://cors-anywhere.herokuapp.com/https://kiwitodoapp.herokuapp.com/tasks/:${e.target.id}`, {         // DODAĆ ADRES!
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": myParam
            }
        })
        .then(res => res.json())
        .catch(err => alert(err));

        let refresh = window.location.href;
        window.location.href = "";
        window.location.href = refresh;
});
}

// POKAŻ LISTĘ
// po kliknięciu listy "urgent"
$('.btn-urgent').click(function () {
    $('#divUrgent').show();
    $('#divModerate').hide();
    $('#divForLater').hide();
});
// po kliknięciu listy "moderate"
$('.btn-moderate').click(function () {
    $('#divUrgent').hide();
    $('#divModerate').show();
    $('#divForLater').hide();
});
// po kliknięciu listy "na potem"
$('.btn-forLater').click(function () {
    $('#divUrgent').hide();
    $('#divModerate').hide();
    $('#divForLater').show();
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
                const el = document.createElement("li");
                el.classList.add("listItem");
                el.setAttribute("id",`${res[i]._id}`);
                el.setAttribute("spellcheck", "false");
                let newDiv = "";
                newDiv += `<a href="#" class="nameTask" id="${res[i]._id}">${res[i].nameTask}</a>
                <div id="${res[i]._id}"><ul id="${res[i]._id}"><li id="${res[i]._id}" class="dateTask">Data wykonania: ${res[i].dateTask}</li>
                <li id="${res[i]._id}" class="description">Komentarz: ${res[i].description}</li></ul></div>`;
                el.innerHTML = newDiv;
                document.getElementById(`${res[i].status}`).appendChild(el);
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

function clearNewTaskArea() {
    const allText = document.getElementsByClassName("text-area");
    for (let i = 0; i <= allText.length; i++) {
        if (allText[i] != null) {
            allText[i].value = "";
        }
    }
}

function closeNewTaskArea() {
    $(".add-task-btn").click(function (e) {
        $('.add-task').hide();
    });
    clearNewTaskArea();
    document.getElementById("add-task-btn").setAttribute("onclick", "saveNewTask()");
}

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

        clearNewTaskArea();
        let refresh = window.location.href;
        window.location.href = "";
        window.location.href = refresh;
}