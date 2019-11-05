var naverLogin = new naver.LoginWithNaverId(
    {
        clientId: "2S9HNZPpENDzpBw_xViJ",
        isPopup: false,
        callbackHandle: true
        /* callback 페이지가 분리되었을 경우에 callback 페이지에서는 callback처리를 해줄수 있도록 설정합니다. */
    }
);

/* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
naverLogin.init();

/* (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우 main page로 redirect(또는 Popup close) */
window.addEventListener('load', function () {
    naverLogin.getLoginStatus(function (status) {
        if (status) {
            /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
            var email = naverLogin.user.getEmail();
            var name = naverLogin.user.getName();
            var mail = email.toString();
            var idx = mail.indexOf("@");
            var id = mail.substring(0, idx);


            alert(email + " " + name + " " + id);
            if( email == undefined || email == null || name == undefined || name == null) {
                alert("이메일과 이름은 필수정보입니다. 정보제공을 동의해주세요.");
                /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
                naverLogin.reprompt();
                return;
            }

            window.location.replace("http://localhost:8000/list.html");
        } else {
            console.log("callback 처리에 실패하였습니다.");
        }
    });
});