const 
  addBtn = document.querySelector('.tasks__add'),
  input = document.getElementById('task__input'),
  tasksList = document.querySelector('.tasks__list');

getFromLS();

addBtn.addEventListener('click', addEvent => {
  addEvent.preventDefault();
  if (input.value != '') {
    addTask(input.value);
    input.value = '';
  }
});



function addTask(inpVal) {
  const
    task = document.createElement('div'),
    taskTitle = document.createElement('div'),
    taskRemove = document.createElement('a');

  task.className = 'task';
  taskTitle.className = 'task__title';
  taskRemove.className = 'task__remove';

  taskTitle.textContent = inpVal;
  taskRemove.innerHTML = '&times;';

  task.appendChild(taskTitle);
  task.appendChild(taskRemove);
  tasksList.appendChild(task);

  addCloseListner();
  addToLS();
}

function removeTask(ev, e) {
  const parent = ev.target.closest('.task');
  parent.remove();
  e.removeEventListener('click', ev => removeTask(ev, e));
  localStorage.removeItem('task' + parent.dataset.lsnum);
}

function addCloseListner() {
  const closeBtns = document.querySelectorAll('.task__remove');

  closeBtns.forEach(e => {
    e.addEventListener('click', ev => removeTask(ev, e));
  });
}

function getFromLS() {
  let entriesLS = Object.entries(localStorage);
  let arrLS = entriesLS.filter(ele => ele[0].includes('task'));

  arrLS.sort().forEach(entry => {
    localStorage.removeItem(entry[0]);
    addTask(entry[1]);
  });
}

function addToLS() {
  const allTasks = document.querySelectorAll('.task__title');

  for(let i = 0; i < allTasks.length; i++) {
    localStorage.setItem('task'+i, allTasks[i].textContent);
    allTasks[i].parentNode.dataset.lsnum = i;
  }
}