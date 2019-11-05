document.getElementById('docs_button_save').addEventListener('click',save,false);
document.getElementById("add_todolist").addEventListener('click', addTodoList, false);
document.getElementById("add_togglelist").addEventListener('click', addToggleList, false);

var todo_count = 0;
var toggle_count = 0;
var image_count = 0;

function save() {
    if(document.getElementById("docs_title").value === "제목을 입력하세요.") {
        alert("제목을 입력하세요.");
    }else{
        //var did = "599066f33c9405e4b1030dddf1bbbaaa4075";
        var did = doc_id;
        alert(did);
        var title = document.getElementById("docs_title").value;
        alert(title);
        var body =  document.getElementById("docs_contents_container").innerHTML;
        alert(body);
        var user = "sunny";
        alert(user);

        /* var http = new XMLHttpRequest();
         try {
             http.open('Post',"http://13.209.193.228:3006/doc", false );
             http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
             http.send("user_id=" + user + "&doc_id=" + did + "&doc_title=" + title + "&doc_body=" + body);
             alert("hi");
             alert(http.readyState);
             alert(http.status);
             if(http.readyState === 4 && http.status === 201){
                 alert("hi");
                  var response = JSON.parse(http.responseText);
                  alert(response.message);
                  alert(response.doc_id);
             }
             alert("hi");
         }catch (e) {
             alert(e.toString());
         }*/
    }
}


function addTodoList(){
    var addFormDiv = document.getElementById("docs_contents_container");

    var str ='<input type="checkbox" id="todo'+todo_count+'" name="todo'+todo_count+'"style="margin-right: 8px; width: 20px; height: 20px;"/>'
    var addedDiv = document.createElement("div");
    addedDiv.innerHTML = str;
    addFormDiv.appendChild(addedDiv);
    todo_count++;
}
function addToggleList(){
    var addFormDiv = document.getElementById("docs_contents_container");

    var str ='<div style="display: flex; flex-direction: row"><div style="display: inline; width: 13px; height: 13px; margin-right: 5px;"><img id="toggle_button'+toggle_count +'" class="toggle_button" src="images/toggle_right.png"></div><div id="toggle_parent_text' + toggle_count +'" contenteditable="true" placeholder ="상위 항목을 입력하세요." style="display: inline; color: rgb(55, 53, 47);-webkit-text-fill-color: rgba(55, 53, 47, 0.4) ;"></div></div><div id = toggle_child' + toggle_count + ' style="display: none; margin-left: 18px;"><div id="toggle_child_text' + toggle_count +'" contenteditable="true" placeholder ="하위 항목을 입력하세요." style=" height: auto; color: rgb(55, 53, 47);-webkit-text-fill-color: rgba(55, 53, 47, 0.4) ;" ></div></div>'
    var addedDiv = document.createElement("div");
    addedDiv.innerHTML = str;
    addFormDiv.appendChild(addedDiv);

    var emptyDiv = document.createElement("div");
    emptyDiv.innerHTML = '<br>'
    addFormDiv.appendChild(emptyDiv)

    setToggleImgEventListener('toggle_button' + (toggle_count));
    setToggleTextColorEventListener(toggle_count)
}

// Todo: toggle img위에 커서 올려 놨을 때  1.background 생기도록, 2. cursor가 pointer이도록
function setToggleImgEventListener(id) {
    var childId = 'toggle_child' + toggle_count;

    toggle_count++;
    document.getElementById(id).addEventListener('click', function(ev){
        var obj = document.getElementById(childId)
        var img = document.getElementById(id);

        if(obj.style.display == "none"){
            obj.style.display = "block";
            img.src = "images/toggle_down.png"
        }else{
            obj.style.display ="none";
            img.src = "images/toggle_right.png"
        }
    });
}

function setToggleTextColorEventListener(count){
    var obj = document.getElementById("toggle_parent_text" + (count-1));
    obj.onkeypress(
        function () {
            alert(1)
            this.color = rgb(0, 0, 0);
        }
    )


    var childId = document.getElementById('toggle_child_text' + count);

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

        var size = prompt("사진의 크기를 입력해주세요");

        reader.onload = function(e) {
            var obj = document.getElementById('image' + count);
            obj.setAttribute('src', e.target.result);
            obj.setAttribute('width', size+'px');
            obj.setAttribute('height', size+'px');
        }
        reader.readAsDataURL(input.files[0]);
    }
}


/*************************************************************************************************/

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