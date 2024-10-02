import { useState } from "react";
import DaumPostcode from 'react-daum-postcode';

import Button from './button';
import {Input, InputItem} from "./input";

const AddressInput = ({change, item}) => {
	let [code, setCode] = useState('');
	let [addr1, setAddr1] = useState('');
	let [addr2, setAddr2] = useState('');
	let [isOpen, setIsOpen] = useState(false);
	const style = {
		width: '400px',
		height: '600px'
	}

	const completeHandler = (data) => {
    const { address, zonecode } = data;
		setCode(zonecode);
    setAddr1(address);
		let addr1 = address;
		let me_postalCode = zonecode;
		change({...item, me_postalCode, addr1});
  };

	const closeHandler = (state) => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

	const themeObj = {
		bgColor: "#fafaf9", 			// 바탕 배경색
		searchBgColor: "#f5f5f4", 		// 검색창 배경색
		contentBgColor: "#fafaf9", 		// 본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
		pageBgColor: "#fafaf9", 		// 페이지 배경색
		textColor: "#292524", 			// 기본 글자색
		queryTextColor: "#292524", 		// 검색창 글자색
		// postcodeTextColor: "#df5b5b", 	// 우편번호 글자색
		// emphTextColor: "#84cb70", 		// 강조 글자색
		outlineColor: "#c4bfbd" 		// 테두리
	}

	return(
		<div className="address-input">
			<div className="inputs">
				<div className="input-item">
					<Input id="me_postalCode"
							name="me_postalCode"
							type="text"
							cls="frm-input"
							change={setCode}
							value={code}
							readOnly={true}/>
					<Button type="button" cls="btn btn-point" text="우편번호 찾기" click={toggleHandler}/>
				</div>
				<InputItem
					id="me_addr1"
					name="me_addr1"
					type="text"
					cls="frm-input"
					change={setAddr1}
					value={addr1}
					readOnly={true}
					label="주소"
					notice="추후 경품 제공에 이용될 수 있습니다"/>
			</div>
			{isOpen && (
			<div id="wrap">
				<div className="container">
					<Button type="button" cls="btn btn-basic" text="닫기" click={toggleHandler}/>
					<DaumPostcode
						theme={themeObj}
						style={style}
						onClose={closeHandler}
						onComplete={completeHandler}/>
				</div>
			</div>)}
		</div>
	)
}

export default AddressInput;