import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";

const NaverCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext); // 로그인 상태 업데이트 함수

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");

    console.log("네이버에서 받은 code:", code);
    console.log("네이버에서 받은 state:", state);

    if (code) {
      // 백엔드에 네이버 로그인 요청 보내기
      fetch("/ebook/naver/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, state }), // 네이버 로그인에서 받은 code와 state 전송
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("loginToken", data.token); // 로그인 또는 회원가입 후 토큰 저장
            setIsLoggedIn(true);  // 로그인 상태 업데이트
            navigate("/");  // 로그인 후 메인 페이지로 이동
          } else if (data.message === "사용자가 존재하지 않습니다.") {
            // 회원 정보가 없는 경우, 회원가입 처리
            alert("회원가입이 필요합니다. 회원가입을 진행합니다.");

            // 회원가입 요청
            fetch("/ebook/naver/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code, state }), // 네이버 로그인에서 받은 code와 state 전송
            })
              .then((res) => res.json())
              .then((registerData) => {
                if (registerData.success) {
                  localStorage.setItem("loginToken", registerData.token); // 회원가입 후 토큰 저장
                  setIsLoggedIn(true);  // 로그인 상태 업데이트
                  navigate("/");  // 메인 페이지로 이동
                } else {
                  alert("회원가입에 실패했습니다.");
                }
              })
              .catch((error) => {
                console.error("회원가입 처리 오류", error);
              });
          } else {
            alert("로그인 실패");
          }
        })
        .catch((error) => {
          console.error("로그인 처리 오류", error);
        });
    }
  }, [location, navigate, setIsLoggedIn]);

  return <div>로그인 처리 중...</div>;
};

export default NaverCallback;