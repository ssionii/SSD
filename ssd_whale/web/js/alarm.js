window.onload = getMemberList();
document.getElementById("alarm_back").addEventListener('click', back, false);
document.getElementById("alarm_send").addEventListener('click', send, false);

function back() {
    document.location.replace("docs.html");
}

var doc_title;
function structList(){
    var user_email;
    var user_no;
    var isChecked;
    var size;
}
var memberList = [];
var doc_id;
var email_count;
function getMemberList() {
    chrome.storage.sync.get('doc_id', async function (items) {
        doc_id = items.doc_id;
        if (!chrome.runtime.error) {
        }
        await tel();
    });
}

async function tel() {
    var xhttp = new XMLHttpRequest();
    try {

        xhttp.open("GET", "https://sharesdocument.ml/share/" + doc_id, false);
        xhttp.send(null);

        if (xhttp.readyState == 4 && xhttp.status == 201) {
            var response = JSON.parse(xhttp.responseText);
            doc_title = response.doc_title;

            email_count = response.user_list.length;
            for (var i = 0; i < email_count - 1; i++) {
                memberList[i] = new structList();
                var temp_email = response.user_list[i + 1].user_email;
                var temp_no = response.user_list[i + 1].user_no;
                memberList[i].user_email = temp_email;
                memberList[i].user_no = temp_no;
                memberList[i].isChecked = 0;
                memberList[i].size = temp_email.length;
            }
        }
    } catch (e) {
        alert(e.toString());
    }
    await showshow();
}

async function showshow() {

    document.getElementById('docs_info_title').innerText = doc_title;
    for(var i = 0; i <memberList.length; i++){
        makeMemberBox(memberList[i].user_email, i)
    }
}

function makeMemberBox(email, count){
    var container = document.getElementById("member_container");
    var str = '<div id = "member_container'+count+'"class="email_container border_black"><input id = "member' + count +'"class="member unselected_input" type="text" size="'+email.length +'" value ="'+email+'" readonly/> <img id="member_select_button'+ count +'" name="unselected" src="images/add-member@3x.png" style="margin-right: 9px; width: 15px; height: 15px"></div>'

    var _div = document.createElement("div");
    _div.innerHTML = str;
    container.appendChild(_div);
    setSelectEventListener(count)
}

function setSelectEventListener(count){
    var btn = document.getElementById('member_select_button'+count)
    btn.addEventListener('click', function (ev) {
        if(this.name == 'unselected') {
            this.name = 'selected'
            document.getElementById('member_container'+count).setAttribute("class", "email_container border_none")
            this.src = "images/multiply@3x.png"
            document.getElementById('member'+count).setAttribute("class","member selected_input")
        }else if(this.name = 'selected'){
            this.name = 'unselected'
            document.getElementById('member_container'+count).setAttribute("class", "email_container border_black")
            this.src = "images/add-member@3x.png"
            document.getElementById('member'+count).setAttribute("class","member unselected_input")
        }
    }, false)

}
var result = [];
async function send() {
    for (var k = 0; k < email_count - 1; k++){
        var ttemp = document.getElementById('member_select_button' + k).name;
        if(ttemp == 'selected'){
            result.push(memberList[k].user_no);
        }
    }
    await send2();
}

async function send2() {
    var http = new XMLHttpRequest();
    try {
        http.open('Post',"https://sharesdocument.ml/push", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        var json_ = JSON.stringify(result);
        http.send("&doc_id=" + doc_id + "&user_list=" + json_);
        if(http.readyState === 4 && http.status === 201){
            var response = JSON.parse(http.responseText);
        }
        alert("저장되었습니다.");
    }catch (e) {
        alert(e.toString());
    }

}
