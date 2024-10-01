import { useState } from "react";

import "../css/join.css";

import {InputItem} from "../components/form/input";
import Button from "../components/form/button";
import AddressInput from "../components/form/addressinput";

const Join = () => {
	let [id, setId] = useState('');
	let [nickname, setNickname] = useState('');
	let [pw, setPw] = useState('');
	let [pw2, setPw2] = useState('');
	let [email, setEmail] = useState('');
	let [phone, setPhone] = useState('');
	let [code, setCode] = useState('');
	let [addr, setAddr] = useState('');
	let [birth, setBirth] = useState('');

	const onSetAddr = (addr) => setAddr(addr);

	let span = document.createElement('span');
	span.classList.add('error');

	let inps = document.querySelectorAll('.input-item');
	inps.forEach((inp, i) => inp.appendChild(span));

	const chkInp = (inp, msg) => {
		//console.log(document.querySelector(`#${inp}`).parentElement);
		//document.querySelector(`#${inp}`).parentElement.querySelector('.error').innerHTML = msg;
	}

	const sumbit = () => {
		// const idRgx = /^[0-9a-zA-Z_]{6,13}$/;
		// if (!idRgx.exec(id)){
		// 	let msg = '아이디가 형식에 맞지 않습니다';
		// 	chkInp('me_id', msg);
		// 	return;
		// } else {
		// 	let msg = '';
		// 	chkInp('me_id', msg);
		// }
		// const pwRgx = /^[0-9a-zA-Z~!@#$%^&*()?]{6,13}$/;
		// if (!pwRgx.exec(pw)){
		// 	let msg = '비밀번호가 형식에 맞지 않습니다';
		// 	chkInp('me_pw', msg);
		// 	return;
		// } else {
		// 	let msg = '';
		// 	chkInp('me_pw', msg);
		// }
		// if (pw !== pw2){
		// 	let msg = '비밀번호가 서로 다릅니다';
		// 	chkInp('me_pw2', msg);
		// 	return;
		// } else {
		// 	let msg = '';
		// 	chkInp('me_pw2', msg);
		// }
		// const emailRgx = /^[0-9a-zA-Z._-]+@+[0-9a-zA-Z.-]+.+[a-zA-Z]{2,4}$/;
		// if(!emailRgx.exec(email)){
		// 	let msg = '이메일이 형식에 맞지 않습니다';
		// 	chkInp('me_email', msg);
		// 	return;
		// } else {
		// 	let msg = '';
		// 	chkInp('me_email', msg);
		// }

		const member = {
			me_id: id,
			me_pw: pw,
			me_nickname: nickname,
			me_email: email,
			me_phone: phone,
			me_postalCode: code,
			me_address: addr,
			me_birth: birth
		}
		console.log(member);
	}

	return(
		<div className="join-form">
			<h2 className="txt-center page-title">회원가입</h2>
			<form name="join">
				<fieldset className="form-wrapper">
					<InputItem input={
						{
							id: "me_id",
							name: "me_id",
							type: "text",
							placeholder: "6~13자 사이의 영문/숫자/언더바(_)",
							cls: "frm-input",
							change: setId
						}
					} label={"아이디"}/>
					<InputItem input={
						{
							id: "me_nickname",
							name: "me_nickname",
							type: "text",
							placeholder: "",
							cls: "frm-input",
							change: setNickname
						}
					} label={"닉네임"}/>
					<InputItem input={
						{
							id: "me_pw",
							name: "me_pw",
							type: "text",
							placeholder: "6~13자 사이의 영문/숫자/기호",
							cls: "frm-input",
							change: setPw
						}
					} label={"비밀번호"}/>
					<InputItem input={
						{
							id: "me_pw2",
							name: "me_pw2",
							type: "text",
							placeholder: "",
							cls: "frm-input",
							change: setPw2
						}
					} label={"비밀번호 확인"}/>
					<InputItem input={
						{
							id: "me_email",
							name: "me_email",
							type: "text",
							placeholder: "",
							cls: "frm-input",
							change: setEmail
						}
					} label={"이메일"}/>
				</fieldset>
				<hr/>
				<fieldset className="form-wrapper">
					<InputItem input={
						{
							id: "me_phone",
							name: "me_phone",
							type: "text",
							placeholder: "",
							cls: "frm-input",
							change: setPhone
						}
					} label={"연락처"} notice={"숫자만 입력해주세요"}/>
					<AddressInput change={setAddr}/>
					<InputItem input={
						{
							id: "me_birth",
							name: "me_birth",
							type: "text",
							placeholder: "",
							cls: "frm-input",
							change: setBirth
						}
					} label={"생년월일(8자리)"}/>
				</fieldset>

				<Button type={"button"} text={"가입하기"} cls={"btn btn-point big submit"} click={sumbit}></Button>
			</form>
		</div>
	);
}

export default Join;