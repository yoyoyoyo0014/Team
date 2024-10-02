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
}

export default Login;