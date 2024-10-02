import { Link } from "react-router-dom";
import { Input } from "./form/input";
import Button from "./form/button";

const Header = () => {
	return(
		<header>
			<Link to="/"><h1 id="logo">Book<br/>Garden</h1></Link>
				
			<div className="search-box">
				<form name="search">
					<Input type="text" placeholder={"검색어를 입력해주세요"} cls={"full frm-input"} />
					<Button text={"검색"} cls={"ico btn search"}/>
				</form>
			</div>

			<div className="menu">
				<button type="button" className="cate-toggle-btn btn btn-basic">
					<span className="hidden">전체 메뉴</span>
					<i className="fa-solid fa-bars"></i>
				</button>
				
				<div className="gnb">
					<div className="site-menu">
						<ul>
							<li><Link to="/bestsellers">베스트셀러</Link></li>
							<li><Link to="/newbooks">신상 도서</Link></li>
							<li><Link to="/forsales">할인 중인 도서</Link></li>
							<li><Link to="/event">이벤트</Link></li>
							<li><Link to="/meeting">작가와의 만남</Link></li>
						</ul>
					</div>

					<div className="user-menu">
						<ul>
							<li><Link to="/login">로그인</Link></li>
							<li><Link to="/join">회원가입</Link></li>
						</ul>

						{/* <ul>
							<li><Link to="/cart">장바구니</Link></li>
							<li><Link to="/mypage">마이페이지</Link></li>
							<li><Link to="/logout">로그아웃</Link></li>
						</ul> */}
					</div>
				</div>

				<Link to="/mypage/mybooks" id="my-books" className="btn btn-point">
					<span className="hidden">내 책꽂이</span>
					<i className="fa-solid fa-book"></i>
				</Link>
			</div>
		</header>
	)
}

export default Header;