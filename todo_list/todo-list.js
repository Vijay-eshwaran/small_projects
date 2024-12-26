const todolist = [];

function renderTodoList() {

  let todohtml = '';

  for(let i=0;i<todolist.length;i++){
    const todo = todolist[i];
    const html = `<p>${todo}</p>`
    todohtml += html;
  }
  
  console.log(todohtml);
  document.querySelector('.list').innerHTML = todohtml;
}


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
  renderTodoList();
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
    renderTodoList();
  }
});
