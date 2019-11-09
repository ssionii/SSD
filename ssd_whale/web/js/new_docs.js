var user_id;
var doc_id;
window.onload = function () {


    chrome.storage.sync.get('user_id', async function (items) {
        //lert(111111111);
        user_id = items.user_id;
        //alert('!!!!!!!!!!!!!!!!!!');
        if (!chrome.runtime.error) {
            alert(items.user_id);
        }
        alert(2);
        await load2();
        alert(3);
    });
}


async function load2() {
    //alert(11111111111111);
    var xhttp = new XMLHttpRequest();
    try {
        xhttp.open("GET", "https://sharesdocument.ml/doc/add/" + user_id,false);
        xhttp.send(null);
        //alert(xhttp.readyState);
        //alert(xhttp.status);
        if(xhttp.readyState == 4 && xhttp.status == 201){
            var response = JSON.parse(xhttp.responseText);
            //alert(response.message);
            alert(response.doc_id);
            doc_id = response.doc_id;
        }
        //alert("hi");
    }catch (e) {
        alert(e.toString());
    }

    chrome.storage.sync.set({"doc_id": doc_id}, function () {
        //alert(1);
        if (chrome.runtime.error) {
            console.log("Runtime error");
        }
    });

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
