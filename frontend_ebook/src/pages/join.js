<<<<<<< HEAD
import { useState } from "react";
import { useForm } from "react-hook-form";

import "../css/join.css";

import {InputItem} from "../components/form/input";
import Button from "../components/form/button";
import AddressInput from "../components/form/addressinput";

const Join = () => {
	const {
    register,
    handleSubmit,
		watch,
    formState: { errors }
  } = useForm();

	let [member, setMember] = useState({
		me_id: '',
		me_pw: '',
		me_nickname: '',
		me_email: '',
		me_phone: '',
		me_postalCode: '',
		me_address: '',
		me_birth: ''
	});

	let [id, setId] = useState('');
	let [nickname, setNickname] = useState('');
	let [pw, setPw] = useState('');
	let [pw2, setPw2] = useState('');
	let [email, setEmail] = useState('');
	let [phone, setPhone] = useState('');
	let [addr2, setAddr2] = useState('');
	let [birth, setBirth] = useState('');
	
	let span = document.createElement('span');
	span.classList.add('error');

	let inps = document.querySelectorAll('.input-item');
	inps.forEach((inp, i) => inp.appendChild(span));

	const submit = () => {
		setMember((member) => {
			return{
				...member,
				me_id: id,
				me_pw: pw,
				me_nickname: nickname,
				me_email: email,
				me_phone: phone,
				me_address: member.addr1 + ' ' + addr2,
				me_birth: birth
			}
		});
		console.log(member);
	}

	return(
		<div className="join-form">
			<h2 className="txt-center page-title">회원가입</h2>
			<form name="join" onSubmit={handleSubmit(submit)}>
				<fieldset className="form-wrapper">
				<InputItem
						id="me_id"
						name="me_id"
						type="text"
						cls="frm-input"
						registerProps={
							register("me_id", {
								required: "아이디를 입력해주세요",
								pattern: {
									value: /^[0-9a-zA-Z_]{8,15}$/,
									message: "아이디는 8~15자이며, 영문 혹은 숫자를 포함해야 합니다",
								},
							})
						}
						error={errors.me_id}
						change={setId}
						label={"아이디"}/>
					<InputItem
						id="me_nickname"
						name="me_nickname"
						type="text"
						cls="frm-input"
						registerProps={
							register("me_nickname", {
								required: "닉네임을 입력해주세요",
								pattern: {
									value: /^[0-9a-zA-Z가-힣]{1,8}$/,
									message: "닉네임은 최대 8자이며, 하나의 글자 혹은 숫자를 포함해야 합니다",
								}
							})
						}
						error={errors.me_nickname}
						change={setNickname}
						label={"닉네임"}/>
					<InputItem
						id="me_pw"
						name="me_pw"
						type="text"
						cls="frm-input"
						registerProps={
							register("me_pw", {
								required: "비밀번호를 입력해주세요",
								pattern: {
									value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
									message: "비밀번호는 8~15자이며, 최소 하나의 영문, 숫자, 기호를 포함해야 합니다"
								}
							})
						}
						error={errors.me_pw}
						change={setPw}
						label={"비밀번호"}/>
					<InputItem
						id="me_pw2"
						name="me_pw2"
						type="text"
						cls="frm-input"
						registerProps={
							register("me_pw2", {
								required: "비밀번호를 입력해주세요",
								pattern: {
									validate: (value) => value === watch("me_pw") || "비밀번호가 일치하지 않습니다"
								}
							})
						}
						error={errors.me_pw2}
						change={setPw2}
						label={"비밀번호 확인"}/>
					<InputItem
						id="me_email"
						name="me_email"
						type="email"
						cls="frm-input"
						registerProps={
							register("me_email", {
								required: "이메일을 입력해주세요",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "올바른 이메일 형식을 입력해주세요",
								},
							})
						}
						error={errors.me_email}
						change={setEmail}
						label={"이메일"}/>
				</fieldset>

				<hr/>

				<fieldset className="form-wrapper">
					<InputItem
						id="me_phone"
						name="me_phone"
						type="text"
						cls="frm-input"
						change={setPhone}
						label={"연락처"}
						notice={"숫자만 입력해주세요"}/>
					<AddressInput change={setMember} item={member}/>
					<InputItem
						id="me_addr2"
						name="me_addr2"
						type="text"
						cls="frm-input"
						change={setAddr2}
						style={{marginTop: '-1.2rem'}}
					/>
					<InputItem
						id="me_birth"
						name="me_birth"
						type="text"
						cls="frm-input"
						change={setBirth}
						label={"생년월일(8자리)"}/>
				</fieldset>

				<Button type={"submit"} text={"가입하기"} cls={"btn btn-point big submit"}></Button>
			</form>
		</div>
	);
}
=======
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
>>>>>>> KCL

import "../css/join.css";

import {Input, InputItem} from "../components/form/input";
import Button from "../components/form/button";
import AddressInput from "../components/form/addressinput";

const Join = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

	const navigate = useNavigate(); // useNavigate 훅 선언

  let [member, setMember] = useState({
    me_id: '',
    me_name: '',
    me_pw: '',
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

   // 중복 확인 상태
   const [isIdDuplicate, setIsIdDuplicate] = useState(false);
   const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

  // 닉네임 중복 확인 API 호출
  const checkDuplicateNickname = async (nickname) => {
    try {
      const response = await fetch(`/ebook/member/check-duplicate-nickname?me_nickname=${nickname}`);
      const result = await response.json();
      setIsNicknameDuplicate(result.exists); // 중복일 경우 true, 그렇지 않으면 false
    } catch (error) {
      console.error("Error checking nickname:", error);
    }
  };
  
  // 아이디 중복 확인 API 호출
  const checkDuplicateId = async (id) => {
    try {
      const response = await fetch(`/ebook/member/check-duplicate-id?me_id=${id}`);
      const result = await response.json();
      setIsIdDuplicate(result.exists); // 중복일 경우 true, 그렇지 않으면 false
    } catch (error) {
      console.error("Error checking ID:", error);
    }
  };

   // submit 함수에서 상태를 업데이트하고 서버로 전송
   const submit = (data) => {
    if (isIdDuplicate || isNicknameDuplicate) {
      alert("아이디 또는 닉네임이 이미 존재합니다.");
      return;
    }

    const memberData = {
      ...member,
      me_id: data.me_id,
      me_name: data.me_name,
      me_pw: data.me_pw,
      me_nickname: data.me_nickname,
      me_email: data.me_email,
      me_gender: data.me_gender || "default",
      me_phone: data.me_phone,
      me_address: member.addr1 + ' ' + addr2,
      me_postalCode: member.me_postalCode,
      me_birth: `${year}-${month}-${day}`
    };

    setMember(memberData);
    console.log(memberData);

    // 서버로 회원가입 정보 전송
    registerMember(memberData);
  };

  // 백엔드의 /register 엔드포인트로 POST 요청
  const registerMember = async (memberData) => {
    try {
      const response = await fetch("/ebook/member/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("회원가입이 성공적으로 완료되었습니다!");
				navigate("/login");
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("서버에 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    // 성별 기본 선택값 설정
    let me_gender = document.getElementById('default');
    if (me_gender) me_gender.checked = true;
  }, []);

  return (
    <div className="join-form">
      <h2 className="txt-center page-title">회원가입</h2>
      <form name="join" onSubmit={handleSubmit(submit)}>
        <fieldset className="form-wrapper">

        <InputItem
          id="me_id"
          name="me_id"
          type="text"
          cls="frm-input"
          registerProps={register("me_id", {
            required: "아이디를 입력해주세요",
            pattern: {
              value: /^[0-9a-zA-Z_]{8,15}$/,
              message: "아이디는 8~15자이며, 영문 혹은 숫자를 포함해야 합니다",
            },
            onBlur: (e) => checkDuplicateId(e.target.value), // 중복 체크
          })}
          placeholder="8~15자의 영문 혹은 숫자"
          error={errors.me_id}
          label={"아이디"}
        >
          {isIdDuplicate && (
            <p className="error-msg">아이디가 이미 사용 중입니다.</p>
          )}
        </InputItem>


          <InputItem
            id="me_name"
            name="me_name"
            type="text"
            cls="frm-input"
            registerProps={register("me_name", {
              required: "이름을 입력해주세요"
            })}
            error={errors.me_name}
            label={"이름"}
          />

          <InputItem
          id="me_nickname"
          name="me_nickname"
          type="text"
          cls="frm-input"
          registerProps={register("me_nickname", {
            required: "닉네임을 입력해주세요",
            pattern: {
              value: /^[0-9a-zA-Z가-힣]{2,8}$/,
              message: "닉네임은 최소 2자, 최대 8자 한글, 영문, 숫자를 포함합니다.",
            },
            onBlur: (e) => checkDuplicateNickname(e.target.value), // 중복 체크
          })}
          placeholder="최대 8자 이내의 한글/영문/숫자"
          error={errors.me_nickname}
          label={"닉네임"}
        >
          {isNicknameDuplicate && (
            <p className="error-msg">닉네임이 이미 사용 중입니다.</p>
          )}
        </InputItem>

          <InputItem
            id="me_pw"
            name="me_pw"
            type="password"
            cls="frm-input"
            registerProps={register("me_pw", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
                message: "비밀번호는 8~15자이며, 최소 하나의 영문, 숫자, 기호를 포함해야 합니다"
              }
            })}
            placeholder="8~15자의 영문/숫자/기호(@$!%*#?&) 1자씩 포함"
            error={errors.me_pw}
            label={"비밀번호"}
          />
          <InputItem
            id="me_pw2"
            name="me_pw2"
            type="password"
            cls="frm-input"
            registerProps={register("me_pw2", {
              required: "비밀번호를 입력해주세요",
              validate: (value) => value === watch("me_pw") || "비밀번호가 일치하지 않습니다"
            })}
            error={errors.me_pw2}
            label={"비밀번호 확인"}
          />
          <InputItem
            id="me_email"
            name="me_email"
            type="email"
            cls="frm-input"
            registerProps={register("me_email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "올바른 이메일 형식을 입력해주세요",
              },
            })}
            error={errors.me_email}
            label={"이메일"}
          />

          <div className="input-item">
            <div className="radio-container">
              <div>
                <input type="radio" name="me_gender" id="default" value="default" {...register("me_gender")} />
                <label htmlFor="default">선택 안 함</label>
              </div>
              <div>
                <input type="radio" name="me_gender" id="male" value="male" {...register("me_gender")} />
                <label htmlFor="male">남성</label>
              </div>
              <div>
                <input type="radio" name="me_gender" id="female" value="female" {...register("me_gender")} />
                <label htmlFor="female">여성</label>
              </div>
            </div>
            <label htmlFor="">성별</label>
          </div>
        </fieldset>

        <hr />

        <fieldset className="form-wrapper">
          <InputItem
            id="me_phone"
            name="me_phone"
            type="text"
            cls="frm-input"
            label={"연락처"}
            notice={"숫자만 입력해주세요"}
            registerProps={register("me_phone", {
              required: "연락처를 입력해주세요",
              pattern: {
                value: /^\d{10,11}$/,
                message: "올바른 연락처를 입력해주세요",
              },
            })}
            error={errors.me_phone}
          />
          <AddressInput change={setMember} item={member} />
          <InputItem
            id="me_addr2"
            name="me_addr2"
            type="text"
            cls="frm-input"
            change={setAddr2}
            style={{ marginTop: "-1.2rem" }}
          />
          <div className="input-item" style={{ display: "flex", gap: "1em" }}>
            <Input name="year" type="text" max="4" change={setYear} placeholder="YYYY" />
            <Input name="month" type="text" max="2" change={setMonth} placeholder="MM" />
            <Input name="day" type="text" max="2" change={setDay} placeholder="DD" />
            <label>생년월일(8자리)</label>
          </div>
        </fieldset>

        <Button type="submit" text="가입하기" cls="btn btn-point big submit" />
      </form>
    </div>
  );
};

export default Join;
