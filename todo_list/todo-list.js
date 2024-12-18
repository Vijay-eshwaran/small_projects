const todolist = [];

const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");

addBtn.addEventListener("click", function () {
  if (input.value === "") {
    input.placeholder = "Please enter a task !!!!!";
    return;
  }
  todolist.push(input.value);
  input.value = "";
  console.log(todolist);
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (input.value === "") {
      input.placeholder = "Please enter a task !!!!!";
      return;
    }
    todolist.push(input.value);
    input.value = "";
    console.log(todolist);
  }
});
