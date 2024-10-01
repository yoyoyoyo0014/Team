import { InputItem } from "../components/form/input";
import Button from "../components/form/button";

import "../css/login.css";

const Login = () => {
	return(
		<div className="login-form">
			<h2 className="txt-center page-title">Book<br/>Garden</h2>
			<form>
				<InputItem inputs={[
					{
						id: "me_id",
						name: "me_id",
						type: "password"
					}
				]} label="아이디" />
				<InputItem inputs={[
					{
						id: "me_pw",
						name: "me_pw",
						type: "text"
					}
				]} label="비번"/>

				<Button type={"submit"} text={"로그인"} cls={"btn btn-point full big"}></Button>

				<div className="sns-login">
					<Button type={"button"} text={"카카오 로그인"} cls={"btn btn-kakao full"}></Button>
					<Button type={"button"} text={"네이버 로그인"} cls={"btn btn-naver full"}></Button>
					<Button type={"button"} text={"구글 로그인"} cls={"btn btn-google full"}></Button>
				</div>
			</form>
		</div>
	);
}

export default Login;