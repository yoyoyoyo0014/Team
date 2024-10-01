import { useState } from "react";
import DaumPostcode from 'react-daum-postcode';

import Button from './button';
import {Input, InputItem} from "./input";

const AddressInput = (props) => {
	let [code, setCode] = useState('');
	let [addr1, setAddr1] = useState('');
	let [addr2, setAddr2] = useState('');
	
	const style = {
		width: '400px',
		height: '600px'
	}
	
	function updateAddr() {
		props.updateAddr(addr1 + ' ' + addr2);
	}

	const themeObj = {
		bgColor: "", 			// 바탕 배경색
		searchBgColor: "", 		// 검색창 배경색
		contentBgColor: "", 		// 본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
		pageBgColor: "", 		// 페이지 배경색
		textColor: "", 			// 기본 글자색
		queryTextColor: "", 		// 검색창 글자색
		postcodeTextColor: "", 	// 우편번호 글자색
		emphTextColor: "", 		// 강조 글자색
		outlineColor: "" 		// 테두리
	}

	const completeHandler = (data) => {
    const { address, zonecode } = data;
    setCode(zonecode);
    setAddr1(address);
		props.updateAddr(addr1 + ' ' + addr2);
  };

	return(
		<div className="address-input">
			<div className="inputs">
				<div className="input-item">
					<Input id="me_postalCode"
							name="me_postalCode"
							type="text"
							cls="frm-input"
							change={setCode}
							value={code}/>
					<Button type="button" cls="btn btn-point" text="우편번호 찾기" click={() => {document.querySelector('#wrap').style.display = 'flex'}}/>
				</div>
				<InputItem input={
					{
						id: "me_addr1",
						name: "me_addr1",
						type: "text",
						cls: "frm-input",
						change: setAddr1,
						value: addr1
					}
				} label="주소"/>
				<InputItem input={
					{
						id: "me_addr2",
						name: "me_addr2",
						type: "text",
						cls: "frm-input",
						change: setAddr2
					}
				}/>
			</div>

			<div id="wrap">
				<div className="container">
					<Button type="button" cls="btn btn-basic" text="닫기" click={() => {document.querySelector('#wrap').style.display = 'none'}}/>
					<DaumPostcode
						theme={themeObj}
						style={style}
						onClose={(state) => {
								if(state === 'COMPLETE_CLOSE') document.querySelector('#wrap').style.display = 'none';
							}}
						onComplete={completeHandler}/>
				</div>
			</div>
		</div>
	)
}

export default AddressInput;