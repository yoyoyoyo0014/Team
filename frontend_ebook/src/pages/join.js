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

	console.log('id: ' + id);
	console.log('addr2: ' + addr2);

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
			<form name="join" onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(submit);
			}}>
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
									value: /^[0-9a-zA-Z_]{6,15}$/,
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
						type="text"
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

				<Button type={"button"} text={"가입하기"} cls={"btn btn-point big submit"} click={submit}></Button>
			</form>
		</div>
	);
}

export default Join;