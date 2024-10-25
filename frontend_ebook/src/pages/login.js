<<<<<<< HEAD
import "../css/login.css";

import { InputItem } from "../components/form/input";
import Button from "../components/form/button";
import Check from "../components/form/check";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
	let [id, setId] = useState('');
	let [pw, setPw] = useState('');

	return(
		<div className="login-form">
			<h2 className="txt-center page-title">Book<br/>Garden</h2>
			<form>
				<InputItem
					id="me_id"
					name="me_id"
					type="text"
					label="아이디"
					change={setId}/>
				<InputItem
					id="me_pw"
					name="me_pw"
					type="password"
					label="비번"
					change={setPw}/>

				<Check name={"autoLogin"} id="autoLogin" label={"자동 로그인"} style={{marginTop: '2em'}}/>
				<Button type={"submit"} text={"로그인"} cls={"btn btn-point full big"}></Button>

				<div className="login-menu">
					<Link to="/findid">비밀번호 찾기</Link>
					<span>|</span>
					<Link to="/findpw">아이디 찾기</Link>
					<span>|</span>
					<Link to="/join">회원가입</Link>
				</div>

				<div className="sns-login">
					{/* sns 로그인 구현 후 Link 태그로 변경하는 게 좋을듯함 */}
					<Button type={"button"} text={"카카오 로그인"} cls={"btn btn-kakao full"}></Button>
					<Button type={"button"} text={"네이버 로그인"} cls={"btn btn-naver full"}></Button>
					<Button type={"button"} text={"구글 로그인"} cls={"btn btn-google full"}></Button>
				</div>
			</form>
		</div>
	);
=======
import React, { useEffect, useContext, useState } from "react";
import { InputItem } from "../components/form/input";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import Button from "../components/form/button";
import { LoginContext } from "../context/LoginContext";  // LoginContext import
import "../css/login.css";
import Check from "../components/form/check";

const Login = () => {
  const { setIsLoggedIn, setUser } = useContext(LoginContext); // 로그인 상태 업데이트 함수 가져오기
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [googleInitialized, setGoogleInitialized] = useState(false); // 구글 초기화 상태
  
  const [id, setId] = useState(""); // 일반 로그인 ID 상태
  const [password, setPassword] = useState(""); // 일반 로그인 비밀번호 상태
  const [autoLogin, setAutoLogin] = useState(false); // 자동 로그인 상태

    // 페이지 로드 시 localStorage 또는 sessionStorage에서 토큰 확인
    useEffect(() => {
      const token = localStorage.getItem("loginToken") || sessionStorage.getItem("loginToken");
      if (token) {
        setIsLoggedIn(true);
        console.log("로그인된 상태입니다. 메인 페이지로 이동합니다."); // 디버깅용 로그
        navigate("/"); // 이미 로그인된 상태라면 메인 페이지로 이동
      }
    }, []); // setIsLoggedIn, navigate 의존성 배열 제거 (초기 로드 시만 실행)

  useEffect(() => {
    const kakaoScript = document.createElement("script");
    kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
    kakaoScript.async = true;
    document.body.appendChild(kakaoScript);

    const googleScript = document.createElement("script");
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.async = true;
    document.body.appendChild(googleScript);

		kakaoScript.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
				// 카카오 JavaScript 키
        window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY); 
      }
    };

    googleScript.onload = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,  
          callback: handleGoogleLoginSuccess,
          ux_mode: "popup", // 팝업 모드 설정
        });
        setGoogleInitialized(true); // 구글 초기화 완료
      } else {
        console.error("Google API failed to load");
        alert("Google API를 로드하는 데 실패했습니다. 다시 시도해주세요.");
      }
    };

    const handleGoogleLoginSuccess = (response) => {
      const idToken = response.credential; // 구글에서 받은 ID 토큰
      console.log("Google ID Token:", idToken);
  
      // ID 토큰을 백엔드로 전송
      fetch("/ebook/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }), // ID 토큰을 백엔드로 전송
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // 로그인 성공 시 백엔드에서 받은 JWT 토큰을 localStorage에 저장
            localStorage.setItem("googleLoginToken", data.token); // JWT 토큰 저장
            
            // LoginContext에 사용자 정보 저장
            setUser(data.user);
            
            setIsLoggedIn(true); // 로그인 상태 설정
            navigate("/"); // 메인 페이지로 이동
          } else {
            // 로그인 실패 처리
            alert(data.message || "로그인 실패");
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("백엔드 로그인 처리 오류", error);
          alert("로그인 처리 중 오류가 발생했습니다.");
        });
    };

    return () => {
      document.body.removeChild(kakaoScript);
      document.body.removeChild(googleScript);
    };

  }, [setIsLoggedIn, navigate]);  // setIsLoggedIn과 navigate를 의존성 배열에 추가

  // 일반 로그인 처리 함수
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도: ID:", id, "비밀번호:", password, "자동 로그인 여부:", autoLogin); // 디버깅용 로그

    fetch("/ebook/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        me_id: id,
        me_pw: password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("로그인 성공, 토큰:", data.token);  // 디버깅용 로그

        // 로그인 성공 시, 사용자 정보를 LoginContext에 저장
        setUser(data.user);

        if (autoLogin) {
          // 자동 로그인이 체크된 경우 localStorage에 토큰 저장
          console.log("자동 로그인 선택됨. localStorage에 토큰 저장."); // 디버깅용 로그
          localStorage.setItem("loginToken", data.token);

        } else {
          // 자동 로그인이 체크되지 않은 경우 sessionStorage에 토큰 저장
          console.log("자동 로그인 선택되지 않음. sessionStorage에 토큰 저장."); // 디버깅용 로그
          sessionStorage.setItem("loginToken", data.token);
        }
        setIsLoggedIn(true); // 로그인 상태 업데이트
        navigate("/"); // 메인 페이지로 이동

      } else {
        // 로그인 실패 시
        console.error("로그인 실패:", data.message || "로그인 실패");  // 디버깅용 로그
        alert(data.message || "로그인 실패"); // 백엔드에서 반환된 메시지 출력
        setIsLoggedIn(false); // 로그인 실패 상태 설정
      }
    })
    .catch((error) => {
      console.error("로그인 처리 오류", error);
      alert("로그인 처리 중 오류가 발생했습니다.");
    });
  };

  // 자동 로그인 체크박스 상태 변경 핸들러
  const handleAutoLoginChange = (e) => {
    setAutoLogin(e.target.checked); // 체크박스 상태 업데이트
    console.log("자동 로그인 체크 상태:", e.target.checked);  // 디버깅용 로그
  };

  

// 카카오 로그인 처리 함수
const handleKakaoLogin = () => {
  window.Kakao.Auth.login({
    scope: 'account_email, name, gender, birthday, birthyear, phone_number, shipping_address',
    success: (authObj) => {
      fetch("/ebook/kakao/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authObj.access_token}`,
        },
        body: JSON.stringify({ token: authObj.access_token }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("loginToken", data.jwtToken); // **jwtToken으로 변경**

            if (data.user) {
              setUser(data.user);  // user 객체가 제대로 전달되었는지 확인**
              console.log("User 객체:", data.user); // 디버깅용 로그
              console.log("Member ID:", data.user.me_id); // ID 확인
          } else {
              console.error("User 객체가 null입니다.");
          }

            setIsLoggedIn(true); // **로그인 상태 업데이트**
            navigate("/"); // 메인 페이지로 이동
          } else if (data.registerRequired) {
            handleKakaoRegister(authObj);
          } else {
            setIsLoggedIn(false);
            alert(data.message || "사용자가 존재하지 않습니다.");
          }
        })
        .catch((error) => {
          console.error("로그인 처리 오류:", error);
        });
    },
    fail: (err) => {
      console.error("카카오 로그인 실패", err);
    },
  });
};

// 카카오 회원가입 처리 함수
const handleKakaoRegister = (authObj) => {
  window.Kakao.API.request({
    url: '/v2/user/me',
    success: (res) => {
      fetch("/ebook/kakao/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authObj.access_token}`,
        },
        body: JSON.stringify({
          token: authObj.access_token,
          id: res.id,
          email: res.kakao_account.email,
          name: res.properties.nickname,
        }),
      })
        .then((response) => response.json())
        .then((registerData) => {
          if (registerData.success) {
            localStorage.setItem("loginToken", registerData.jwtToken);
            setUser(registerData.user);
            setIsLoggedIn(true);  // 회원가입 후 로그인 상태 설정
            navigate("/"); // 회원가입 후 메인 페이지로 이동
          } else {
            alert(registerData.message || "회원가입 처리 중 오류가 발생했습니다.");
          }
        })
        .catch((error) => {
          console.error("회원가입 처리 오류", error);
        });
    },
    fail: (err) => {
      console.error("사용자 정보 요청 실패", err);
    },
  });
};

// useEffect를 통해 로그인 상태 유지
useEffect(() => {
  const token = localStorage.getItem("loginToken");
  if (token) {
    setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
  } else {
    setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태
  }
}, []);

      // 네이버 로그인 처리 (이미지를 클릭하면 네이버 로그인 실행)
  const handleNaverLogin = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID; // 네이버 클라이언트 ID
    const redirectUri = "http://localhost:3000/auth/naver/callback"; // 네이버 로그인 콜백 URL
    const state = Math.random().toString(36).substring(2, 15); // CSRF 방지를 위한 상태값

    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

    window.location.href = naverLoginUrl;  // 네이버 로그인 URL로 리디렉션
  };

  const handleGoogleLoginClick = () => {
    window.google.accounts.id.disableAutoSelect(); // 자동 로그인을 비활성화
    if (googleInitialized) {
      window.google.accounts.id.prompt((notification) => {
        console.log("Prompt 호출 결과: ", notification);
        if (notification.isNotDisplayed) {
          console.error("팝업이 표시되지 않았습니다: ", notification.notDisplayedReason);
        }
        if (notification.isSkipped) {
          console.error("팝업이 스킵되었습니다: ", notification.skipReason);
        }
      });
    } else {
      console.error("Google API가 아직 로드되지 않았습니다.");
      alert("Google API가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="login-form">
      <h2 className="txt-center page-title">Book<br />Garden</h2>
      <form onSubmit={handleLoginSubmit}>

      <div className="input-item">
        <input
          id="me_id"
          name="me_id"
          type="text"
          placeholder="아이디를 입력하세요"
          onChange={(e) => setId(e.target.value)}
          value={id}/>
        <label htmlFor="me_id">아이디</label>
      </div>

      <div className="input-item">
        <input
          id="me_pw"
          name="me_pw"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
          value={password}/>
        <label htmlFor="me_pw">비밀번호</label>
      </div>

        <Check
          name={"autoLogin"} 
          id="autoLogin" 
          label={"자동 로그인"} 
          style={{marginTop: '2em'}}
          checked={autoLogin} 
          change={handleAutoLoginChange} 
        />

        <Button type={"submit"} text={"로그인"} cls={"btn btn-point full big"} />

        <div className="sns-login">
          <Button type={"button"} text={"카카오 로그인"} cls={"btn btn-kakao full"} click={handleKakaoLogin}/>
					<Button type={"button"} text={"네이버 로그인"} cls={"btn btn-naver full"} click={handleNaverLogin}/>
					<Button 
            type={"button"} 
            text={"구글 로그인"} 
            cls={"btn btn-google full"} 
            click={handleGoogleLoginClick}
        />
        </div>
      </form>
    </div>
  );
>>>>>>> KCL
}

export default Login;