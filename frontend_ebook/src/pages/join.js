import {InputItem} from "../components/form/input";
import Button from "../components/form/button";

import "../css/join.css";

const Join = () => {
	return(
		<div className="join-form">
			<h2 className="txt-center page-title">회원가입</h2>
			<form name="join">
				<fieldset className="form-wrapper">
					<InputItem inputs={[
						{
							id: "me_id",
							name: "me_id",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						}
					]} label={"아이디"}/>
					<InputItem inputs={[
						{
							id: "me_nickname",
							name: "me_nickname",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						}
					]} label={"닉네임"}/>
					<InputItem inputs={[
						{
							id: "me_pw",
							name: "me_pw",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						}
					]} label={"비밀번호"}/>
					<InputItem inputs={[
						{
							id: "me_pw2",
							name: "me_pw2",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						}
					]} label={"비밀번호 확인"}/>
					<InputItem inputs={[
						{
							id: "me_email",
							name: "me_email",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						}
					]} label={"이메일"}/>
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
					]} label={"연락처"} notice={"숫자만 입력해주세요"}/>
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
					]} label={"주소"} cls={"postal"} notice={"추후 경품 제공에 이용될 수 있습니다"}/>
					<InputItem inputs={[
						{
							id: "me_birth",
							name: "me_birth",
							type: "text",
							placeholder: "",
							cls: "frm-input"
						}
					]} label={"생년월일(8자리)"}/>
				</fieldset>

				<Button type={"submit"} text={"가입하기"} cls={"btn btn-point big"}></Button>
			</form>
		</div>
	);
}

export default Join;