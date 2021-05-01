showTask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function () {
    addtaskinputval = addtaskinput.value;
if (addtaskinputval.trim()!=0) {
    
    let webtask = localStorage.getItem('localtask');
    if (webtask == null) {
        taskObj = [];
    
    } else {
        taskObj = JSON.parse(webtask);
    }
    taskObj.push(addtaskinputval);
    
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value = '';
}
    showTask()
})


function showTask(){
    let webtask = localStorage.getItem('localtask');
    if (webtask == null) {
        taskObj = [];

    } else {
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let addedTaskList = document.getElementById('addedtasklist');

    taskObj.forEach((item,index) => {
        html += `<tr>
        <th scope="row">${index+1}
        </th>
            <td>${item}</td>
            <td><button type="button" class="text-primary" onclick=
            "editTask(${index})"><i class="fa fa-edit">Edit</i></button></td>
            <td><button class="text-danger" onclick="deleteitem(${index})"><i class="fa fa-trash">Delete</i></button></td>
    </tr>`;
    })

    addedTaskList.innerHTML = html;
}

function editTask(index) {
    let saveIndex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveIndex.value = index
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    
    addtaskinput.value = taskObj[index];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
}

//savetask
let savetask = document.getElementById("savetaskbtn");
savetask.addEventListener('click', ()=>{
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask)
    let saveindex = document.getElementById("saveindex").value;
    taskObj[saveindex] = addtaskinput.value;
    savetaskbtn.style.display='none';
    addtaskbtn.style.display='block';
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    addtaskinput.value='';
    showTask();
})

function deleteitem(index) {
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask();
}

let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", ()=>{
    let savetaskbtn = document.getElementById("savetaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    if (webtask == null) {
        taskObj = [];
    }

    else{
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savetask.style.display="none";
    addtaskbtn.style.display='block';
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    showTask();
})

//search
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", () => {
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach((item) => {
        let searchedtext = item.getElementsByTagName("td")[0].innerHTML
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi');
        if (searchedtext.match(re)) {
            item.style.display='block';
        }
        else{
            item.style.display='none'
        }
    })
})