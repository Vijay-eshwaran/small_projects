const nameInput = document.querySelector(".name-input");
const dateInput = document.querySelector(".date-input");
const addBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const deleteBtn = document.querySelector(".delete-btn");



const todolist = [];



function renderTodoList() {
  let todohtml = '';
  for (let i = 0; i < todolist.length; i++) {
    const todoobj = todolist[i];
    // const name = todoobj.title;
    // const date = todoobj.date;
    const {name} = todoobj;
    const {date} = todoobj;
    const html = `
    <div class="todoname">${name}</div>  
    <div class="tododate">${date}</div>
    <button class="delete-btn" onclick="deleteTodoList(${i})">Delete</button>`;
    todohtml += html;
  }
  console.log(todohtml);
  document.querySelector('.list').innerHTML = todohtml;
}

function deleteTodoList(index) {
  todolist.splice(index, 1);
  renderTodoList();
  if(list.innerHTML === ''){
    list.innerHTML = 'Empty :)'
  }
}




addBtn.addEventListener("click", function () {
  if (nameInput.value === "" ) {
    nameInput.placeholder = "Please enter a task !!!!!";
    return;
  }
  if (dateInput.value === "") {
    dateInput.value = "No date";
  } 

  const obj = {
    name: nameInput.value,
    date: dateInput.value
  }

  todolist.push(obj);
  nameInput.value = "";
  dateInput.value = "";

  console.log(todolist);
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
      date: dateInput.value
    }
  
    todolist.push(obj);
    input.value = "";

    console.log(todolist);
    renderTodoList();
  }
});
