const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function saveTasks() {
  const tasks = [];

  taskList.querySelectorAll('li').forEach(function(li) {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(taskText, isCompleted) {
  const li = document.createElement('li');
  li.textContent = taskText;

  if (isCompleted) {
    li.classList.add('completed');
  }

  li.addEventListener('click', function() {
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');

  deleteBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    li.remove();
    saveTasks();
  });
  const editBtn = document.createElement('button');
editBtn.textContent = 'Edit';
editBtn.classList.add('edit-btn');

editBtn.addEventListener('click', function(event) {
  event.stopPropagation();

  const newText = prompt('Edit task:', li.firstChild.textContent);

  if (newText !== null && newText.trim() !== '') {
    li.firstChild.textContent = newText.trim();
    saveTasks();
  }
});
  
  li.appendChild(editBtn);
li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

addBtn.addEventListener('click', function() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    return;
  }

  createTaskElement(taskText, false);
  saveTasks();

  taskInput.value = '';
});

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(function(task) {
  createTaskElement(task.text, task.completed);
});const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    taskList.querySelectorAll('li').forEach(function(li) {
      const isCompleted = li.classList.contains('completed');

      if (filter === 'all') {
        li.style.display = 'flex';
      } else if (filter === 'active') {
        li.style.display = isCompleted ? 'none' : 'flex';
      } else if (filter === 'completed') {
        li.style.display = isCompleted ? 'flex' : 'none';
      }
    });
    
  });
});
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
clearCompletedBtn.addEventListener('click', function() {
  taskList.querySelectorAll('li').forEach(function(li) {
    if (li.classList.contains('completed')) {
      li.remove();
    }
  });

  saveTasks();
});