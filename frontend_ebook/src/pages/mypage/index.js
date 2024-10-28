import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '../../components/form/button';
import { LoginContext } from "../../context/LoginContext";
import MySubMenu from "../../components/mysubmenu";
import "../../css/mypage.css";

const MypageIndex = () => {
	const { user } = useContext(LoginContext);
	const [nickname, setNickname] = useState(''); // 닉네임 상태 추가

	console.log("User 객체:", user);
	console.log("Member ID:", user?.me_id);

	// console.log(user.user.member.me_id);
	// if (user.member === undefined) console.log('null');
	// else {
	// 	console.log(user.member);
	// }

	const fetchNickname = async () => {
		try {
			const response = await fetch(`/ebook/member/nickname/${user?.me_id}`);
			const data = await response.json();
			setNickname(data.nickname || "닉네임없음");
		} catch (error) {
			console.error("닉네임 가져오기 오류:", error);
			setNickname("닉네임없음");
		}
	};

	useEffect(() => {
    if (user?.me_id) {
      fetchNickname(); // 사용자 ID가 있을 때 닉네임을 가져옴
    }
  }, [user, fetchNickname]);

  // 부모 창에서 호출될 닉네임 업데이트 함수
  window.setNickname = (newNickname) => {
    setNickname(newNickname);
  };

	// 팝업 창 열기
	const openNicknamePopup = () => {
		if (!user?.me_id) {
			alert("사용자 정보를 불러오지 못했습니다.");
			return;
		}
 
		// 팝업 창 열기
		const popup = window.open(
			`/nickname-popup.html?me_id=${user.me_id}`,
			"닉네임 수정",
			"width=600,height=150,resizable=no,scrollbars=no,status=no"
		);
 
		// 팝업 창이 로드된 후 실행되는 이벤트
		popup.onload = () => {
			console.log("팝업 창 로드 완료");
 
			// 여기서 팝업에 데이터를 보내거나 추가 작업을 수행할 수 있습니다.
			popup.postMessage({ type: 'INIT_DATA', data: { me_id: user.me_id } }, '*');
		};
 
		// 팝업 창이 닫혔는지 주기적으로 확인
		const popupCheckInterval = setInterval(() => {
			if (popup.closed) {
				clearInterval(popupCheckInterval);
				console.log("팝업 창이 닫혔습니다.");
				fetchNickname();
			}
		}, 500);
	};
 

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
							<i className="fa-solid fa-pen" onClick={openNicknamePopup}></i>
						</div>
						
						<div className="pf-desc">
							<p><strong>내 구매</strong> 0</p>
							<p><strong>내 리뷰</strong> 0</p>
							<p><strong>내 뱃지</strong> 0</p>
							<p><strong>내 도서 요청</strong> 0</p>
						</div>
					</div>
				</div>

				<div className="sub-section">
					<div className="section-title">
						<h2>내 리뷰</h2>
						<Link to="/mypage/request">더보기</Link>
					</div>

					<div className="theme-box">
						<ul>
							<li>내 리뷰</li>
							<li>내 리뷰</li>
							<li>내 리뷰</li>
							<li>내 리뷰</li>
							<li>내 리뷰</li>
						</ul>
					</div>
				</div>

				<div className="sub-section">
					<div className="section-title">
						<h2>내 도서 요청</h2>
						<Link to="/mypage/request">더보기</Link>
					</div>

					<div className="theme-box">
						<ul>
							<li>내 도서 요청</li>
							<li>내 도서 요청</li>
							<li>내 도서 요청</li>
							<li>내 도서 요청</li>
							<li>내 도서 요청</li>
						</ul>
					</div>
				</div>
			</section>

			
		</Fragment>
	)
}

export default MypageIndex;