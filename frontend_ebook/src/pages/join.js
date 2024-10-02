
import {InputItem} from "../components/form/input";
import Button from "../components/form/button";
import "../css/join.css";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Join = () => {

	const {
    register,
    handleSubmit,
		watch,
    formState: { errors },
  } = useForm();

  const [birthDate, setBirthDate] = useState(""); // 생년월일 상태 추가

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleBirthDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // 숫자만 허용
    if (input.length <= 8) {
      // 최대 8자리 입력 가능
      const year = input.substring(0, 4);
      const month = input.substring(4, 6);
      const day = input.substring(6, 8);
      
      let formattedDate = year;
      if (month) {
        formattedDate += `.${month}`;
      }
      if (day) {
        formattedDate += `.${day}`;
      }

      setBirthDate(formattedDate); // 상태 업데이트
    }
  };

	return(
		<div className="join-form">
			<h2 className="txt-center page-title">회원가입</h2>
			<form name="join" onSubmit={handleSubmit(onSubmit)}>
				<fieldset className="form-wrapper">
					{/* 아이디 */}
					<InputItem
            inputs={[
              {
                id: "me_id",
                name: "me_id",
                type: "text",
                placeholder: "",
                cls: "frm-input",
                registerProps: register("me_id", {
                  required: "아이디를 입력해주세요.",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
                    message: "아이디는 8~15자이며, 하나의 글자와 숫자를 포함해야 합니다.",
                  },
                }),
                error: errors.me_id,
              },
            ]}
            label={"아이디"}
          />

					{/* 닉네임 */}
          <InputItem
            inputs={[
              {
                id: "me_nickname",
                name: "me_nickname",
                type: "text",
                placeholder: "",
                cls: "frm-input",
                registerProps: register("me_nickname", {
                  required: "닉네임을 입력해주세요.", pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,8}$/,
                    message: "닉네임은 5~8자이며, 하나의 글자와 숫자를 포함해야 합니다.",
                  }
                }),
                error: errors.me_nickname,
              },
            ]}
            label={"닉네임"}
          />

					   {/* 비밀번호 */}
          <InputItem
            inputs={[
              {
                id: "me_pw",
                name: "me_pw",
                type: "password",
                placeholder: "",
                cls: "frm-input",
                registerProps: register("me_pw", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
                    message:
                      "비밀번호는 8~15자이며, 최소 하나의 글자, 숫자, 특수문자를 포함해야 합니다.",
                  },
                }),
                error: errors.me_pw,
              },
            ]}
            label={"비밀번호"}
          />

					 {/* 비밀번호 확인 */}
					 <InputItem
            inputs={[
              {
                id: "me_pw2",
                name: "me_pw2",
                type: "password",
                placeholder: "",
                cls: "frm-input",
                registerProps: register("me_pw2", {
                  required: "비밀번호 확인을 입력해주세요.",
                  validate: (value) => value === watch("me_pw") || "비밀번호가 일치하지 않습니다.",
                }),
                error: errors.me_pw2,
              },
            ]}
            label={"비밀번호 확인"}
          />

					 {/* 이메일 */}
					 <InputItem
            inputs={[
              {
                id: "me_email",
                name: "me_email",
                type: "email",
                placeholder: "",
                cls: "frm-input",
                registerProps: register("me_email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "올바른 이메일 형식을 입력해주세요.",
                  },
                }),
                error: errors.me_email,
              },
            ]}
            label={"이메일"}
          />

				</fieldset>

				<hr/>

				<fieldset className="form-wrapper">
        <InputItem inputs={[
						{
							id: "me_phone",
							name: "me_phone",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						}
					]} label={"연락처 (숫자만 입력해주세요.)"}/>
					<InputItem inputs={[
						{
							id: "me_postalCode",
							name: "me_postalCode",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						},
						{
							id: "me_address1",
							name: "me_address1",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						},
						{
							id: "me_address2",
							name: "me_address2",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						}
					]} label={"주소 (추후 경품 제공에 이용될 수 있습니다.)"} cls={"postal"} />
					<InputItem inputs={[
						{
							id: "me_birth",
							name: "me_birth",
							type: "text",
							placeholder: "",
							cls: "frm-input",
              value: birthDate, // 상태로 설정된 값
                onChange: handleBirthDateChange, // 변경 이벤트 처리기 추가
						}
					]} label={"생년월일(8자리)"}/>
				</fieldset>

				<Button type={"submit"} text={"가입하기"} cls={"btn btn-point big"}></Button>
			</form>
		</div>
	);
}

export default Join;