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
    // bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

addButton.addEventListener('click', addTask);

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
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


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.