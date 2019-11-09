document.getElementById('docs_button_save').addEventListener('click',save,false);
document.getElementById("add_todolist").addEventListener('click', addTodoList, false);
document.getElementById("add_togglelist").addEventListener('click', addToggleList, false);
document.getElementById('doc_delete_button').addEventListener('click', delete_doc, false);
document.getElementById("doc_share_button").addEventListener('click', share, false);
document.getElementById("doc_alarm_button").addEventListener('click', alarm, false);

var image_count = 0;
var title;
var body;

async function alarm(){
    await save1();
}

async function save1(){
    if (document.getElementById("docs_title").value.length === 0) {
        alert("제목을 입력하세요.");
    } else {
        title = document.getElementById("docs_title").value;
        body = document.getElementById("docs_contents_container").innerHTML;
        await cibal1();
    }
}

async function cibal1(){
    var http = new XMLHttpRequest();
    try {
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&doc_title=" + title + "&doc_body=" + body + "&todo_count="+todo_count + "&toggle_count=" + toggle_count );
        if(http.readyState === 4 && http.status === 201){
            var response = JSON.parse(http.responseText);
        }
        alert("저장되었습니다.");
    }catch (e) {
        alert(e.toString());
    }
    await move1();
}
async function move1(){
    document.location.replace("send_alarm.html");
}


async function share() {
    await save2();
}

async function save2(){
    if (document.getElementById("docs_title").value.length === 0) {
        alert("제목을 입력하세요.");
    } else {
        title = document.getElementById("docs_title").value;
        body = document.getElementById("docs_contents_container").innerHTML;
        await cibal2();
    }
}

async function cibal2(){
    var http = new XMLHttpRequest();
    try {
        http.open('Post',"https://sharesdocument.ml/doc", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&doc_title=" + title + "&doc_body=" + body + "&todo_count="+todo_count + "&toggle_count=" + toggle_count );
        if(http.readyState === 4 && http.status === 201){
            var response = JSON.parse(http.responseText);
        }
        alert("저장되었습니다.");
    }catch (e) {
        alert(e.toString());
    }
    await move2();
}

async function move2(){
    document.location.replace("share.html");
}
async function save() {
    if (document.getElementById("docs_title").value.length === 0) {
        alert("제목을 입력하세요.");
    } else {
        title = document.getElementById("docs_title").value;
        body = document.getElementById("docs_contents_container").innerHTML;
        await cibal();
    }
}

async function cibal(){

    var http = new XMLHttpRequest();
    try {

        alert("저장되었습니다.");
        http.open('Post',"https://sharesdocument.ml/doc", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&doc_title=" + title + "&doc_body=" + body + "&todo_count="+todo_count + "&toggle_count=" + toggle_count );
         if(http.readyState === 4 && http.status === 201){
            var response = JSON.parse(http.responseText);
        }
    }catch (e) {
        alert(e.toString());
    }

}

function delete_doc() {
    alert("삭제되었습니다.");
    var xhttp = new XMLHttpRequest();
    try {
        xhttp.open("DELETE", "https://sharesdocument.ml/doc/" + doc_id,false);
        xhttp.send(null);
        if(xhttp.readyState == 4 && xhttp.status == 201){
            var response = JSON.parse(xhttp.responseText);
        }
    }catch (e) {
        alert(e.toString());
    }

    document.location.replace("list.html");
}

function addTodoList(){
    var container = document.getElementById("docs_contents_container");
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);

    var str = '<img src="images/check_off.png" id="todo_button'+todo_count+'" name="off" style="margin-right: 8px; width: 14px; height: 14px; margin-top: 2px;"><div class="todo_text" id="todo_text' + todo_count +'" contenteditable="true" placeholder ="To-do" style="display: inline; "></div>'

    var addedDiv = document.createElement("div");
    addedDiv.setAttribute('class', 'todo');
    addedDiv.setAttribute('id', 'todo_container' + todo_count);
    addedDiv.innerHTML = str;

    var emptyDiv = document.createElement("div");
    emptyDiv.innerHTML = '<br>'
    container.appendChild(emptyDiv);
    if(range.commonAncestorContainer.nodeName != 'SPAN') {
        range.insertNode(addedDiv);

        addTodoButtonEventListener(todo_count);
        //preventTodoEnter(todo_count);

    }
}

function addTodoButtonEventListener(count, from = "") {
    var buttonId = 'todo_button' + count;
    var textId = 'todo_text' + count;

    document.getElementById(buttonId).addEventListener('click', function(ev) {
        var button = document.getElementById(buttonId);
        var text = document.getElementById(textId)

        if(button.name == "off") {
            button.src = "images/check_on.png";
            button.name = "on";
            text.style.textDecoration = "line-through";
            text.style.color = "#aaaaaa"
        }
        else if(button.name == "on") {
            button.src = "images/check_off.png";
            button.name = "off";
            text.style.textDecoration = "none";
            text.style.color = "#000000"
        }
    })
    if(from != "load")
        todo_count++;
}

function addToggleList(){
    var container = document.getElementById("docs_contents_container");
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);

    var str ='<div style="display: flex; flex-direction: row"><div style="display: inline; width: 13px; height: 13px; margin-right: 5px;"><img id="toggle_button'+toggle_count +'" class="toggle_button" src="images/toggle_right.png"></div><div class="toggle_parent" id="toggle_parent_text' + toggle_count +'" contenteditable="true" placeholder ="상위 항목을 입력하세요." style="display: inline;"></div></div><div id = toggle_child' + toggle_count + ' style="display: none; margin-left: 18px; margin-top: 3px"><div class="toggle_child" id="toggle_child_text' + toggle_count +'" contenteditable="true" placeholder ="하위 항목을 입력하세요." style=" height: auto; " ></div></div>'

    var addedDiv = document.createElement("div");
    addedDiv.setAttribute('class', 'toggle');
    addedDiv.innerHTML = str;

    var emptyDiv = document.createElement("div");
    emptyDiv.innerHTML = '<br>'
    container.appendChild(emptyDiv);

    if(range.commonAncestorContainer.nodeName != 'SPAN') {
        range.insertNode(addedDiv);

        setToggleImgEventListener(toggle_count);

    }
}

// Todo: toggle img위에 커서 올려 놨을 때  1.background 생기도록, 2. cursor가 pointer이도록
function setToggleImgEventListener(count, from = "") {
    var button = 'toggle_button' + count;
    var childId = 'toggle_child' + count;

    document.getElementById(button).addEventListener('click', function(ev){
        var obj = document.getElementById(childId)
        var img = document.getElementById(button);

        if(obj.style.display == "none"){
            obj.style.display = "block";
            img.src = "images/toggle_down.png"
        }else{
            obj.style.display ="none";
            img.src = "images/toggle_right.png"
        }
    });

    if(from != "load") {
        toggle_count++;
    }

}

function setToggleTextColorEventListener(count) {
    var childeId = 'toggle_child_text' + (count - 1);
    $(parentId).keyup(function (e) {

    });
    $(childeId).keypress(function (e) {
        if (e.keyCode == 13)
            e.preventDefault();
    });
}
function addImage(input) {
    var addFormDiv = document.getElementById("docs_contents_container");

    var str = '<img id="image'+ image_count +'"src=""/>';
    var addedDiv = document.createElement("div");
    addedDiv.setAttribute("id", "image");
    addedDiv.innerHTML = str;
    addFormDiv.appendChild(addedDiv);

    setImageUrl(image_count, input)
    image_count++;
}

function setImageUrl(count, input){
    if (input.files && input.files[image_count]) {
        var reader = new FileReader();

        var size = prompt("사진의 크기를 입력해주세요");

        reader.onload = function(e) {
            var obj = document.getElementById('image' + count);
            obj.setAttribute('src', e.target.result);
            obj.setAttribute('width', size+'px');
            obj.setAttribute('height', size+'px');
        }
        reader.readAsDataURL(input.files[image_count]);
    }
}
