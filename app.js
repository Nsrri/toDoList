class toDoItem {
  constructor(nameItem, id, status) {
    this.nameItem = nameItem;
    this.id = id;
    this.status = status;
  }
  // setStatus() {
  //   if(this.status == true){
  //    return this.status = false;
  //   }else{
  //    return this.status = true;
  //   }
  
  // }
}
 var toDoList = [];

// acess to html element via dom
let main = document.querySelector("main");
let userInput = document.querySelector("input");
let addBtn = document.querySelector("button");

let list = document.createElement("ol");
main.appendChild(list);
// this idcounter is a connecting bridge between several element and use it when we want to do an event.
let idCounter = 0;
addBtn.addEventListener("click", () => addNewTask(userInput.value));
if(localStorage.getItem("toDoList")!== null){
  toDoList = JSON.parse(localStorage.getItem("toDoList"));
  showToDoList();
}
function showToDoList() {
   list.textContent = "";
  for (let index = 0; index < toDoList.length; index++) {
    let li = document.createElement("li");
    li.id = toDoList[index].id; //usage of idcounter
    li.textContent = toDoList[index].nameItem;
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = toDoList[index].id; //usage of idcounter
    // creat remove button for each task
    let removeBtn = document.createElement("button");
    removeBtn.id = toDoList[index].id; //usage of idcounter
    removeBtn.type = "button";
    removeBtn.textContent = "X";
    li.appendChild(removeBtn);
    li.appendChild(checkBox);
    list.appendChild(li);
  }

  let rm = document.querySelectorAll("button[type=button]");

  let checkBtn = document.querySelectorAll("input[type=checkbox]");
  for (let index = 0; index < checkBtn.length; index++) {
    const element = checkBtn[index];
    element.addEventListener("change", changeStatus);
    rm[index].addEventListener("click", remove);
  }
 }

// li.style["background-color"] = "red";

function changeStatus() {
  let inputID = this.id;
  let li = document.getElementById(inputID);
  // toDoList[inputID].setStatus();
  // console.log( toDoList[inputID].status);
  if( toDoList[inputID].status == false){
    toDoList[inputID].status = true;
    li.style.backgroundColor="red";
  }else{
    li.style.backgroundColor="white";
    toDoList[inputID].status = false;
  }
  saveToDoLIst();
}

function addNewTask(inputItem) {
  let item = new toDoItem(inputItem, idCounter, false);
  toDoList.push(item);
  idCounter++;
  showToDoList();
  saveToDoLIst();
}
function saveToDoLIst(){
  window.localStorage.setItem("toDoList",JSON.stringify(toDoList));
}

function remove() {
  for (let index = 0; index < toDoList.length; index++) {
    const element = toDoList[index];
    if (element.id == this.id) {
      toDoList.splice(index, 1);
    }
  }
  showToDoList();
  saveToDoLIst();
}
