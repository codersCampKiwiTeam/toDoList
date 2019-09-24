import './list.css';
import image from './img/pic2.jpg';
import image1 from './img/kiwiLogo.jpg';

// SEARCH
let searchIn = $('#urgent');
$('.fa-search').click(function () {
	const searchTerm = document.getElementById('search').value;
	if (!searchTerm)
		return;


	let items = searchIn.find("span");

	for (let item of items) {
		if (item.innerHTML.toUpperCase() === searchTerm.toUpperCase()) {
			item.scrollIntoView();
			break;
		}
	}
	document.getElementById('search').value = '';

});

// LOG OUT
$('.logout').click(function () {
	sessionStorage.setItem('token', null);
	return window.location.href = "./index.html";
});

// USUŃ ZADANIE
async function deleteTask(e) {
	const id = e.parentNode.parentNode.id;
	await fetch(`https://stormy-shore-69652.herokuapp.com/tasks/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": sessionStorage.getItem('token')
			}
		})
		.then(res => {
			if (res.status === 401) {
				return window.location.href = "./index.html";
			} else if (res.status !== 200) {
				res.text()
					.then(text => {
						return alert(text);
					});
			} else {
				e.parentNode.parentNode.remove();
			}
		})
		.catch(err => alert(err));
}

//OZNACZ JAKO ZROBIONE/NIEZROBIONE
async function toggleSolved(e) {
	const id = e.parentNode.parentNode.id;
	await fetch(`https://stormy-shore-69652.herokuapp.com/tasks/toggleSolved/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": sessionStorage.getItem('token')
			}
		})
		.then(res => {
			if (res.status === 401) {
				return window.location.href = "./index.html";
			} else if (res.status !== 200) {
				res.text()
					.then(text => {
						return alert(text);
					});
			} else {
				res.json()
					.then(json => {
						e.className = json.solved ? 'fas fa-check' : 'far fa-square';
					});
			}
		})
		.catch(err => alert(err));
}

// POKAŻ LISTĘ
// po kliknięciu listy "pilne"
$('.btn-pilne').click(function () {
	searchIn = $('#urgent');
	$('#urgent').show();
	$('#moderate').hide();
	$('#forLater').hide();
});
// po kliknięciu listy "umiarkowane"
$('.btn-umiarkowane').click(function () {
	searchIn = $('#moderate');
	$('#urgent').hide();
	$('#moderate').show();
	$('#forLater').hide();
});
// po kliknięciu listy "na potem"
$('.btn-naPotem').click(function () {
	searchIn = $('#forLater');
	$('#urgent').hide();
	$('#moderate').hide();
	$('#forLater').show();
});


// POKAŻ ZADANIA
async function showTasks() {
	await fetch('https://stormy-shore-69652.herokuapp.com/tasks', {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": sessionStorage.getItem('token')
			}
		})
		.then(res => {
			if (res.status === 401) {
				return window.location.href = "./index.html";
			} else if (res.status !== 200) {
				res.text()
					.then(text => {
						return alert(text);
					});
			} else {
				res.json()
					.then(json => {
						for (i = 0; i < json.length; i++) {
							addItem(json[i]);
						}
					});
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
const addTask = document.getElementsByClassName('add-task');
let editItem = null;

async function saveNewTask() {
	const nameTask = document.getElementById('name-task').value;
	const dateTask = document.getElementById('date-task').value;
	const description = document.getElementById('description').value;
	const e = document.getElementById('status-choice');
	const status = e.options[e.selectedIndex].value;

	const body = {
		'nameTask': nameTask,
		'dateTask': dateTask,
		'description': description,
		'status': status
	}

	await fetch('https://stormy-shore-69652.herokuapp.com/tasks', {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": sessionStorage.getItem('token')
			}
		})
		.then(res => {
			if (res.status === 401) {
				return window.location.href = "./index.html";
			} else if (res.status !== 200) {
				res.text()
					.then(text => {
						return alert(text);
					});
			} else {
				res.json()
					.then(json => {
						addItem(json);
						clearNewTaskArea();
						closeNewTaskArea()
					});
			}
		})
		.catch(err => alert(err));
}

function addItem(item) {
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	let cls = 'class="far fa-square"';
	if (item.solved) {
		cls = 'class="fas fa-check"';
	}

	const li = `
	<li id=${item._id}><span>${item.name}</span>
		<div class="icons"><i class="fas fa-trash-alt" onclick="deleteTask(this)"></i><i ${cls} onclick="toggleSolved(this)"></i></div>
		<div>
			<ul>
				<li>${new Date(item.date).toLocaleDateString("pl-PL", options)}</li>
				<li>${item.description}</li>
			</ul>
		</div>
	</li>`;
	let group = document.getElementById(item.status);
	let ul = group.getElementsByTagName("ul");
	ul[0].innerHTML += li;
}

function clearNewTaskArea() {
	const allText = document.getElementsByClassName("text-area");
	for (let i = 0; i <= allText.length; i++) {
		if (allText[i] != null) {
			allText[i].value = null;
		}
	}
}

function closeNewTaskArea() {
	clearNewTaskArea();
	document.querySelector('.add-task').style.display = "none";

}

let addTaskBtn = document.querySelector('.add-task-btn')
addTaskBtn.addEventListener("click", saveNewTask);

$(document).mouseup(function (e) {
	var container = $(".add-task");
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.hide();
	}
});