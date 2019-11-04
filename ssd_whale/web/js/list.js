window.onload = function () {
    /*var xhttp = new XMLHttpRequest();

    try {
        xhttp.open("GET", "http://13.209.193.228:3006/auth/list", false);
        xhttp.send(null);
        if(xhttp.readyState == 4 && xhttp.status == 201){
            alert(response.message);
            var response = JSON.parse(xhttp.responseText);
            document.getElementsByName("print").innerHTML = response.no;
            alert(response.no);
        }
        alert("hi");
    }catch (e) {
        alert(e.toString());
    }*/
}

var doc_num = 0;

document.getElementById('docs_create_button').addEventListener('click',create,false);

function create() {
    location.href='docs.html';
}

