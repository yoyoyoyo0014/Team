import Input from "./input";
import Button from "./button";

function Header(){
	return(
		<header>
			<h1 id="logo">Book<br/>Garden</h1>
				
			<div className="search-box">
				<form name="search">
					<Input type="text" placeholder={"검색어를 입력해주세요"} cls={"full frm-input"} />
					<Button text={"검색"} cls={"ico btn search"}/>
				</form>
			</div>

			<div className="menu">
				<a className="cate-toggle-btn btn btn-basic">
					<span className="hidden">전체 메뉴</span>
					<i className="fa-solid fa-bars"></i>
				</a>
				
				<div className="gnb">
					<div className="site-menu">
						<ul>
							<li>베스트셀러</li>
							<li>신상 도서</li>
							<li>이벤트</li>
							<li>할인 중인 도서</li>
							<li>작가와의 만남</li>
						</ul>
					</div>

					<div className="user-menu">
						<ul>
							<li>로그인</li>
							<li>회원가입</li>
						</ul>
					</div>
				</div>

				<a id="my-books" className="btn btn-point">
					<span className="hidden">내 책꽂이</span>
					<i className="fa-solid fa-book"></i>
				</a>
			</div>
		</header>
	)
}

export default Header;