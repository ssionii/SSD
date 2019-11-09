var share_email_count = 0;
var created = false;
var doc_title;
var doc_member;
var doc_num;
var email_input = document.getElementById("input_email");

window.onload = function(){
    var xhttp = new XMLHttpRequest();
    //alert(1);
    try {
        //xhttp.open("GET", "https://sharesdocument.ml/doc/list/" + user_id, false);
        xhttp.send(null);

        alert(xhttp.readyState);
        alert(xhttp.status);
        if (xhttp.readyState == 4 && xhttp.status == 201) {
            var response = JSON.parse(xhttp.responseText);
            //alert(response.message);
            doc_title = response.title;
            doc_num = response.list.length;
            list = new Array(doc_num);

            for (var i = 0; i < doc_num; i++) {
                list[i] = response.email[i];

                alert(list[i]);
            }
        }
    } catch (e) {
        alert(e.toString());
    }

    document.getElementById('docs_info_title').value = doc_title;

    for (var i = 0; i < doc_num; i++) {
        var str_ = '<div>' + list[i] + '</div>';
        var email_div = document.createElement('div');
        email_div.innerHTML += str_;
        document.getElementById("docs_info_all_members").appendChild(email_div);
    }
}



email_input.onkeyup = function(ev){
    if(ev.keyCode == 50 && !created){
        created = true
        var container = document.getElementById('email_container');
        var str = ' <div id = "email_container'+share_email_count+'"class="email_container border_black"> <img id="email_select_button'+share_email_count +'" name="unselected" src="images/add_docs/add_docs.png" style="margin-left: 11px; margin-right: 10px;width: 13px; height: 13px"> <input id = "email' + share_email_count +'"class="unselected_input" type="text" value ="" readonly/> </div>'
        var _div = document.createElement("div");
        _div.setAttribute("id", 'email_div' + share_email_count)
        _div.innerHTML = str;
        container.appendChild(_div);
        setSelectEventListener(share_email_count)
    }
    setInputValue('email' + share_email_count)

    if(email_input.value.indexOf('@') == -1){
        document.getElementById('email_div' + share_email_count).remove()
        created = false
    }
}

function setSelectEventListener(count){
    var btn = document.getElementById('email_select_button'+count)
    btn.addEventListener('click', function (ev) {
        if(this.name == 'unselected') {
            first_click = true
            this.name = 'selected'
            document.getElementById('email_container'+count).setAttribute("class", "email_container border_none")
            this.src = "images/multiply.png"
            document.getElementById('email'+count).setAttribute("class","selected_input")
            share_email_count++
            created = false
            email_input.value = ""
        }else if(this.name = 'selected'){
            document.getElementById('email_div' + count).remove()
        }
    }, false)

}

function setInputValue(id) {
    var input = document.getElementById(id)
    input.value = email_input.value

    input.setAttribute("size", input.value.length + 2)
}

document.getElementById('share_back').addEventListener('click', function () {
    history.back()
})