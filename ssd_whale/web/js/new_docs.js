var doc_id;

window.onload = function () {

    /*alert(1);
    var xhttp = new XMLHttpRequest();
    try {
        xhttp.open("GET", "http://13.209.193.228:3006/doc/add/sunny",false);
        xhttp.send(null);
        alert(xhttp.readyState);
        alert(xhttp.status);
        if(xhttp.readyState == 4 && xhttp.status == 201){
            var response = JSON.parse(xhttp.responseText);
            alert(response.message);
            alert(response.doc_id);
            doc_id = response.doc_id;
        }
        alert("hi");
    }catch (e) {
        alert(e.toString());
    }*/
}

var div_ = document.getElementById('docs_title')
div_.onkeyup = function () {
    var strValue = document.getElementById('docs_title').value;
    var strLen = strValue.length;
    var totalByte = 0;
    var len = 0;
    var oneChar = "";
    var str2 = "";
    var maxByte = 10;

    for (var i = 0; i < strLen; i++){
        oneChar = strValue.charAt(i);
        if(escape(oneChar).length > 10){
            totalByte += 2;
        } else{
            totalByte++;
        }

        if(totalByte <= maxByte){
            len = i + 1;
        }
    }

    if(totalByte > maxByte){
        alert(maxByte + "자를 초과 입력 할 수 없습니다.");
        str2 = strValue.substr(0, len);
        obj.value = str2;
    }
}

var todo_count = 0;
function toggle(id) {
    obj.document.getElementById(id);

    if(obj.style.display == "none")
        obj.style.display ="inline";
    else
        obj.style.display="none";
}
