let arr = [];

let tasks = document.getElementById('tasks');

let add_button = document.getElementById('add');
let clear = document.getElementById('clear');

let all_tasks = document.getElementById('all');
let pending_tasks = document.getElementById('pending');
let completed_tasks = document.getElementById('completed'); 

let local_s_length = 0;
let id = 0;
if (localStorage.getItem('id') !== null){
    id = localStorage.getItem('id');
}

if (localStorage.getItem('tasks') !== null){
    arr = JSON.parse(localStorage.getItem('tasks'));

    LoadTasks('all');
}

add_button.addEventListener('click', function () {
    let text = document.getElementById('inp').value;
    if (text == ''){
        document.body.querySelector('h1').innerText = "Write a task!!!";
    }
    else {
        document.body.querySelector('h1').innerText = "";

        document.querySelector('.tasks').innerHTML += `<div class="head_task${id}"><hr><div class="task"><div class="task__text"><input type="checkbox" class="checkbox" id="completed_or_no" onclick="textLineThrough(event)"><p>${text}</p></div><button class="btn" id="del" onclick="delTask(event)"><img src="img/cross.png" alt="Delete"></button></div></div>`;
        document.getElementById('inp').value = '';

        let new_task = [id, text, false];
        arr.push(new_task);
        localStorage.setItem('tasks', JSON.stringify(arr));

        id++;
        localStorage.setItem('id', JSON.stringify(id));
    }
});

clear.addEventListener("click", function Clear() {
    tasks.innerHTML = '';
    arr = [];

    localStorage.removeItem('tasks');
});

all_tasks.addEventListener("click", function (event) {
    tasks.innerHTML = '';

    pending_tasks.classList.remove('active');
    completed_tasks.classList.remove('active');
    event.target.classList.add('active');

    LoadTasks('all');
});

pending_tasks.addEventListener("click", function (event) {
    tasks.innerHTML = '';

    all_tasks.classList.remove('active');
    completed_tasks.classList.remove('active');
    event.target.classList.add('active');

    LoadTasks('pending');
});

completed_tasks.addEventListener("click", function (event) {
    tasks.innerHTML = '';

    all_tasks.classList.remove('active');
    pending_tasks.classList.remove('active');
    event.target.classList.add('active');

    LoadTasks('completed');
});

function delTask(event){
    let task = event.target.parentNode.parentNode.parentNode;

    let id = GetID(task.className);

    for (let i = 0; i < arr.length; i++){
        if (arr[i][0] == id){
            arr.splice(i, 1);

            localStorage.setItem('tasks', JSON.stringify(arr));
            task.remove();
        }
    }
}

function textLineThrough(event){
    let old_task = 0;

    let str = event.target.parentNode.parentNode.parentNode.className;

    let id = GetID(str);
    let text = event.target.parentNode.querySelector('p');

    for (let i = 0; i < arr.length; i++){
        if (arr[i][0] == id){
            old_task = i;
        }
    }

    if (event.target.checked == true){
        let new_task = [id, text.innerText, true];
        arr[old_task] = new_task;

        localStorage.setItem('tasks', JSON.stringify(arr));
    }
    else {
        let new_task = [id, text.innerText, false];
        arr[old_task] = new_task;

        localStorage.setItem('tasks', JSON.stringify(arr));
    }
    text.classList.toggle('completed');
}

function GetID(str) {
    let digits = Number(str.match(/\d+/g).map(Number));
    return digits;
}

function LoadTasks(status_tasks) {
    if (status_tasks == 'all'){
        for (let i = 0; i < arr.length; i++){
            let task_id = arr[i][0];
            let task_text = arr[i][1];
            let task_check = arr[i][2];
    
            if (task_check == true){
                document.querySelector('.tasks').innerHTML += `<div class="head_task${task_id}"><hr><div class="task"><div class="task__text"><input type="checkbox" class="checkbox" id="completed_or_no" onclick="textLineThrough(event)" checked><p class="completed">${task_text}</p></div><button class="btn" id="del" onclick="delTask(event)"><img src="img/cross.png" alt="Delete"></button></div></div>`;
            }
            else {
                document.querySelector('.tasks').innerHTML += `<div class="head_task${task_id}"><hr><div class="task"><div class="task__text"><input type="checkbox" class="checkbox" id="completed_or_no" onclick="textLineThrough(event)"><p>${task_text}</p></div><button class="btn" id="del" onclick="delTask(event)"><img src="img/cross.png" alt="Delete"></button></div></div>`;
            }
        }
    }
    else if (status_tasks == 'pending'){
        for (let i = 0; i < arr.length; i++){
            let task_id = arr[i][0];
            let task_text = arr[i][1];
            let task_check = arr[i][2];

            if (task_check == false){
                document.querySelector('.tasks').innerHTML += `<div class="head_task${task_id}"><hr><div class="task"><div class="task__text"><input type="checkbox" class="checkbox" id="completed_or_no" onclick="textLineThrough(event)"><p>${task_text}</p></div><button class="btn" id="del" onclick="delTask(event)"><img src="img/cross.png" alt="Delete"></button></div></div>`;
            }
        }
    }
    else if (status_tasks == 'completed'){
        for (let i = 0; i < arr.length; i++){
            let task_id = arr[i][0];
            let task_text = arr[i][1];
            let task_check = arr[i][2];
    
            if (task_check == true){
                document.querySelector('.tasks').innerHTML += `<div class="head_task${task_id}"><hr><div class="task"><div class="task__text"><input type="checkbox" class="checkbox" id="completed_or_no" onclick="textLineThrough(event)" checked><p class="completed">${task_text}</p></div><button class="btn" id="del" onclick="delTask(event)"><img src="img/cross.png" alt="Delete"></button></div></div>`;
            }
        }
    }
}