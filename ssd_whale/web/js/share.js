var share_email_count = 0;
var list_ = [];
var list_count = 0;
var created = false;
var doc_title;
var user_num;
var doc_id;
var list;
var user_id;
var email_input = document.getElementById("input_email");

document.getElementById('send_email').addEventListener('click', send_email, false);
document.getElementById('back_email').addEventListener('click', back_, false);

window.onload = function(){

    chrome.storage.sync.get('doc_id', async function (items) {
        doc_id = items.doc_id;
        if (!chrome.runtime.error) {
        }
        await f1();
    });

}

async function f1(){
    chrome.storage.sync.get('user_id', async function (items) {
        user_id = items.user_id;
        if (!chrome.runtime.error) {
        }
    });
    await f2();
}

async function f2(){

    var xhttp = new XMLHttpRequest();
    try {
        xhttp.open("GET", "https://sharesdocument.ml/share/" + doc_id, false);
        xhttp.send(null);

        if (xhttp.readyState == 4 && xhttp.status == 201) {
            var response = JSON.parse(xhttp.responseText);
            doc_title = response.doc_title;
            user_num = response.user_list.length;

            list = new Array(user_num);

            for (var i = 0; i < user_num; i++) {
                list[i] = response.user_list[i].user_email;
            }
        }
    } catch (e) {
        alert(e.toString());
    }
    await f3();
}

async function f3() {

    document.getElementById('docs_info_title').innerText = doc_title;

    for (var i = 1; i < user_num; i++) {
        var str_ = '<div>' + list[i] + '</div>';
        var email_div = document.createElement('div');
        email_div.innerHTML += str_;
        document.getElementById("docs_info_all_members").appendChild(email_div);
    }

}

function back_(){
    location.replace('docs.html');
}

email_input.onkeyup = function(ev){
    if(ev.keyCode == 50 && !created){
        created = true;
        var container = document.getElementById('email_container');
        var str = ' <div id = "email_container'+share_email_count+'"class="email_container border_black"> <img id="email_select_button'+share_email_count +'" name="unselected" src="images/add_docs/add_docs.png" style="margin-left: 11px; margin-right: 10px;width: 13px; height: 13px"> <input id = "email' + share_email_count +'"class="unselected_input" type="text" value ="" readonly/> </div>'
        var _div = document.createElement("div");
        _div.setAttribute("id", 'email_div' + share_email_count)
        _div.innerHTML = str;
        container.appendChild(_div);
        setSelectEventListener(share_email_count)
    }
    setInputValue('email' + share_email_count);

    if(email_input.value.indexOf('@') == -1){
        document.getElementById('email_div' + share_email_count).remove()
        created = false
    }
}

async function send_email(){
    var http = new XMLHttpRequest();
    try {
        http.open('Post',"https://sharesdocument.ml/share", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        var json = JSON.stringify(list_);
        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&invite_list=" + json);
        if(http.readyState === 4 && http.status === 201){
            var response = JSON.parse(http.responseText);
        }
        alert("저장되었습니다.");
    }catch (e) {
        alert(e.toString());
    }

    document.location.replace("share.html");
}

function setSelectEventListener(count){
    var btn = document.getElementById('email_select_button'+count)
    btn.addEventListener('click', function (ev) {
        if(this.name == 'unselected') {
            //list_[list_count++] = document.getElementById('email'+count).value;
            list_.push(document.getElementById('email' + count).value);
            first_click = true;
            this.name = 'selected';
            document.getElementById('email_container'+count).setAttribute("class", "email_container border_none");
            this.src = "images/multiply.png";
            document.getElementById('email'+count).setAttribute("class","selected_input");
            share_email_count++;
            created = false;
            email_input.value = ""
        }else if(this.name = 'selected'){
            var temp = [];
            for (var j = 0; j < list_.length; j++){
                if(list_[j] !== (document.getElementById('email' + count).value)){
                    temp.push(list_[j]);
                }
            }
            list_ = temp;
        }
    }, false)

}

function setInputValue(id) {
    var input = document.getElementById(id)
    input.value = email_input.value

    input.setAttribute("size", input.value.length + 2)
}
