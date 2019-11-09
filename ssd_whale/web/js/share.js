var share_email_count = 0;
var created = false
var email_input = document.getElementById("input_email");
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

/*
    email_div0
    email_container0
    email_select_button0
    email0
 */

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