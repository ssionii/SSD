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

}

window.onload = function() {
    document.getElementById("docs_contents_container").focus();

    $(function (){
        $("#ff").on("change", function () {

            insertNode('<font style="font-family: ' + $(this).val() + '">')
        });

        $("#fs").on("change", function (){
            insertNode('<font style="font-size: '+ $(this).val() + 'px">')
        });

        /*
        $("#fc").on("change", function(){
            insertNode('<font style = "color: ' + $(this).val() + '">')

        });*/


    });

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


function insertNode(str){
    var _range = window.getSelection().getRangeAt(0);
    var _content = _range.cloneContents();
    var _node = document.createElement('span');
    _node.appendChild(_content);
    alert(_node.innerHTML);
    _node.innerHTML = str + _node.innerHTML + '</font>'
    alert(_node.innerHTML.toString())
    if (_node) _node = _node.childNodes[0];
    _range.deleteContents();
    _range.insertNode(_node);
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
/*
function setFontColor(){
    var textColorBox = true;
    var colorContainer = document.getElementById("color_container");
    if(textColorBox){
        colorContainer.style.visibility="visible";
        //var RGB="000000#FFFFFF#FFCCFF#FF99FF#FF66FF#FF33FF#FF00FF#FFFFCC#FFCCCC#FF99CC#FF66CC#FF33CC#FF00CC#FFFF99#FFCC99#FF9999#FF6699#FF3399#FF0099#FFFF66#FFCC66#FF9966#FF6666#FF3366#FF0066#FFFF33#FFCC33#FF9933#FF6633#FF3333#FF0033#FFFF00#FFCC00#FF9900#FF6600#FF3300#FF0000#CCFFFF#CCCCFF#CC99FF#CC66FF#CC33F#CC00FF#CCFFCC#CCCCCC#CC99CC#CC66CC#CC33CC#CC00CC#CCFF00#CCCC99#CC9999#CC6699#CC3399#CC0099#CCFF66#CCCC66#CC9966#CC6666#CC3366#CC0066#CCFF33#CCCC33#CC9933#CC6633#CC3333#CC0033#CCFF00#CCCC00#CC9900#CC6600#CC3300#CC0000#99FFFF#99CCFF#9999FF#9966FF#9933FF#9900FF#99FFCC#99CCCC#9999CC#9966CC#9933CC#9900CC#99FF99#99CC99#999999#996699#993399#990099#99FF66#99CC66#999966#996666#993366#990066#99FF33#99CC33#999933#996633#993333#990033#99FF00#99CC00#999900#996600#993300#990000#66FFFF#66CCFF#6699FF#6666FF#6633FF#6600FF#66FFCC#66CCCC#6699CC#6666CC#6633CC#6600CC#66FF99#66CC99#669999#666699#663399#660099#66FF66#66CC66#669966#666666#663366#660066#66FF33#66CC33#669933#666633#663333#660033#66FF00#66CC00#669900#666600#663300#660000#33FFFF#33CCFF#3399FF#3366FF#3333FF#3300FF#33FFCC#33CCCC#3399CC#3366CC#3333CC#3300CC#33FF99#33CC99#339999#336699#333399#330099#33FF66#33CC66#339966#336666#333366#330066#33FF33#33CC33#339933#336633#333333#330033#33FF00#33CC00#339900#336600#333300#330000#00FFFF#00CCFF#0099FF#0066FF#0033FF#0000FF#00FFCC#00CCCC#0099CC#0066CC#0033CC#0000CC#00FF99#00CC99#009999#006699#003399#000099#00FF66#00CC66#009966#006666#003366#000066#00FF33#00CC33#009933#006633#003333#000033#00FF00#00CC00#009900#006600#003300#000000";
        var RGB = "#A06641#FF0000#FF9473#FFF56E#FF32B1#FFAAAF#C6FF70#3DFF92#93DAFF#96A5FF#"
        var RGBColorArray=RGB.split("#");
        var tag="<table border=1 bordercolor= #ffffff cellspacing=0 cellpadding=0 bgcolor =#ffffff><tr>";
        for(var i=1;i<RGBColorArray.length;){
            tag=tag+"<tr>";
            for(var j=0;j<5;j++){
                tag=tag+"<td bgcolor=#"+RGBColorArray[i]+" width=15 height=15></td>";
                i++;
                if(RGBColorArray.length==i) break;
            }
            tag=tag+"</tr>";
        }
        tag=tag+"</table>";

        colorContainer.innerHTML=tag;
        textColorBox=false;
    }
    else{
        colorContainer.style.visibility="hidden";
        colorContainer.innerHTML="";
        textColorBox=true;
    }

}*/


function setFontColor(){
    var textColorBox = true;
    var colorContainer = document.getElementById("color_container");
    if(textColorBox){
        colorContainer.style.visibility="visible";
        //var RGB="000000#FFFFFF#FFCCFF#FF99FF#FF66FF#FF33FF#FF00FF#FFFFCC#FFCCCC#FF99CC#FF66CC#FF33CC#FF00CC#FFFF99#FFCC99#FF9999#FF6699#FF3399#FF0099#FFFF66#FFCC66#FF9966#FF6666#FF3366#FF0066#FFFF33#FFCC33#FF9933#FF6633#FF3333#FF0033#FFFF00#FFCC00#FF9900#FF6600#FF3300#FF0000#CCFFFF#CCCCFF#CC99FF#CC66FF#CC33F#CC00FF#CCFFCC#CCCCCC#CC99CC#CC66CC#CC33CC#CC00CC#CCFF00#CCCC99#CC9999#CC6699#CC3399#CC0099#CCFF66#CCCC66#CC9966#CC6666#CC3366#CC0066#CCFF33#CCCC33#CC9933#CC6633#CC3333#CC0033#CCFF00#CCCC00#CC9900#CC6600#CC3300#CC0000#99FFFF#99CCFF#9999FF#9966FF#9933FF#9900FF#99FFCC#99CCCC#9999CC#9966CC#9933CC#9900CC#99FF99#99CC99#999999#996699#993399#990099#99FF66#99CC66#999966#996666#993366#990066#99FF33#99CC33#999933#996633#993333#990033#99FF00#99CC00#999900#996600#993300#990000#66FFFF#66CCFF#6699FF#6666FF#6633FF#6600FF#66FFCC#66CCCC#6699CC#6666CC#6633CC#6600CC#66FF99#66CC99#669999#666699#663399#660099#66FF66#66CC66#669966#666666#663366#660066#66FF33#66CC33#669933#666633#663333#660033#66FF00#66CC00#669900#666600#663300#660000#33FFFF#33CCFF#3399FF#3366FF#3333FF#3300FF#33FFCC#33CCCC#3399CC#3366CC#3333CC#3300CC#33FF99#33CC99#339999#336699#333399#330099#33FF66#33CC66#339966#336666#333366#330066#33FF33#33CC33#339933#336633#333333#330033#33FF00#33CC00#339900#336600#333300#330000#00FFFF#00CCFF#0099FF#0066FF#0033FF#0000FF#00FFCC#00CCCC#0099CC#0066CC#0033CC#0000CC#00FF99#00CC99#009999#006699#003399#000099#00FF66#00CC66#009966#006666#003366#000066#00FF33#00CC33#009933#006633#003333#000033#00FF00#00CC00#009900#006600#003300#000000";
        var RGB = "#A06641#FF0000#FF9473#FFF56E#FF32B1#FFAAAF#C6FF70#3DFF92#93DAFF#96A5FF#"
        var RGBColorArray=RGB.split("#");
        var tag="<select name='fc' id='fc' style='background-color: white; border: none'>";
        for(var i=1;i<RGBColorArray.length;){
            for(var j=0;j<5;j++){
                tag=tag+ '<option value="#' +RGBColorArray[i]+ '">' + RGBColorArray[i] + '</option>';
                i++;
                if(RGBColorArray.length==i) break;
            }
        }
        tag=tag+"</select>";

        colorContainer.innerHTML=tag;
        textColorBox=false;
    }
    else{
        colorContainer.style.visibility="hidden";
        colorContainer.innerHTML="";
        textColorBox=true;
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
