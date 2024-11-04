import { Fragment, useContext, useEffect, useState } from "react";
import Button from '../../components/form/button';
import { LoginContext } from "../../context/LoginContext";
import MySubMenu from "../../components/mysubmenu";
import "../../css/mypage.css";

const MyCompanyIndex = () => {
	const { user } = useContext(LoginContext);
	const [nickname, setNickname] = useState(''); // 닉네임 상태 추가

	useEffect(() => {
		const fetchNickname = async () => {
			try {
				const response = await fetch(`/ebook/member/nickname/${user?.me_id}`);
				const data = await response.json();
				setNickname(data.nickname || "닉네임없음");
			} catch (error) {
				console.error("닉네임 가져오기 오류:", error);
				setNickname("닉네임없음");  // 오류 발생 시 기본값 설정
			}
		};
	
		if (user?.me_id) {
			fetchNickname();  // 사용자 ID가 있을 때 닉네임을 가져옴
		}
	}, [user]);

	const openFileUploader = () => {
		const event = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true
		})
		document.querySelector('#me_pic').dispatchEvent(event);
	}
	return(
		<Fragment>
			<MySubMenu/>
			
			<section className="mypage-content">
				<div className="theme-box pf-section">
					<div className="pf-pic">
						<input type="file" name="me_pic" id="me_pic" style={{display: 'none'}} />
						<Button text={<i className="fa-solid fa-camera"></i>} click={openFileUploader} cls="file-upload-btn"/>
					</div>
					<div className="pf-info">
						{/* 닉네임 출력 */}
						<div className="pf-nickname">
							<h2 style={{ marginRight: '5px' }}>{nickname || '닉네임 없음'}</h2>
							<span style={{ fontSize: '1.2em' }}> 님 </span>
						</div>
						
						<div className="pf-desc">
							<p><strong>승인 진행 도서</strong> 0</p>
							<p><strong>판매 중인 도서</strong> 0</p>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default MyCompanyIndex;