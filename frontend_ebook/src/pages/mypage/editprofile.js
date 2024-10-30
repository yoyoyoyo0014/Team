import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "../../css/join.css";

import { Input, InputItem } from "../../components/form/input";
import Button from "../../components/form/button";

const EditProfile = () => {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("");

  let [member, setMember] = useState({
    me_id: '',
    me_name: '',
    me_nickname: '',
    me_email: '',
    me_gender: '',
    me_phone: '',
    me_postalCode: '',
    me_address: '',
    me_birth: ''
  });

  let [addr2, setAddr2] = useState('');
  let [year, setYear] = useState('');
  let [month, setMonth] = useState('');
  let [day, setDay] = useState('');

  useEffect(() => {
    // 로그인 방식 정보를 localStorage에서 불러옴
    const method = localStorage.getItem("loginMethod");
    setLoginMethod(method);
  }, []);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem("loginToken") || sessionStorage.getItem("loginToken");
      console.log("Token from storage:", token);
  
      if (!token) {
        console.error("No token found. Redirecting to login page.");
        return; // 토큰이 없으면 함수 종료
      }
      
      // JWT 형식 확인
      if (!token || token.split('.').length !== 3) {
        console.warn("Invalid JWT format. Redirecting to login page.");
        // 로그인 페이지로 리디렉션 또는 사용자에게 로그인 필요 알림
        return;
      }

      const response = await fetch("/ebook/member/profile", {
        method: "GET", // GET 요청임을 명확히 함
        headers: {
          "Authorization": `Bearer ${token}`, // Authorization 헤더에 Bearer + 토큰 포함
        },
      });
  
      if (response.status === 401) {
        console.error("Unauthorized: Invalid token or session expired.");
        return;
      }
  
      if (!response.ok) {
        console.error("Failed to fetch user data.");
        return;
      }
  
      const text = await response.text(); // 응답 텍스트로 받기

      if (!text) {
        console.warn("Empty response received.");
        return;
      }
  
      const data = JSON.parse(text); // JSON 파싱
      
      setMember({
        me_id: data.me_id,
        me_name: data.me_name,
        me_nickname: data.me_nickname,
        me_email: data.me_email,
        me_gender: data.me_gender,
        me_phone: data.me_phone,
        me_postalCode: data.me_postalCode,
        me_address: data.me_address,
        me_birth: data.me_birth,
      });
  
    const birthDate = data.me_birth ? new Date(data.me_birth) : null;
    if (birthDate) {
      const year = birthDate.getFullYear();
      const month = (birthDate.getMonth() + 1).toString().padStart(2, '0');
      const day = birthDate.getDate().toString().padStart(2, '0');

      setYear(year);
      setMonth(month);
      setDay(day);
    }

      setAddr2(data.me_address.split(" ")[1] || "");

    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  useEffect(() => {
    loadUserData(); // 페이지가 로드될 때 사용자 정보 로드
  }, []);

  const submit = (data) => {
    const updatedData = {
      ...member,
      me_name: data.me_name,
      me_nickname: data.me_nickname,
      me_gender: data.me_gender || member.me_gender,
      me_phone: data.me_phone,
      me_address: member.addr1 + ' ' + addr2,
      me_postalCode: member.me_postalCode,
      me_birth: `${year}-${month}-${day}`
    };
    setMember(updatedData);
    updateProfile(updatedData);
  };

  const updateProfile = async (updatedData) => {
    try {
      const response = await fetch("/ebook/member/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        alert("개인 정보가 성공적으로 수정되었습니다!");
        navigate("/mypage");
      } else {
        alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      alert("서버에 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  function openPasswordChangePopup() {
    // 비밀번호 변경 팝업을 새 창으로 연다.
    window.open("password-popup.html", 
      "passwordChangePopup", 
      "width=600,height=300");
  }

  return (
    <div className="join-form">
      <h2 className="txt-center page-title">개인 정보 수정</h2>
      <form name="editProfile" onSubmit={handleSubmit(submit)}>
        <fieldset className="form-wrapper">

          <InputItem
            id="me_id"
            name="me_id"
            type="text"
            cls="frm-input"
            value={member.me_id}
            readOnly
            label={"아이디"}
          />

          <InputItem
            id="me_name"
            name="me_name"
            type="text"
            cls="frm-input"
            value={member.me_name}
            readOnly
            label={"이름"}
          />

          <InputItem
            id="me_nickname"
            name="me_nickname"
            type="text"
            cls="frm-input"
            value={member.me_nickname}
            readOnly
            label={"닉네임"}
          />

          {/* 비밀번호 변경 버튼 - 일반 로그인인 경우에만 표시 */}
          {loginMethod === 'general' && (
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
              <label style={{ marginRight: "auto" }}>비밀번호</label>
              <Button 
                type="button" 
                cls="btn btn-point" 
                text="비밀번호 변경" 
                style={{ marginLeft: "auto" }}
                click={openPasswordChangePopup} 
              />
            </div>
          )}

          <InputItem
            id="me_email"
            name="me_email"
            type="email"
            cls="frm-input"
            value={member.me_email}
            label={"이메일"}
          />

          <InputItem
            id="me_gender"
            name="me_gender"
            type="text"
            cls="frm-input"
            value={member.me_gender}
            readOnly
            label={"성별"}
          />
        </fieldset>

        <hr />

        <fieldset className="form-wrapper">
          <InputItem
            id="me_phone"
            name="me_phone"
            type="text"
            cls="frm-input"
            value={member.me_phone}
            label={"연락처"}
            notice="- 를 제외한 번호를 입력해주세요."
          />

          <div className="input-item" style={{ display: "flex", gap: "1em" }}>
            <Input name="year" type="text" max="4" value={year} change={setYear} readOnly />
            <Input name="month" type="text" max="2" value={month} change={setMonth} readOnly />
            <Input name="day" type="text" max="2" value={day} change={setDay} readOnly />
            <label>생년월일(8자리)</label>
          </div>
        </fieldset>

        <Button type="submit" text="확인" cls="btn btn-point big submit" />
      </form>
    </div>
  );
};

export default EditProfile;
