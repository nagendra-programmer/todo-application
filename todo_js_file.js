let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveButton=document.getElementById('saveButton');

//localStorage.removeItem('todoList');


saveButton.onclick=function(){
  localStorage.setItem('todoList',JSON.stringify(todoList));
}

function getTodoList(){
  let stringifiedTodoList=localStorage.getItem('todoList');
  let parsedTodoList=JSON.parse(stringifiedTodoList);

  if (parsedTodoList===null){
    return [];
  }
  else{
    return parsedTodoList;
  }
}

let todoList=getTodoList();


let todosCount = todoList.length;

function onTodoStatusChange(checkboxId, labelId,todoId) {
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle('checked');

  let todoItemIndex=todoList.findIndex(function(eachItem){
    let eachItemId='todo'+eachItem.uniqueNo;
    if (todoId===eachItemId){
      return true;
    }
    else{
      return false;
    }
  });
  let todoObj=todoList[todoItemIndex];
  if (todoObj.isChecked===true){
    todoObj.isChecked=false;
  }
  else{
    todoObj.isChecked=true;
  }
  
  // let checkboxElement = document.getElementById(checkboxId);
  // if(checkboxElement.checked===true){
  //   labelElement.classList.add('checked');
  // }
  // else{
  //   labelElement.classList.remove('checked');
  // }

}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deletedTodoItemIndex=todoList.findIndex(function(eachItem){
    let eachItemId='todo'+eachItem.uniqueNo;
    if(eachItemId===todoId){
      return true;
    }
    else{
      return false;
    }

  })
  todoList.splice(deletedTodoItemIndex,1);
  
}

function createAndAppendTodo(todo) {
  let todoId = 'todo' + todo.uniqueNo;
  let checkboxId = 'checkbox' + todo.uniqueNo;
  let labelId = 'label' + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked=todo.isChecked;

  inputElement.onclick = function() {
    onTodoStatusChange(checkboxId, labelId,todoId);
  }

  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;

  if(todo.isChecked===true){
    labelElement.classList.add('checked')
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };

  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}

function onAddTodo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value;

  if(userInputValue === ""){
    alert("Enter Valid Text");
    return;
  }

  todosCount = todosCount + 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked:false
  };
  
  todoList.push(newTodo);

  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

addTodoButton.onclick = function(){
  onAddTodo();
}