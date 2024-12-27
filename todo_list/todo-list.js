const nameInput = document.querySelector(".name-input");
const dateInput = document.querySelector(".date-input");
const addBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const deleteBtn = document.querySelector(".delete-btn");
const clearBtn = document.querySelector(".clear-btn");

const todolist = JSON.parse(localStorage.getItem("todolist")) || [];

renderTodoList();

function renderTodoList() {
  let todohtml = "";

  todolist.forEach(function (obj, i) {
    todohtml += `
    <div class="todoname">${obj.name}</div>
    <div class="tododate">${obj.date}</div>
    <button class="delete-btn" onclick="deleteTodoList(${i})">Delete</button>`;
  });

  console.log(todohtml);
  document.querySelector(".list").innerHTML = todohtml;
}

function deleteTodoList(index) {
  todolist.splice(index, 1);
  localStorage.setItem("todolist", JSON.stringify(todolist));
  renderTodoList();
  if (list.innerHTML === "") {
    list.innerHTML = "Empty :)";
  }
}

addBtn.addEventListener("click", function () {
  if (nameInput.value === "") {
    nameInput.placeholder = "Please enter a task !!!!!";
    return;
  }
  if (dateInput.value === "") {
    dateInput.value = "No date";
  }

  const obj = {
    name: nameInput.value,
    date: dateInput.value,
  };

  todolist.push(obj);
  nameInput.value = "";
  dateInput.value = "";

  // console.log(todolist);
  localStorage.setItem("todolist", JSON.stringify(todolist));
  renderTodoList();
});

nameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (nameInput.value === "") {
      nameInput.placeholder = "Please enter a task !!!!!";
      return;
    }

    const obj = {
      name: nameInput.value,
      date: dateInput.value,
    };

    todolist.push(obj);
    input.value = "";

    // console.log(todolist);
    localStorage.setItem("todolist", JSON.stringify(todolist));
    renderTodoList();
  }
});

clearBtn.addEventListener("click", function () {
  // todolist.splice(0, todolist.length);
  // localStorage.setItem('todolist', JSON.stringify(todolist));
  // renderTodoList();
  let interval;
  if (todolist.length > 0) {
    interval = setInterval(function () {
      todolist.pop();
      if(todolist.length === 0){
        clearInterval(interval);
      }
      localStorage.setItem("todolist", JSON.stringify(todolist));
      renderTodoList();
    }, 500);
  }
  localStorage.setItem("todolist", JSON.stringify(todolist));
});
