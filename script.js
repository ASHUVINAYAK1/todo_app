const input = document.querySelector('input');
const btn = document.querySelector('.addtask > button');
const notcompleted = document.querySelector('.notcompleted');
const completed = document.querySelector('.completed');

btn.addEventListener('click', addList);
input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addList(e);
  }
});

function addList(e) {
  const newli = document.createElement('li');
  const checkbtn = document.createElement('button');
  const delbtn = document.createElement('button');

  checkbtn.innerHTML = '<i class="fa fa-check">';
  delbtn.innerHTML = '<i class="fa fa-trash">';

  if (input.value !== '') {
    newli.textContent = input.value;
    input.value = '';
    notcompleted.appendChild(newli);
    newli.appendChild(checkbtn);
    newli.appendChild(delbtn);

    // Save to local storage
    saveTaskToLocalStorage(newli.textContent);

    checkbtn.addEventListener('click', moveTaskToCompleted);
    delbtn.addEventListener('click', deleteTask);

    checkbtn.style.display = '';
  }
}

function moveTaskToCompleted() {
  const parent = this.parentNode;
  parent.remove();
  completed.appendChild(parent);
  this.removeEventListener('click', moveTaskToCompleted);
  this.style.display = 'none';

  // Update local storage
  updateLocalStorage();
}

function deleteTask() {
  const parent = this.parentNode;
  parent.remove();

  // Update local storage
  updateLocalStorage();
}

// Save task to local storage
function saveTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update local storage
function updateLocalStorage() {
  const tasks = [];
  const allTasks = document.querySelectorAll('.notcompleted li, .completed li');

  allTasks.forEach((task) => {
    tasks.push(task.textContent);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    const newli = document.createElement('li');
    const checkbtn = document.createElement('button');
    const delbtn = document.createElement('button');

    checkbtn.innerHTML = '<i class="fa fa-check">';
    delbtn.innerHTML = '<i class="fa fa-trash">';

    newli.textContent = task;
    newli.appendChild(checkbtn);
    newli.appendChild(delbtn);
    
    notcompleted.appendChild(newli);

    checkbtn.addEventListener('click', moveTaskToCompleted);
    delbtn.addEventListener('click', deleteTask);
  });
}

// Call the function to load tasks from local storage when the page loads
loadTasksFromLocalStorage();