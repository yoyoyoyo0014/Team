import { useState, useEffect } from "react";
import DaumPostcode from 'react-daum-postcode';

import Button from './button';
import { Input, InputItem } from "./input";

const AddressInput = ({ change, item }) => {
  const [code, setCode] = useState('');
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // 부모 컴포넌트로부터 초기값을 받아서 설정
  useEffect(() => {
    if (item.me_postalCode) setCode(item.me_postalCode);
    if (item.me_addr1) setAddr1(item.me_addr1);
    if (item.me_addr2) setAddr2(item.me_addr2);
  }, [item]);

  const completeHandler = (data) => {
    const { address, zonecode } = data;
    setCode(zonecode);
    setAddr1(address);
    change({ ...item, me_postalCode: zonecode, me_addr1: address });
  };

  const closeHandler = (state) => {
    if (state === 'FORCE_CLOSE' || state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

	const themeObj = {
		bgColor: "#fff", 			// 바탕 배경색
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
				<div className="container address-modal theme-box">
					<Button type="button" style={{cursor: 'pointer', float: 'right'}} text="닫기" click={toggleHandler}/>
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
