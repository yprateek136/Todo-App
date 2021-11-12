const inputBox =  document.querySelector(".inputField input");
const addBtn =  document.querySelector(".inputField button");
const todoList =  document.querySelector(".todoList");
const deleteAllBtn =  document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //if user value aren't only space
        addBtn.classList.add("active"); //active the add button
    }
    else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}
/*------------------------if user click on the add button--------------------*/
addBtn.onclick = ()=>{
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null ){ // if local storage is null
        listArr = []; //create blank array
    }
    else{
        listArr = JSON.parse(getLocalStorage);  //transfering  JSON string into a js object
    }
    listArr.push(userData); // pusing or adddig user data
    localStorage.setItem("New Todo" ,JSON.stringify(listArr)); // transfering js object into a JSON string
    showTasks();// calling showtasks function
    addBtn.classList.remove("active"); //unactive the add button
}
/*------------------------function to add task list inside ul--------------------*/
function showTasks(){
    let getLocalStorage =localStorage.getItem("New Todo");//getting local storage
    if(getLocalStorage == null ){
        listArr = []; //create blank array
    }else{
        listArr = JSON.parse(getLocalStorage);  //transfering  JSON string into a js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length ;// passing the length value in pendingNumb

    if( listArr.length > 0){ //if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the clear all btn
    }
    else{
        deleteAllBtn.classList.remove("active"); // unactive the clear all btn
    }
    let newLiTag =  '';
    listArr.forEach((element , index) =>{
        newLiTag += `<li> ${element} <span onclick= "deleteTask(${index})" ><i class="fas fa-trash"></i></span></li>`;
    });    
    todoList.innerHTML = newLiTag; //adding new li tag inside  ul tag
    inputBox.value=""; //once the task field added leave the input field blank
}
/*----------------------------delete task function----------------------------*/
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage); 
    listArr.splice(index , 1); //delete or remove particular task
    // after remove the li again update the loacl storage
    localStorage.setItem("New Todo" ,JSON.stringify(listArr)); // transfering js object into a JSON string
    showTasks(); // calling showtasks function
}
/*----------------------------delete all tasks functions-----------------------*/
deleteAllBtn.onclick = ()=>{
    listArr = []; //empty array
    // after delete all the task again update the local storage
    localStorage.setItem("New Todo" , JSON.stringify(listArr));  // transfering js object into a JSON string
    showTasks(); // calling showtasks function
}