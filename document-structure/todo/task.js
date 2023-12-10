const 
  addBtn = document.querySelector('.tasks__add'),
  input = document.getElementById('task__input'),
  tasksList = document.querySelector('.tasks__list');

getFromLS();

addBtn.addEventListener('click', addEvent => {
  addEvent.preventDefault();
  if (input.value.trim() != '') {
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

  task.append(taskTitle);
  task.append(taskRemove);
  tasksList.append(task);

  addCloseListener(task);
  addToLS();
}

function removeTask(task) {
  task.querySelector('.task__remove').removeEventListener('click', () => removeTask(task));
  const tasks = document.querySelectorAll('.task');
  tasks.forEach((el, index) => {
    if (el === task) {
      const arrLS = JSON.parse(localStorage.tasks);
      arrLS.splice(index, 1); 
      if (arrLS.length === 0) {
        localStorage.removeItem('tasks');
      } else {
        localStorage.setItem('tasks', JSON.stringify(arrLS));
      }
    }
  });
  task.remove();
}

function addCloseListener(task) {
  task.querySelector('.task__remove').addEventListener('click', () => removeTask(task));
}

function getFromLS() {
  if (localStorage.tasks) {
    const arrLS = JSON.parse(localStorage.tasks);
    
    if (arrLS.length > 0) {
      arrLS.forEach(entry => {
        addTask(entry);
      });
    }
  }
}

function addToLS() {
  const allTasks = document.querySelectorAll('.task__title');
  const tasks = [];
  allTasks.forEach(el => tasks.push(el.textContent));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}