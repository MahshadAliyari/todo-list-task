const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");

let todos = [];

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText === "") {
    return;
  }
  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
  };
  todos.push(newTodo);
  saveTodos();
  renderTodos();
  todoInput.value = "";
});
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(function (todo) {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = todo.text;

    // Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.classList.add("edit-btn");

    editButton.addEventListener("click", function () {
      editTodo(todo.id);
    });

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", function () {
      deleteTodo(todo.id);
    });

    li.append(text);
    li.append(editButton);
    li.append(deleteButton);

    todoList.append(li);
  });
}
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
}
function editTodo(id) {
  const todo = todos.find(function (todo) {
    return todo.id === id;
  });

  const newText = prompt("Edit your todo:", todo.text);

  if (newText === null) {
    return;
  }

  const trimmedText = newText.trim();

  if (trimmedText === "") {
    return;
  }

  todo.text = trimmedText;
  false;
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  saveTodos();
  renderTodos();
}

loadTodos();

renderTodos();
