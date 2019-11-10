var list_count;
var list;
var doc_id;

function structlist(){
    var id;
    var title;;
    var share;
}

var user_id = "";
var isTrue;

window.onload = function () {

    chrome.storage.sync.get('user_id', async function (items) {
        user_id = items.user_id;
        if (!chrome.runtime.error) {
            if (user_id == null) {
                alert("문서를 생성해 슫을 이용해 보세요!");
            }
        }
        await load();
    });

}

document.getElementById('docs_create_button').addEventListener('click', create, false);
function create() {
    //if(isTrue == 1){
        document.location.replace("new_docs.html");
    //}
    //else{
    //    document.location.replace("not_new_docs.html");
    //}
}

document.getElementById('login_button').addEventListener('click', login_, false);
function login_(){
    chrome.windows.create({url:"https://sharesdocument.ml/naver/naverlogin", type:"popup", width:500, height:500});
}

async function load() {

    var xhttp = new XMLHttpRequest();
    try {
        xhttp.open("GET", "https://sharesdocument.ml/doc/list/" + user_id, false);
        xhttp.send(null);

        if (xhttp.readyState == 4 && xhttp.status == 201) {
            var response = JSON.parse(xhttp.responseText);
            //alert(response.message);
            user_id = response.user_id;
            list_count = response.list.length;
            list = new Array(list_count);
            //isTrue = response.isTrue;

            for (var i = 0; i < list_count; i++) {
                list[i] = new structlist();
                list[i].id = response.list[i].doc_id;
                list[i].title = response.list[i].doc_title;
                list[i].share = response.list[i].doc_is_share;
            }
        }
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
                chrome.storage.sync.set({"doc_id": doc_id}, function () {
                    if (chrome.runtime.error) {
                        console.log("Runtime error");
                    }
                });

                //if(isTrue == 1){
                    document.location.replace("docs.html");
                //}
                //else{
                //    document.location.replace("not_docs.html");
                //}
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

                document.location.replace("docs.html");
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
