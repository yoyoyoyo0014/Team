import React, { useEffect, useContext, useState } from "react";
import { InputItem } from "../components/form/input";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import Button from "../components/form/button";
import { LoginContext } from "../context/LoginContext";  // LoginContext import
import "../css/login.css";
import Check from "../components/form/check";

const Login = () => {
  const { setIsLoggedIn } = useContext(LoginContext); // 로그인 상태 업데이트 함수 가져오기
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
        });
        setGoogleInitialized(true); // 구글 초기화 완료
      } else {
        console.error("Google API failed to load");
      }
    };

    const handleGoogleLoginSuccess = (response) => {
      const idToken = response.credential;  // 구글에서 받은 ID 토큰
      console.log("Google ID Token:", idToken);
      
      // ID 토큰을 백엔드로 전송
      fetch("/ebook/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),  // ID 토큰을 백엔드로 전송
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // 로그인 성공 시 JWT 토큰을 localStorage에 저장
          localStorage.setItem("googleLoginToken", data.token); // 백엔드에서 받은 JWT 토큰 저장
          setIsLoggedIn(true);
          navigate("/");  // 메인 페이지로 이동
        } else {
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
        // 로그인 성공 시
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

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: 'account_email, name, gender, birthday, birthyear, phone_number, shipping_address',
      success: (authObj) => {
        console.log("로그인 성공", authObj);

         // 카카오 로그인 성공 후 백엔드로 토큰 전송
         fetch("/ebook/kakao/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json" ,
            "Authorization": `Bearer ${authObj.access_token}`
          },
          body: JSON.stringify({ token: authObj.access_token })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // 백엔드에서 받은 JWT 토큰을 localStorage에 저장
            localStorage.setItem("loginToken", data.jwtToken); // 백엔드에서 발급된 JWT 토큰 사용

            // 로그인 상태를 true로 설정
            setIsLoggedIn(true);

            // 사용자 정보 가져오기
            window.Kakao.API.request({
              url: '/v2/user/me',
              success: (res) => {
                console.log("사용자 정보", res);
                // 메인 페이지로 이동
                navigate("/");
              },
              fail: (err) => {
                console.error("사용자 정보 요청 실패", err);
              },
            });
          } else if (data.registerRequired) {
            // 회원가입이 필요한 경우 처리
            alert("등록되지 않은 사용자입니다. 회원가입을 진행합니다.");

            // 회원가입 요청
            window.Kakao.API.request({
              url: '/v2/user/me',
              success: (res) => {
                // 백엔드에 사용자 정보를 포함하여 회원가입 요청
                fetch("/ebook/kakao/register", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json" ,
                    "Authorization": `Bearer ${authObj.access_token}`
                  },
                  body: JSON.stringify({
                    token: authObj.access_token,
                    id: res.id,
                    email: res.kakao_account.email,
                    name: res.properties.nickname,
                    gender: res.kakao_account.gender,
                    birthyear: res.kakao_account.birthyear,
                    birthday: res.kakao_account.birthday,
                    phone_number: res.kakao_account.phone_number,
                    address: res.kakao_account.shipping_address
                  })
                })
                .then(response => response.json())
                .then(registerData => {
                  if (registerData.success) {
                    // 회원가입 후 백엔드에서 받은 JWT 토큰을 localStorage에 저장
                    localStorage.setItem("loginToken", registerData.jwtToken);
                    setIsLoggedIn(true);
                    navigate("/"); // 회원가입 후 메인 페이지로 이동
                  } else {
                    alert(registerData.message || "회원가입 처리 중 오류가 발생했습니다.");
                  }
                })
                .catch(error => {
                  console.error("회원가입 처리 오류", error);
                  alert("회원가입 처리 중 오류가 발생했습니다.");
                });
              },
              fail: (err) => {
                console.error("사용자 정보 요청 실패", err);
                alert("카카오 사용자 정보 요청 중 오류가 발생했습니다.");
              },
            });
          } else {
            // 로그인 실패 처리
            alert(data.message || "사용자가 존재하지 않습니다.");
            setIsLoggedIn(false);
          }
        })
        .catch(error => {
          console.error("백엔드 로그인 처리 오류", error);
          alert("로그인 처리 중 오류가 발생했습니다.");
        });
      },
      fail: (err) => {
        console.error("로그인 실패", err);
        alert("카카오 로그인에 실패했습니다.");
      },
    });
};

      // 네이버 로그인 처리 (이미지를 클릭하면 네이버 로그인 실행)
  const handleNaverLogin = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID; // 네이버 클라이언트 ID
    const redirectUri = "http://localhost:3000/auth/naver/callback"; // 네이버 로그인 콜백 URL
    const state = Math.random().toString(36).substring(2, 15); // CSRF 방지를 위한 상태값

    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

    window.location.href = naverLoginUrl;  // 네이버 로그인 URL로 리디렉션
  };

  const handleLogout = () => {
    // 카카오 토큰 및 백엔드에서 받은 토큰 삭제
    localStorage.removeItem("loginToken"); // 백엔드 JWT 토큰 삭제
    sessionStorage.removeItem("loginToken");
    localStorage.removeItem("kakao_access_token"); // 카카오 토큰 삭제 (예시)
  
    // 카카오 로그아웃 처리 (선택 사항)
    if (window.Kakao.Auth) {
      window.Kakao.Auth.logout(() => {
        console.log("카카오 로그아웃 완료");
      });
    }
  
    // 로그인 상태를 false로 설정
    setIsLoggedIn(false);
  
    // 로그인 페이지로 이동
    navigate("/login");
  };

  return (
    <div className="login-form">
      <h2 className="txt-center page-title">Book<br />Garden</h2>
      <form onSubmit={handleLoginSubmit}>

      <InputItem
          id="me_id"
          name="me_id"
          type="text"
          cls="frm-input"
          placeholder="아이디를 입력하세요"
          value={id}
          change={(value) => setId(value)} // ID 상태와 변경 핸들러 추가
          label="아이디"
        />
        <InputItem
          id="me_pw"
          name="me_pw"
          type="password"
          cls="frm-input"
          placeholder="비밀번호를 입력하세요"
          value={password}
          change={(value) => setPassword(value)} // 비밀번호 상태와 변경 핸들러 추가
          label="비밀번호"
        />

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
            click={() => {

              if (googleInitialized) {
                window.google.accounts.id.prompt((notification) => {
                  if (notification.isNotDisplayed) {
                    console.error("팝업이 표시되지 않았습니다. 이유: ", notification.notDisplayedReason);
                    console.log("전체 notification 객체: ", notification); // notification 전체 객체 출력
                  }
                  if (notification.isSkipped) {
                    console.error("팝업이 스킵되었습니다. 이유: ", notification.skipReason);
                  }
                });
            } else {
              console.error("Google API is not loaded yet.");
            }
          }}
        />
        </div>
      </form>
    </div>
  );
}

export default Login;