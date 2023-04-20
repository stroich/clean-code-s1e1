let taskInput=document.querySelector('.addingTask-input');
let addButton=document.querySelector('.addingTask-button');
let incompleteTaskHolder=document.querySelector('.tasks');
let completedTasksHolder=document.getElementById("completed-tasks");


let createNewTaskElement=function(taskString){
    let listItem=document.createElement('li');
    let checkBox=document.createElement('input');
    let label=document.createElement('label');
    let editInput=document.createElement('input');
    let editButton=document.createElement('button');
    let deleteButton=document.createElement('button');
    let deleteButtonImg=document.createElement('img');
    listItem.classList.add('task');
    checkBox.classList.add('task-checkboxInput');
    label.classList.add('task-name');
    editInput.classList.add('task-textInput');
    editButton.classList.add('task-editButton');
    deleteButton.classList.add('task-deleteButton');
    deleteButtonImg.classList.add('task-imgButton');

    label.innerText=taskString;
    checkBox.type="checkbox";
    editInput.type="text";
    editButton.innerText="Edit";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.alt='remove';

    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



let addTask = function(){
    if (!taskInput.value) return;
    let listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

addButton.addEventListener('click', addTask);

let editTask = function(){
    let listItem=this.parentNode;
    let editInput=listItem.querySelector('input[type=text]');
    let label=listItem.querySelector("label");
    let editBtn=listItem.querySelector(".edit");
    let containsClass=listItem.classList.contains("editMode");

    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("editMode");
};


let deleteTask=function(){
    let listItem=this.parentNode;
    let ul=listItem.parentNode;
    ul.removeChild(listItem);
}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



addButton.addEventListener("click",addTask);


let bindTaskEvents = function(taskListItem,checkBoxEventHandler){
    let checkBox=taskListItem.firstElementChild;
    let editButton=taskListItem.lastElementChild.previousElementSibling
    let deleteButton=taskListItem.lastElementChild;

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}


for (let i = 0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
