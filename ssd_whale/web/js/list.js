var list_count;
var list;
var doc_id;

document.getElementById('docs_create_button').addEventListener('click', create, false);
function create() {
    location.href = 'new_docs.html';

}

function structlist(){
    var id;
    var title;;
    var share;
}

var user_id = "";

window.onload = function () {

    chrome.storage.sync.get('user_id', async function (items) {
        // alert(111111111);
        user_id = items.user_id;

        if (!chrome.runtime.error) {

            //alert(items.user_id);
            if (user_id == null) {
                alert("문서를 생성해 슫을 이용해 보세요!");
            }
        }
        await load();
    });

}

async function load() {

    var xhttp = new XMLHttpRequest();
    //alert(1);
    try {
        xhttp.open("GET", "https://sharesdocument.ml/doc/list/" + user_id, false);
        xhttp.send(null);

        //alert(xhttp.readyState);
        //alert(xhttp.status);
        if (xhttp.readyState == 4 && xhttp.status == 201) {
            var response = JSON.parse(xhttp.responseText);
            //alert(response.message);
            user_id = response.user_id;
            list_count = response.list.length;
            list = new Array(list_count);
            alert(user_id);

            /*list_count = 10;
            list = new Array(2);
            list[0] = new structlist();
            list[0].id = "599066f33c9405e4b1030dddf1bbbaaa4075";
            list[0].title = "아자아자";
            list[0].share = 0;

            list[1] = new structlist();
            list[1].id = "225a921db007097b38080a7cd26bffc304e9";
            list[1].title = "안뇽";
            list[1].share = 1;

            list[2] = new structlist();
            list[2].id = "599066f33c9405e4b1030dddf1bbbaaa4075";
            list[2].title = "아자아자";
            list[2].share = 0;

            list[3] = new structlist();
            list[3].id = "225a921db007097b38080a7cd26bffc304e9";
            list[3].title = "안뇽";
            list[3].share = 1;

            list[4] = new structlist();
            list[4].id = "599066f33c9405e4b1030dddf1bbbaaa4075";
            list[4].title = "아자아자";
            list[4].share = 0;

            list[5] = new structlist();
            list[5].id = "225a921db007097b38080a7cd26bffc304e9";
            list[5].title = "안뇽";
            list[5].share = 1;

            list[6] = new structlist();
            list[6].id = "225a921db007097b38080a7cd26bffc304e9";
            list[6].title = "안뇽";
            list[6].share = 1;


            list[7] = new structlist();
            list[7].id = "225a921db007097b38080a7cd26bffc304e9";
            list[7].title = "안뇽";
            list[7].share = 1;

            list[8] = new structlist();
            list[8].id = "225a921db007097b38080a7cd26bffc304e9";
            list[8].title = "안뇽";
            list[8].share = 1;

            list[9] = new structlist();
            list[9].id = "225a921db007097b38080a7cd26bffc304e9";
            list[9].title = "안뇽";
            list[9].share = 1;*/
            for (var i = 0; i < list_count; i++) {
                list[i] = new structlist();
                list[i].id = response.list[i].doc_id;
                list[i].title = response.list[i].doc_title;
                list[i].share = response.list[i].doc_is_share;
                //alert(list[i].id + " " + list[i].title + " " + list[i].share);
            }
        }
        //alert("hi");
    } catch (e) {
        alert(e.toString());
    }



    for (var i = 0; i < list_count; i++) {

        if (list[i].share == 0) {
            var iDiv = document.createElement('div');

            iDiv.setAttribute("class", "docdoc");
            iDiv.id = list[i].id;
            iDiv.innerHTML = list[i].title;

            iDiv.addEventListener('click', function (ev) {
                doc_id = this.id;
                alert(doc_id);

                location.href = 'docs.html';
            })
            document.getElementById("docs_list").appendChild(iDiv);
        } else {

            var str = '<img src= "images/shared_docs/shared_docs.png"/>'
            var str_ = '<div>' + list[i].title + '</div>';

            var ddiv = document.createElement('div');

            ddiv.id = list[i].id;
            ddiv.setAttribute("class", "docdoc");

            ddiv.innerHTML += str_;
            ddiv.innerHTML += str;
            ddiv.addEventListener('click', function (ev) {
                doc_id = this.id;
                alert(doc_id);
                chrome.storage.sync.set({"doc_id": doc_id}, function () {
                    if (chrome.runtime.error) {
                        console.log("Runtime error");
                    }
                });
                location.href = 'docs.html';
            })

            document.getElementById("docs_list").appendChild(ddiv);
        }
    }
    chrome.storage.sync.set({"user_id": user_id}, function () {
        if (chrome.runtime.error) {
            console.log("Runtime error");
        }
    });
}

//function something(clicked_id)
//{
// alert(clicked_id);
/*var xhttp = new XMLHttpRequest();
alert(1);
try {
    xhttp.open("GET", "https://sharesdocument.ml/doc/" + clicked_id, false);
    xhttp.setRequestHeader("user_id", "sunny");
    xhttp.send(null);
    if(xhttp.readyState == 4 && xhttp.status == 201){
        var response = JSON.parse(xhttp.responseText);
        alert(response.message);
        location.reload('docs.html');
    }

    alert("hi");
}catch (e) {
    alert(e.toString());
}*/

//location.href = 'docs.html';
//}
/*
document.getElementById('docdoc2').addEventListener('click', check, false);

function check() {
    alert(1);
    var temp = document.getElementById('docdoc2').id;
    alert(temp);
}

*/
