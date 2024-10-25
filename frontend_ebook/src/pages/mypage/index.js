import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '../../components/form/button';
import { LoginContext } from "../../context/LoginContext";
import MySubMenu from "../../components/mysubmenu";
import "../../css/mypage.css";
import axios from "axios";
import { PageButton } from "../../components/pageButton";
import Paging from "../../components/paging";

const MypageIndex = () => {
	const user = useContext(LoginContext).user;
	const [myReview, setMyReview] = useState({
		list: [],
		pm: {}
	});
	let [page, setPage] = useState(1);

	// console.log(user.user.member.me_id);
	// if (user.member === undefined) console.log('null');
	// else {
	// 	console.log(user.member);
	// }

	const loadMyReview = (url) => {
		const options = {
			url: url + page,
			method:'post',
			header: {
				'Accept': 'application/json',
				'Content-Type': "'application/json';charset=UTP-8'"
			},
		}

		axios(options)
      .then(res => {
				console.log(res.data.reviewPm);
        setMyReview(prev => {
					return {...prev, list: res.data.reviewList, pm: res.data.reviewPm}
				});
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
        console.log(error.config);
      })
	}

	useEffect(() => {
		loadMyReview();
	}, [setMyReview])

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
						<div className="pf-nickname"><h2>닉네임</h2> <Link to="/mypage/edit/admin123"><i className="fa-solid fa-pen"></i></Link></div>
						
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
					
					<Paging pm={myReview.pm} page={page} setPage={setPage} load={loadMyReview} url={'/review/myReview/admin123/' + page} />
				</div>

				<div className="sub-section">
					<div className="section-title">
						<h2>내 도서 요청</h2>
						<Link to="/mypage/request">더보기</Link>
					</div>

					<div className="theme-box">
						<ul>
							<li><Link to="">내 도서 요청</Link></li>
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