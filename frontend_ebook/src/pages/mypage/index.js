import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '../../components/form/button';
import { LoginContext } from "../../context/LoginContext";
import MySubMenu from "../../components/mysubmenu";
import "../../css/mypage.css";
import axios from "axios";
import MakePage, { PageButtonV2 } from "../../components/pageButton";
import { AchievenentEvent } from "../../components/achievenent/achievenentEvent";

const MypageIndex = () => {
	const lookPageContentsCount = 2;
	const { user } = useContext(LoginContext);
	const [nickname, setNickname] = useState(''); // 닉네임 상태 추가

	 // `window` 객체에 `setNickname` 등록
	 useEffect(() => {
    window.setNickname = (newNickname) => {
      setNickname(newNickname);
    };

    // 컴포넌트가 언마운트될 때 `window`에서 제거
    return () => {
      delete window.setNickname;
    };
  }, []);

	const [myReview, setMyReview] = useState({
		list: [],
		pm: {}
	});

	const [myRequest, setMyRequest] = useState({
		list: [],
		pm: {}
	});

	let [page, setPage] = useState({
		contentsCount : 0,
    currentPage : 1,
    startPage : 0,
    endPage : 0,
    prev : false,
    next : false,
    pageList : []
	});

	let [requestPage, setRequestPage] = useState({
		contentsCount : 0,
    currentPage : 1,
    startPage : 0,
    endPage : 0,
    prev : false,
    next : false,
    pageList : []
	});

	const loadMyList = (url) => {
		const options = {
			url: url + page.currentPage,
			method:'get',
			header: {
				'Accept': 'application/json',
				'Content-Type': "'application/json';charset=UTP-8'"
			},
		}
		axios(options)
      .then(res => {
				if (url === '/review/selectMyReview/' + user?.me_id + '/') {
					let tmp = MakePage(res.data.reviewPm.totalCount,page.currentPage,lookPageContentsCount);
					setPage(tmp);
					setMyReview(prev => {
						return {...prev, list: res.data.reviewList, pm: res.data.reviewPm}
					});
				} else {
					let tmp = MakePage(res.data.pm.totalCount,page.currentPage,lookPageContentsCount);
					setRequestPage(tmp);
					setMyRequest(prev => {
						return {...prev, list: res.data.list, pm: res.data.pm}
					});
				}
      })
      .catch((error) => {
        console.log(error);
      })
	}

	function pageChange(num, table){
		if(table === '/review/selectMyReview/' + user?.me_id + '/') {
			page.currentPage = num;
			setPage(page);
		} else {
			requestPage.contentsCount = num
			setRequestPage(requestPage);
		}

		loadMyList(table + user?.me_id + '/');
	}

	useEffect(() => {
		loadMyList('/review/selectMyReview/' + user?.me_id + '/');
	}, [setMyReview])

	useEffect(() => {
		loadMyList('/post/list/2/' + user?.me_id + '/');
	}, [setMyRequest])

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
			fetchNickname();  // 사용자 ID가 있을 때 닉네임을 가져옴
		}
	}, [user]);

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
							<p><strong>내 리뷰</strong> {myReview.pm.totalCount}</p>
							<p><strong>내 뱃지</strong> 0</p>
							<p><strong>내 도서 요청</strong> 0</p>
						</div>
					</div>
				</div>

				<div className="sub-section">
					<div className="section-title">
						<h2>내 리뷰</h2>
					</div>

					<div className="theme-box">
						<ul>
							{myReview.list.length === 0 ? <li className="no-data txt-center">작성된 리뷰가 없습니다</li> :
							myReview.list.map((item, index) => (
								<li key={index}>
									<p>{item.re_content}</p>
									{(() => {
										const date = new Date(item.re_date);
										const y = date.getFullYear();
										const m = date.getMonth();
										const d = date.getDate();
										return (<span className="review-date">{y}.{m}.{d}</span>);
									})()}
								</li>
							))}
						</ul>
					</div>
					
					<PageButtonV2 getPage={page} pageEvent={pageChange} url={'/review/selectMyReview/'}/>
				</div>

				<div className="sub-section">
					<div className="section-title">
						<h2>내 도서 요청</h2>
					</div>

					<div className="theme-box">
						<ul>
						{myRequest.list.length === 0 ? <li className="no-data txt-center">요청한 내역이 없습니다</li> :
							myRequest.list.map((item, index) => (
								<li key={index}>
									<p>{item.po_title}</p>
									{(() => {
										const date = new Date(item.po_date);
										const y = date.getFullYear();
										const m = date.getMonth();
										const d = date.getDate();
										return (<span className="post-date">{y}.{m}.{d}</span>);
									})()}
								</li>
							))}
						</ul>
					</div>

					<PageButtonV2 getPage={page} pageEvent={pageChange} url={'/post/list/2/'}/>
				</div>
			</section>

			<AchievenentEvent meId={user?.me_id}/>

		</Fragment>
	)
}

export default MypageIndex;