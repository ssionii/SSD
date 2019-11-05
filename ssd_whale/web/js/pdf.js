$('#push').click(function () {
    alert(1);

    /*var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('#docs_contents_container')[0];
    specialElementHandlers = {
        '#bypassme': function(element, renderer){
            return true
        }
    }
    margins = {
        top: 50,
        left: 60,
        width: 545
    };
    pdf.fromHTML(
        source // HTML string or DOM elem ref.
        , margins.left // x coord
        , margins.top // y coord
        , {
            'width': margins.width // max width of content on PDF
            , 'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF
            //          this allow the insertion of new lines after html
            pdf.save('html2pdf.pdf');
        }
    )*/

    html2canvas($('#docs_contents_container')[0]).then(function(canvas) {
        var imgData = canvas.toDataURL('image/jpeg'); //캔버스를 이미지로 변환
        var pageWidth = 210;
        var pageHeight = pageWidth * 1.414;
        var imgWidth = pageWidth - 20;
        var imgHeight = $('#docs_contents_container').height() * imgWidth / $('#docs_contents_container').width();
        var doc = new jsPDF('p', 'mm', [pageHeight, pageWidth]); //jspdf객체 생성

        doc.addImage(imgData, 'jpeg', 10, 10, imgWidth, imgHeight); //이미지를 기반으로 pdf생성
        doc.save('document.pdf'); //pdf저장
    });

});

$('#doc_delete').click(function () {
    alert(1);
    /*var http = new XMLHttpRequest();
     try {
         http.open('Delete',"https://sharesdocument.ml/doc" + doc_id, false );

         http.setRequestHeader("user_id", "sunny");
         http.send(null);
         alert("hi");

         alert(http.readyState);
         alert(http.status);
         if(http.readyState === 4 && http.status === 201){
             alert("hi");
             var response = JSON.parse(http.responseText);
             alert(response.message);
         }
         alert("hi");
     }catch (e) {
         alert(e.toString());
     }*/

});
