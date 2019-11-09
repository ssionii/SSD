window.onload = getMemberList();

// 멤버 불러오기
function getMemberList() {
    // 통신
    var memberList = [];
    memberList.push({email: "ssionii353@naver.com", isChecked: 0, isAlarmOn: 1, size: 20});
    memberList.push({email: "thisIsLongEmailHiroo@naver.com", isChecked: 0, isAlarmOn: 1, size: 30});

    for(var i = 0; i <memberList.length; i++){
        makeMemberBox(memberList[i].email, i)
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

/*
    member_container0
    member0
    member_select_button0
*/



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

document.getElementById('alarm_back').addEventListener('click', function () {
    history.back()
})