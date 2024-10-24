import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Button from '../../components/form/button';
import { LoginContext } from "../../context/LoginContext";
import MySubMenu from "../../components/mysubmenu";
import "../../css/mypage.css";

const MypageIndex = () => {
	const user = useContext(LoginContext).user;

	// console.log(user.user.member.me_id);
	// if (user.member === undefined) console.log('null');
	// else {
	// 	console.log(user.member);
	// }
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