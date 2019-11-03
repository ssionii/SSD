document.getElementById('button2').addEventListener('click', click2,false);
document.getElementById("add_todo").addEventListener('click', addTodoList, false);

function click2() {
    alert(1);
    var obg = document.getElementById("docs_contents_container").innerText;
    alert(obg);
    obg = document.getElementById("docs_contents_container").innerHTML;
    alert(obg);
}

document.getElementById('button1').addEventListener('click', click1,false);

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

    var str ='<input type="checkbox" id="todo'+todo_count+'" name="todo'+todo_count+'" value=""/>'
    var addedDiv = document.createElement("div");
    addedDiv.setAttribute("id", "todo_list"+todo_count);
    addedDiv.innerHTML = str;
    addFormDiv.appendChild(addedDiv);
    count++;
}

