var doc_id;
var doc_content;
var doc_title;
var doc_alarm;

window.onload = function () {

   /* alert(1);
    var xhttp = new XMLHttpRequest();
    try {
        xhttp.open("GET", "https://sharesdocument.ml/doc/b51ff84a14cfd6a3e90b12aa059c0b16f51b",false);
        xhttp.setRequestHeader("user_id", "sunny");
        xhttp.send(null);
        alert(xhttp.readyState);
        alert(xhttp.status);
        if(xhttp.readyState == 4 && xhttp.status == 201){
            var response = JSON.parse(xhttp.responseText);
            alert(response.message);
            alert(response.content);
            //doc_alarm = response.doc_alarm;
            doc_id = response.doc_id;
            doc_title = response.doc_title;
            doc_content = response.content;
            //alert(doc_content);
        }
        alert("hi");
    }catch (e) {
        alert(e.toString());
    }
*/
   doc_alarm = 0;
    doc_id = 'b51ff84a14cfd6a3e90b12aa059c0b16f51b';
    doc_title="하이";
    doc_content = '<div>승민</div>'
    var iDiv = document.createElement('div');
    iDiv.innerHTML = doc_content;
    document.getElementById("docs_contents_container").innerHTML = doc_content;
    document.getElementById("docs_title").value = doc_title;

    if(doc_alarm === 1){
        var temp = document.createElement('div');
        var str1 = '<a href = "#">알림'
        var str2 = '<label class= "switch2" id = "alarm2">' + '<input type = "checkbox">' + '<span class="slider2 round"></span></label></a>';

        temp.innerHTML += (str1 + str2);
        alert(temp.innerHTML);
        document.getElementById("dropdown_content").appendChild(temp);
    }
    else{
        var temp = document.createElement('div');
        var str1 = '<a href = "#">알림'
        var str2 = '<label class= "switch" id = "alarm">' + '<input type = "checkbox">' + '<span class="slider round"></span></label></a>';

        temp.innerHTML += (str1 + str2);
        alert(temp.innerHTML);
        document.getElementById("dropdown_content").appendChild(temp);
    }

    alert(document.getElementById("dropdown_content").innerHTML);
}

var div_ = document.getElementById('docs_title');
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
