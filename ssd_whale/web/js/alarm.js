function Member(email, isChecked, isAlarmOn){
     var email = email;
     var isChecked = isChecked;
     var isAlarmOn = isAlarmOn;
}

window.onload = getMemberList();

// 멤버 불러오기
function getMemberList() {
    // 통신
    var memberList = [];
    memberList.push({email: "ssionii353@naver.com", isChecked: 0, isAlarmOn: 1, size: 20});
    memberList.push({email: "thisIsLongEmailHiroo@naver.com", isChecked: 0, isAlarmOn: 1, size: 30});

    var container = document.getElementById("member_container");
    var str =""

    for(var i = 0; i <memberList.length; i++){
        str +='<div><div id = "member_container'+i+'"class="email_container border_black"> <img id="member_button'+i +'" name="unselected" src="images/add_docs/add_docs.png" style="margin-left: 11px; margin-right: 10px;width: 13px; height: 13px"> <input id = "member' + i +'"class="unselected_input" type="text" size="'+memberList[i].size +'" value ="'+memberList[i].email+'" readonly/> </div></div>'
    }

    var _div = document.createElement("div");
    _div.setAttribute("class", "flex_div")
    _div.innerHTML = str;
    container.appendChild(_div);
}


function setInputValue(id) {
    var input = document.getElementById(id)
    input.value = email_input.value

    input.setAttribute("size", input.value.length + 2)
}
