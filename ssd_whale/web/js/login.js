var naverLogin = new naver.LoginWithNaverId(
    {
        clientId: "2S9HNZPpENDzpBw_xViJ",
        callbackUrl: "http://localhost:8000/callback.html",
        callbackHandler : true,
        isPopup: false, /* 팝업을 통한 연동처리 여부 */
        loginButton: {color: "white", type: 3, height: 60} /* 로그인 버튼의 타입을 지정 */
    }
);

/* 설정정보를 초기화하고 연동을 준비 */
naverLogin.init();