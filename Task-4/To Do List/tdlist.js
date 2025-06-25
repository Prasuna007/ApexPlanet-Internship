// Carousel logic 
let index = 0;
const slides = document.querySelectorAll('#carousel img');
setInterval(() => {
  slides[index].style.opacity = 0;
  index = (index + 1) % slides.length;
  slides[index].style.opacity = 1;
}, 3000);

// Image upload
document.getElementById('imageUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.style.opacity = 0;
      document.getElementById('carousel').appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// Dark Mode Toggle
const toggleBtn = document.getElementById('darkModeToggle');
const toggleIcon = document.getElementById('toggleIcon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    toggleIcon.classList.replace('bx-moon', 'bx-sun');
  } else {
    toggleIcon.classList.replace('bx-sun', 'bx-moon');
  }
  toggleIcon.classList.add('animate');
  toggleIcon.addEventListener('animationend', () => {
    toggleIcon.classList.remove('animate');
  }, { once: true });
});

let lastDeletedTask = null;

// Add Task Function
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const noteInput = document.getElementById('noteInput');
  const deadlineInput = document.getElementById('deadlineInput');
  const todoList = document.getElementById('todoList');

  if (!taskInput.value) return alert('Please enter a task');

  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  taskDiv.setAttribute('draggable', 'true');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  label.textContent = taskInput.value;

  const note = document.createElement('div');
  note.className = 'task-note';
  if (noteInput.value) note.textContent = `Note: ${noteInput.value}`;

  const deleteBtn = document.createElement('i');
  deleteBtn.className = 'bx bx-x delete-btn';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.style.marginLeft = 'auto';
  deleteBtn.style.color = 'red';

  deleteBtn.addEventListener('click', () => {
    taskDiv.classList.add('fadeOut');
    lastDeletedTask = taskDiv.cloneNode(true);
    setTimeout(() => taskDiv.remove(), 500);
    saveToLocalStorage();
    showUndoPopup();
  });

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      label.classList.add('strike');
      setTimeout(() => {
        const completedList = document.getElementById('completedList');
        const completedTask = taskDiv.cloneNode(true);
        const timestamp = document.createElement('div');
        timestamp.style.fontSize = '0.85em';
        timestamp.style.color = '#555';
        timestamp.textContent = `✅ Completed on ${new Date().toLocaleString()}`;
        completedTask.appendChild(timestamp);
        completedList.appendChild(completedTask);
        taskDiv.classList.add('fadeOut');
        setTimeout(() => taskDiv.remove(), 500);
        showCongrats();
      }, 400);
    }
  });

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(label);
  taskDiv.appendChild(note);
  taskDiv.appendChild(deleteBtn);

  // Deadline Countdown
  const deadline = new Date(deadlineInput.value);
  taskDiv.dataset.deadline = deadlineInput.value;
  if (deadlineInput.value) {
    const countdownDiv = document.createElement('div');
    countdownDiv.className = 'countdown';
    taskDiv.appendChild(countdownDiv);
    startCountdown(countdownDiv, deadlineInput.value);
  }

  todoList.appendChild(taskDiv);

  taskInput.value = '';
  noteInput.value = '';
  deadlineInput.value = '';
  saveToLocalStorage();
}

function showCongrats() {
  const msg = document.getElementById('congratsMessage');
  msg.style.display = 'block';
  setTimeout(() => {
    msg.style.display = 'none';
  }, 3000);
}

function showUndoPopup() {
  const undoPopup = document.getElementById('undoNotification');
  undoPopup.style.display = 'block';
  setTimeout(() => undoPopup.style.display = 'none', 5000);
  saveToLocalStorage();
}

document.getElementById('undoBtn').addEventListener('click', () => {
  if (lastDeletedTask) {
    const todoList = document.getElementById('todoList');
    const restoredTask = lastDeletedTask.cloneNode(true);
    restoredTask.classList.remove('fadeOut');

    const checkbox = restoredTask.querySelector('input[type="checkbox"]');
    const label = restoredTask.querySelector('label');
    const deleteBtn = restoredTask.querySelector('.delete-btn');
    const countdown = restoredTask.querySelector('.countdown');

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        label.classList.add('strike');
        setTimeout(() => {
          const completedList = document.getElementById('completedList');
          const completedTask = restoredTask.cloneNode(true);
          const timestamp = document.createElement('div');
          timestamp.style.fontSize = '0.85em';
          timestamp.style.color = '#555';
          timestamp.textContent = `✅ Completed on ${new Date().toLocaleString()}`;
          completedTask.appendChild(timestamp);
          completedList.appendChild(completedTask);
          restoredTask.classList.add('fadeOut');
          setTimeout(() => restoredTask.remove(), 500);
          showCongrats();
        }, 400);
      }
    });

    deleteBtn.addEventListener('click', () => {
      restoredTask.classList.add('fadeOut');
      lastDeletedTask = restoredTask.cloneNode(true);
      setTimeout(() => restoredTask.remove(), 500);
      showUndoPopup();
    });

    if (countdown && countdown.dataset.timer) {
      clearInterval(countdown.dataset.timer);
    }

    const deadlineInput = document.getElementById('deadlineInput');
    if (countdown && deadlineInput?.value) {
      startCountdown(countdown, deadlineInput.value);
    }

    todoList.appendChild(restoredTask);
    lastDeletedTask = null;
    document.getElementById('undoNotification').style.display = 'none';
  }
});

// Disable past dates in deadline input
const deadlineInput = document.getElementById('deadlineInput');
function updateMinDatetime() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  deadlineInput.min = local;
}
updateMinDatetime();
setInterval(updateMinDatetime, 60000);

function startCountdown(span, deadline) {
  const interval = setInterval(() => {
    const now = new Date();
    const diff = new Date(deadline) - now;

    if (diff <= 0) {
      span.textContent = '';
      const overdue = document.createElement('div');
      overdue.className = 'overdue';
      overdue.textContent = '⏰ Deadline exceeded';
      span.parentNode.appendChild(overdue);
      clearInterval(interval);
    } else {
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      span.textContent = `${hrs}h ${mins}m ${secs}s`;
    }
  }, 1000);

  span.dataset.timer = interval;
}

// Drag and Drop functionality
const todoList = document.getElementById('todoList');

todoList.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('task')) {
    e.target.classList.add('dragging');
  }
});

todoList.addEventListener('dragend', (e) => {
  if (e.target.classList.contains('task')) {
    e.target.classList.remove('dragging');
  }
});

todoList.addEventListener('dragover', (e) => {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(todoList, e.clientY);
  if (afterElement == null) {
    todoList.appendChild(dragging);
  } else {
    todoList.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    document.getElementById('todoList').innerHTML = saved;
    restoreEvents();
  }
});

// Save current task list to localStorage
function saveToLocalStorage() {
  const todoList = document.getElementById('todoList');
  localStorage.setItem('tasks', todoList.innerHTML);
}

// Restore event listeners for restored tasks
function restoreEvents() {
  document.querySelectorAll('#todoList .task').forEach(task => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    const label = task.querySelector('label');
    const deleteBtn = task.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        label.classList.add('strike');
        setTimeout(() => {
          const completedList = document.getElementById('completedList');
          const completedTask = task.cloneNode(true);
          const timestamp = document.createElement('div');
          timestamp.style.fontSize = '0.85em';
          timestamp.style.color = '#555';
          timestamp.textContent = `✅ Completed on ${new Date().toLocaleString()}`;
          completedTask.appendChild(timestamp);
          completedList.appendChild(completedTask);
          task.classList.add('fadeOut');
          setTimeout(() => task.remove(), 500);
          showCongrats();
          saveToLocalStorage();
        }, 400);
      }
    });

    deleteBtn.addEventListener('click', () => {
      task.classList.add('fadeOut');
      lastDeletedTask = task.cloneNode(true);
      setTimeout(() => task.remove(), 500);
      showUndoPopup();
    });
  });
}

// Remove All Button
document.getElementById('removeAllBtn').addEventListener('click', () => {
  if (confirm('Are you sure you want to remove all tasks?')) {
    document.getElementById('todoList').innerHTML = '';
    localStorage.removeItem('tasks');
  }
});

// Download Button
const { jsPDF } = window.jspdf;

  document.getElementById('downloadBtn').addEventListener('click', () => {
    const todoList = document.getElementById('todoList');
    const clone = todoList.cloneNode(true);

    // Replace countdowns with readable deadline
    clone.querySelectorAll('.task').forEach(task => {
      const countdown = task.querySelector('.countdown');
      if (countdown) {
        countdown.remove();
      }

      const deadline = task.dataset.deadline || 'Not specified';
      const deadlineText = document.createElement('div');
      deadlineText.textContent = `🕓 Deadline: ${new Date(deadline).toLocaleString()}`;
      deadlineText.style.fontSize = '0.9em';
      deadlineText.style.color = '#333';
      task.appendChild(deadlineText);
    });

    // Prepare printable container
    const printArea = document.createElement('div');
    printArea.style.padding = '20px';
    printArea.style.color = 'black';
    printArea.style.fontFamily = 'Arial, sans-serif';
    printArea.style.background = 'white';
    printArea.appendChild(clone);

    document.body.appendChild(printArea); // required for rendering

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('To-Do List:', 10, 10);

    let y = 20;
    document.querySelectorAll('#taskList li').forEach((task, index) => {
      doc.text(`${index + 1}. ${task.textContent.trim()}`, 10, y);
      y += 10;
    });

    doc.save('ToDo_List.pdf')});