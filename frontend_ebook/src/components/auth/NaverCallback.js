import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NaverCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");

    console.log("네이버에서 받은 code:", code);
    console.log("네이버에서 받은 state:", state);

    if (code) {
      fetch("/api/naver/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, state }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("loginToken", data.token); // 토큰 저장
            navigate("/"); // 로그인 성공 후 메인 페이지로 이동
          } else {
            alert("로그인 실패: 사용자 정보가 없습니다.");
          }
        })
        .catch((error) => {
          console.error("로그인 처리 오류", error);
        });
    }
  }, [location, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default NaverCallback;
