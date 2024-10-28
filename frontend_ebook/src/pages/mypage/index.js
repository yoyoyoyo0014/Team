import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '../../components/form/button';
import { LoginContext } from "../../context/LoginContext";
import MySubMenu from "../../components/mysubmenu";
import "../../css/mypage.css";
import axios from "axios";
import MakePage, { PageButtonV2 } from "../../components/pageButton";

const MypageIndex = () => {
	const lookPageContentsCount = 2;
	const { user } = useContext(LoginContext);
	const [nickname, setNickname] = useState(''); // 닉네임 상태 추가

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
					console.log('review');
				} else {
					let tmp = MakePage(res.data.pm.totalCount,page.currentPage,lookPageContentsCount);
					console.log('request');
					setRequestPage(tmp);
					setMyRequest(prev => {
						return {...prev, list: res.data.list, pm: res.data.pm}
					});
				}
      })
      .catch((error) => {
        if (error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
          console.log(error.response.status);
        } else if (error.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않았습니다. 
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
          // node.js에서는 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
          console.log('Error', error.message);
        }
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

	useEffect(() => {
		const fetchNickname = async () => {
			try {
				const response = await fetch(`/ebook/member/nickname/${user?.me_id}`);
				
				const data = await response.json();
				if (data.nickname) {
					setNickname(data.nickname);  // 서버로부터 받은 닉네임 설정
				} else {
					setNickname("닉네임없음");  // 닉네임이 없을 경우 기본값 설정
				}
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
							<Link to={`/mypage/edit/${user?.member?.me_id || ''}`}>
								<i className="fa-solid fa-pen"></i>
							</Link>
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
		</Fragment>
	)
}

export default MypageIndex;