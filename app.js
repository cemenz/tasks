// Получаем элементы DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Получаем данные из localStorage при загрузке страницы
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Функция для обновления задач в localStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для добавления новой задачи
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Пожалуйста, введите текст задачи.');
        return;
    }

    const task = {
        id: Date.now(), // Уникальный идентификатор на основе времени
        text: taskText,
        completed: false,
    };

    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        const index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
            updateLocalStorage();
        }
    });

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';

    completeButton.addEventListener('click', () => {
        task.completed = !task.completed;
        taskItem.classList.toggle('completed');
        updateLocalStorage();
    });

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(completeButton);
    taskList.appendChild(taskItem);

    tasks.push(task);
    updateLocalStorage();

    taskInput.value = ''; // Очищаем поле ввода
}

function loadTasks() {
    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);


    incompleteTasks.forEach(task => {
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
    });

    completedTasks.forEach(task => {
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
    });
}

// Функция для создания элемента задачи
function createTaskItem(task) {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    if (task.completed) {
        taskItem.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        const index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
            updateLocalStorage();
        }
    });

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';

    completeButton.addEventListener('click', () => {
        task.completed = !task.completed;
        taskItem.classList.toggle('completed');
        updateLocalStorage();

        // Перемещаем завершенную задачу в конец списка
        if (task.completed) {
            taskList.appendChild(taskItem);
        }
    });

    

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(completeButton);

    return taskItem;
}


// Обработчик нажатия на кнопку "Добавить"
addTaskButton.addEventListener('click', addTask);

// Обработчик нажатия клавиши Enter в поле ввода
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Удаление последнего элемента списка
function removeLast() {
    const lastElement = taskList.lastChild;
    if (lastElement) {
        console.log(lastElement);
        taskList.removeChild(lastElement);

        // Удаление задачи из массива и обновление localStorage
        const lastTaskId = tasks[tasks.length - 1].id; // Получаем id последней задачи
        const index = tasks.findIndex(task => task.id === lastTaskId);
        if (index !== -1) {
            tasks.splice(index, 1);
            updateLocalStorage();
        }
    } else {
        alert('Задач нет');
    }
}

// Удаление первого элемента списка
function removeFirst() {
    const firstElement = taskList.firstChild;
    if (firstElement) {
        console.log(firstElement);
        taskList.removeChild(firstElement);

        // Удаление задачи из массива и обновление localStorage
        const firstTaskId = tasks[0].id; // Получаем id первой задачи
        const index = tasks.findIndex(task => task.id === firstTaskId);
        if (index !== -1) {
            tasks.splice(index, 1);
            updateLocalStorage();
        }
    } else {
        alert('Задач нет');
    }
}

deleteLast.addEventListener('click', removeLast);
deleteFirst.addEventListener('click', removeFirst);

// Загрузка задач при загрузке страницы
loadTasks();

