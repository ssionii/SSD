$('#push').click(function () {
    alert(1);
    html2canvas($('#docs_contents_container')[0]).then(function(canvas) {
        var doc = new jsPDF('p', 'mm', 'a4'); //jspdf객체 생성
        var imgData = canvas.toDataURL('image/png'); //캔버스를 이미지로 변환
        doc.addImage(imgData, 'PNG', 0, 0); //이미지를 기반으로 pdf생성
        doc.save('sample-file.pdf'); //pdf저장
    });
});


$('#doc_delete').click(function () {
    alert(1);
    /*var http = new XMLHttpRequest();
     try {
         http.open('Delete',"http://13.209.193.228:3006/doc" + doc_id, false );

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
