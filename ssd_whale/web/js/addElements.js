document.getElementById('add_file').addEventListener('change', uploadSubmit, false);

var file_count = 0;

function uploadSubmit() {

    var file = document.getElementById('add_file');
    var fileName = file.value;
    if(fileName == ""){
        alert("파일을 선택해주세요.")
        return false;
    }

    // 파일 확장자 체크 -> 얘로 div에 들어갈 이미지 판단
    var fileEtx = fileName.slice(fileName.indexOf(".") + 1).toLowerCase();
    if(fileEtx != "pdf" && fileEtx != "doc" && fileEtx != "docx" && fileEtx !="hwp" && fileEtx != "txt"){
        alert("파일 첨부는 pdf, 워드 파일, 한글 파일, txt 파일만 가능합니다.");
        return false;
    }

    var fileTitle = fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.lastIndexOf("."));

    // 사이즈 체크
    var maxSize = 10*1024*1024 // 10MB
    var fileSize = file.files[0].size;

    var fileSize2 = (fileSize / 1024) /1024;
    var fileSize_mb = fileSize2.toFixed(2);

    if(fileSize > maxSize){
        alert("첨부하신 파일 사이즈는 " + fileSize_mb + "MB 입니다.\n첨부하실 파일 사이즈는 10MB 이내로 등록 가능합니다.");
        return false;
    }

    $.ajax({

        url : "livechat_insert.asp?mode=upload",

        processData : false,

        contentType : false,

        type : "POST",

        error : function(){

            alert('파일 업로드 실패.');

            var selection = window.getSelection();
            var range = selection.getRangeAt(0);

            var container = document.getElementById('docs_contents_container');
            var str = '<div style=" display:flex; flex-direction:row; float: left; cursor: pointer;"><img src="images/attached.png" style="float: left; width: 15px; height: 15px; margin-right: 7px; cursor: pointer"><input id="file_name'+file_count +'" type="text" style="font-size: 12px; background-color:#f2f2f2; border:none; cursor: pointer; width: 310px; margin-right: 3px" readonly></div>'

            var _div = document.createElement("div");
            _div.setAttribute("class", "file_container")
            _div.setAttribute("id", "file" + file_count)
            _div.setAttribute("draggable", "true")
            _div.setAttribute("contenteditable", "false")
            _div.innerHTML = str

            if(range.commonAncestorContainer.nodeName != 'SPAN') {
                range.insertNode(_div);

                var emptyDiv = document.createElement("div");
                emptyDiv.innerHTML = '<br><br><br><br>'
                container.appendChild(emptyDiv)

                document.getElementById('file_name' + file_count).value = fileTitle + " (" + fileSize_mb + "MB)"
                setFileOpenListener("https://ssdfilebucket.s3.ap-northeast-2.amazonaws.com/main.html", 0)

                file_count++;
            }

        },

        success : function(data){

            alert('통신 성공')

        }

    });
}

function setFileOpenListener(url, count){
    var file = document.getElementById('file'+ count);
    file.addEventListener('click', function(){
        window.open(url);
    })
}

