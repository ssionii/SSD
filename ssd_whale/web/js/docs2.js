document.getElementById('docs_submit').addEventListener('click',save,false);
function save() {

    if(document.getElementById("docs_title").value != null) {
        alert(1);
    }else{
        alert("제목을 입력하세요")
    }

    /*var parms = {
        doc_id: 0,
        doc_title: document.getElementById("docs_title"),
        doc_body: document.getElementById("docs_content_container").innerHTML,
        user_id: "lsm0341"
    }
    var http = new XMLHttpRequest();

     try {
         http.open('Post',"/doc", false );

         //http.setRequestHeader('Content-type', 'application/json');
         http.send(JSON.stringify(parms));
         if(http.readyState === 4 && http.status === 201){
             var response = JSON.parse(xhttp.responseText);
             document.getElementsByName("print").innerHTML = response.no;
             alert(response.no);
         }
            alert("hi");
     }catch (e) {
            alert(e.toString());
     }*/
}

document.getElementById('button1').addEventListener('click', click1,false);
document.getElementById('button2').addEventListener('click', click2,false);
document.getElementById("add_todo").addEventListener('click', addTodoList, false);
document.getElementById("add_toggle").addEventListener('click', addToggleList, false);

var todo_count = 0;
var toggle_count = 0;
var image_count = 0;

function click2() {
    alert(1);
    var obg = document.getElementById("docs_contents_container").innerText;
    alert(obg);
    obg = document.getElementById("docs_contents_container").innerHTML;
    alert(obg);
}

function click1() {

    var text_ = document.getElementById("docs_contents_container").innerText.split('\n');
    var text = "";
    var i;
    for (i = 0; i < text_.length; i++){
        text += "<div id = " + "\"docs_" + i + "\">" + text_[i] + "</div>";
    }
    alert(text);
}

function addTodoList(){
    var addFormDiv = document.getElementById("docs_contents_container");

    var str ='<input type="checkbox" id="todo'+todo_count+'" name="todo'+todo_count+'"style="margin-right: 8px; width: 20px; height: 20px;"/>'
    var addedDiv = document.createElement("div");
    addedDiv.setAttribute("id", "todo_list"+todo_count);
    addedDiv.innerHTML = str;
    addFormDiv.appendChild(addedDiv);
    todo_count++;
}


function addToggleList(){
    var addFormDiv = document.getElementById("docs_contents_container");

    var str ='<div id="toggle_parent' + toggle_count + '"><img id="toggle_button'+toggle_count +'" src="images/toggle_right.png" ></div><div id="toggle_child' + toggle_count +'" class="toggle_child" style="display: none" contenteditable="true" aria-placeholder="하위 내용을 입력하세요."> </div>'
    var addedDiv = document.createElement("div");
    addedDiv.setAttribute("class", "toggle");
    addedDiv.innerHTML = str;
    addFormDiv.appendChild(addedDiv);

    setToggleEventListner('toggle_parent'+ toggle_count);
}


function setToggleEventListner(id) {
    alert(id+"에 toggle 단다!");
    toggle_count++;
    var childId = 'toggle_child' + id.substring(13)
    document.getElementById(id).addEventListener('click', toggle(childId), false);
}

function toggle(id) {
    obj = document.getElementById(id);
    alert("child의 아이디는 " + obj.id)
    img = document.getElementById('toggle_button'+ id.substring(12));

    if(obj.style.display == "none") {
        obj.style.display = "inline";
        img.src = "images/toggle_down.png"
        alert(none)
    }
    else {
        obj.style.display = "none";
        img.src = "images/toggle_right.png"
        alert(inline)
    }
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
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        // Todo: 그림 크기 조절 가능하도록
        reader.onload = function(e) {
            var obj = document.getElementById('image' + count);
            obj.setAttribute('src', e.target.result);
            obj.setAttribute('width', "100px");
            obj.setAttribute('height', "100px");
        }

        reader.readAsDataURL(input.files[0]);
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
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        // Todo: 그림 크기 조절 가능하도록
        reader.onload = function(e) {
            var obj = document.getElementById('image' + count);
            obj.setAttribute('src', e.target.result);
            obj.setAttribute('width', "100px");
            obj.setAttribute('height', "100px");
        }

        reader.readAsDataURL(input.files[0]);
    }
}
