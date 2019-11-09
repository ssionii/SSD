document.getElementById('docs_button_save').addEventListener('click',save,false);
document.getElementById("add_todolist").addEventListener('click', addTodoList, false);
document.getElementById("add_togglelist").addEventListener('click', addToggleList, false);
document.getElementById('doc_delete_button').addEventListener('click', delete_doc, false);
document.getElementById("doc_share_button").addEventListener('click', share, false);
document.getElementById("doc_alarm_button").addEventListener('click', alarm, false);

var image_count = 0;
var body;
var title;
var body;
var doc_content;

async function share() {
    await save1();
}
async function save1() {

    if(document.getElementById("docs_title").value.length === 0) {
        alert("제목을 입력하세요.");
    }else{
        title = document.getElementById("docs_title").value;
        body =  document.getElementById("docs_contents_container").innerHTML;

        chrome.storage.sync.get('doc_content', async function (items) {
            doc_content = items.doc_content;
            if (!chrome.runtime.error) {
            }
            await ha1();
        });
        document.location.replace('share.html');
    }
}

async function ha1() {
    var body = document.getElementById("docs_contents_container").innerHTML;
    if(doc_content == body && doc_title == title){
        alert("변경 사항이 없습니다.");
    } else{
        alert("변경되었습니다.");
    }


    doc_title = document.getElementById("docs_title").value;
    var http = new XMLHttpRequest();
    try {

        http.open('Post',"https://sharesdocument.ml/doc", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&doc_title=" + doc_title + "&doc_body=" + body + "&todo_count=" + todo_count + "&toggle_count=" + toggle_count ); //doc_alarm 추가

        if(http.readyState === 4 && http.status === 201){
            var response = JSON.parse(http.responseText);
        }

    }catch (e) {
        alert(e.toString());
    }

}

async function alarm() {
    await save2();
}
async function save2() {

    if(document.getElementById("docs_title").value.length === 0) {
        alert("제목을 입력하세요.");
    }else{
        title = document.getElementById("docs_title").value;
        body =  document.getElementById("docs_contents_container").innerHTML;

        chrome.storage.sync.get('doc_content', async function (items) {
            doc_content = items.doc_content;
            if (!chrome.runtime.error) {
            }
            await ha2();
        });
        document.location.replace('send_alarm.html');
    }
}

async function ha2() {
    var body = document.getElementById("docs_contents_container").innerHTML;
    if(doc_content == body && doc_title == title){
        alert("변경 사항이 없습니다.");
    } else{
        alert("변경되었습니다.");
    }


    doc_title = document.getElementById("docs_title").value;
    var http = new XMLHttpRequest();
    try {
        http.open('Post',"https://sharesdocument.ml/doc", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&doc_title=" + doc_title + "&doc_body=" + body + "&todo_count=" + todo_count + "&toggle_count=" + toggle_count ); //doc_alarm 추가

        if(http.readyState === 4 && http.status === 201){

            var response = JSON.parse(http.responseText);
        }
    }catch (e) {
        alert(e.toString());
    }
}

async function save() {

    if(document.getElementById("docs_title").value.length === 0) {
        alert("제목을 입력하세요.");
    }else{

        title = document.getElementById("docs_title").value;
        body =  document.getElementById("docs_contents_container").innerHTML;

        chrome.storage.sync.get('doc_content', async function (items) {
            doc_content = items.doc_content;
            if (!chrome.runtime.error) {
            }
            await ha();
        });
        document.location.replace('docs.html');
    }
}

async function ha() {
    var body = document.getElementById("docs_contents_container").innerHTML;
    if(doc_content == body && doc_title == title){
        alert("변경 사항이 없습니다.");
    } else{
        alert("변경되었습니다.");
    }

    doc_title = document.getElementById("docs_title").value;
    var http = new XMLHttpRequest();
    try {
        http.open('Post',"https://sharesdocument.ml/doc", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&doc_title=" + doc_title + "&doc_body=" + body + "&todo_count=" + todo_count + "&toggle_count=" + toggle_count ); //doc_alarm 추가

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

function setToggleImgEventListener(count, from = "") {

    var buttonId = 'toggle_button' + count;
    alert(buttonId)
    var childId = 'toggle_child' + count;

    document.getElementById(buttonId).addEventListener('click', function(ev){
        var obj = document.getElementById(childId)
        var img = document.getElementById(buttonId);

        if(obj.style.display == "none"){
            obj.style.display = "block";
            img.src = "images/toggle_down.png"
        }else{
            obj.style.display ="none";
            img.src = "images/toggle_right.png"
        }
    });

    if(from != "load")
        toggle_count++;
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



function clickTodo(id){
    var obj = document.getElementById(id);
    obj.style.background = rgb(255, 142, 80);

    var selector = document.getElementById('todo_selector' + id.substring(13));
}

function addNotionTodoList(){
    var button = '<div style="margin-right: 4px; width: 24px; display: flex; align-items: center; justify-content: center; flex-grow: 0; flex-shrink: 0; min-height: calc((1.5em + 3px) + 3px); padding-right: 2px;"><div style="width: 16px; height: 16px; display: flex; align-items: stretch; justify-content: stretch; flex-shrink: 0; flex-grow: 0; cursor: pointer; transition: background 200ms ease-out 0s; background: rgb(46, 170, 220);"> <div role="button" aria-disabled="false" style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; display: flex; align-items: center; justify-content: center; width: 100%;"> <svg viewBox="0 0 14 14" class="check" style="width: 12px; height: 12px; display: block; fill: white; flex-shrink: 0; backface-visibility: hidden;"> <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></svg></div></div></div>'
    var text = '<div style="flex: 1 1 0px; min-width: 1px; display: flex; flex-direction: column;"> <div> <div contenteditable="true"  style="max-width: 100%; padding-top: 3px; padding-bottom: 3px; text-align: left; text-decoration: line-through; opacity: 0.375;"></div></div><div></div></div>'
    var str = '<div class="todo" style="width: 100%; max-width: 100%; margin-top: 1px; margin-bottom: 1px; position: relative;"><div style="display: flex; align-items: flex-start; width: 100%; padding-left: 2px; color: inherit; fill:inherit">' + button + text +'</div></div>'
}
