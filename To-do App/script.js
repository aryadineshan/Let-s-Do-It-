// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearbtn=document.getElementById('clearbtn');

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
});

// Function to create a task element
function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;

  if (completed) {
    li.classList.add('completed');
  }

  // Toggle complete on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'X';
  removeBtn.className = 'remove-btn';
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevents toggle when clicking remove
    taskList.removeChild(li);
    saveTasks();
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

// Function to save all tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task when button is clicked
addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTaskElement(taskText);
    saveTasks();
    taskInput.value = '';
  }
});

// Allow pressing Enter to add task
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTaskBtn.click();
  }
});
clearbtn.addEventListener('click',() =>{
    if (confirm("Are you sure you want to delete all tasks?")) {
    taskList.innerHTML='';
    localStorage.removeItem('tasks');
    }

});
