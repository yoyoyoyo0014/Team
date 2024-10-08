import React, { useEffect, useContext } from "react";
import { InputItem } from "../components/form/input";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import Button from "../components/form/button";
import { LoginContext } from "../context/LoginContext";  // LoginContext import
import "../css/login.css";

const Login = () => {

  const { setIsLoggedIn } = useContext(LoginContext);  // 로그인 상태 업데이트 함수 가져오기
	const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

		script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
				// 카카오 JavaScript 키
        window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY); 
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log("로그인 성공", authObj);

        // 로그인 성공 후 토큰을 localStorage에 저장
        localStorage.setItem("loginToken", authObj.access_token);

        // 로그인 상태를 true로 설정
        setIsLoggedIn(true);

				// 로그인 성공 후 사용자 정보 요청
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log("사용자 정보", res);
						navigate("/");
          },
          fail: (err) => {
            console.error("사용자 정보 요청 실패", err);
          },
        });
      },
      fail: (err) => {
        console.error("로그인 실패", err);
      },
    });
  };

  return (
    <div className="login-form">
      <h2 className="txt-center page-title">Book<br />Garden</h2>
      <form>
        <InputItem
          inputs={[{ id: "me_id", name: "me_id", type: "text" }]}
          label="아이디"
        />
        <InputItem
          inputs={[{ id: "me_pw", name: "me_pw", type: "password" }]}
          label="비밀번호"
        />
        <Button type={"submit"} text={"로그인"} cls={"btn btn-point full big"} />
        <div className="sns-login">
          <Button
            type={"button"}
            cls={"btn btn-kakao full"}
            onClick={handleKakaoLogin}
          />
          <Button type={"button"} text={"네이버 로그인"} cls={"btn btn-naver full"} />
          <Button type={"button"} text={"구글 로그인"} cls={"btn btn-google full"} />
        </div>
      </form>
    </div>
  );
}

export default Login;