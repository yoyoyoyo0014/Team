import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { GenreContext } from "../context/GenreContext";
import { Input } from "./form/input";
import Button from "./form/button";

const Header = ({setSection}) => {
	const navigate = useNavigate();
	const { isLoggedIn, setIsLoggedIn, setUser, user } = useContext(LoginContext);
	const { genreList } = useContext(GenreContext);

	let [country, setCountry] = useState('');
	let [genre, setGenre] = useState('');
	let [category, setCategory] = useState('');
	let [keyword, setKeyword] = useState('');


	const showBooks = (sectionName) => {
		setSection(sectionName);
	}

	const showGenre = () =>{
		const wrapper = document.querySelector('.gnb-genre-wrapper');
		wrapper.classList.toggle('show');
	}

	 // 로그아웃 핸들러
	 const handleLogout = () => {
		setIsLoggedIn(false);  // 로그인 상태를 false로 업데이트
		localStorage.removeItem('loginToken');  // localStorage에서 토큰 삭제
		sessionStorage.removeItem('loginToken');  // sessionStorage에서도 삭제
		localStorage.removeItem("kakao_access_token"); // 카카오 토큰 삭제 (예시)

		 // 카카오 로그아웃 처리 (API 호출)
		 const CLIENT_ID = process.env.REACT_APP_KAKAO_APP_KEY; // 실제 클라이언트 ID로 변경
		 const LOGOUT_REDIRECT_URI = "http://localhost:3000/login"; // 로그아웃 후 리디렉션할 페이지
 
		 const logoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
		 window.location.href = logoutUrl; // 카카오 로그아웃 페이지로 리디렉션
	};

	function clickSearchBtn(){
		navigate("/searchBook/"+country+"/"+genre+"/"+category+"/"+0+"/SearchWord="+keyword);
	}

	const UserMenu = ({isLoggedIn}) => {
		if(isLoggedIn !== true){
			return(<ul>
				<li><Link to="/login">로그인</Link></li>
				<li><Link to="/join">회원가입</Link></li>
			</ul>)
		} else {
			return(<ul>
				<li><Link to={"/cart/" + user?.me_id}>장바구니</Link></li>
				<li><Link to="/mypage">마이페이지</Link></li>
				<li><Link to="javascript: void(0);" onClick={handleLogout}>로그아웃</Link></li>
			</ul>)
		}
	}
	return(
		<header>
			<Link to="/"><h1 id="logo">Book<br/>Garden</h1></Link>
				
			<div className="search-box">
					<form name="search">
						<Input  type="text" placeholder={"검색어를 입력해주세요"} cls={"full frm-input"} change={e=>setKeyword(e)} value={keyword}/>
						<Button click={e=>clickSearchBtn()} text={"검색"} cls={"ico btn search"}/>
					</form>
				</div>

			<div className="menu">
				<button type="button" className="cate-toggle-btn btn btn-basic" onClick={showGenre}>
					<span className="hidden">전체 메뉴</span>
					<i className="fa-solid fa-bars"></i>
				</button>
					
				<div className="gnb">
					<div className="site-menu">
						<ul>
							<li><Link to="/">베스트셀러</Link></li>
							<li><Link to="/newbooks">신상 도서</Link></li>
							<li><Link to="/forsales">할인 중인 도서</Link></li>
							<li><Link to="/event">이벤트</Link></li>
							<li><Link to="/request">도서 요청</Link></li>
						</ul>
					</div>

					<div className="user-menu">
						<UserMenu isLoggedIn={isLoggedIn}/>
					</div>

					<div className="theme-box gnb-genre-wrapper">
						<div>
							<strong>나라</strong>
							<ul>
								<li>국내도서</li>
								<li>해외도서</li>
							</ul>
						</div>
						{
						genreList && genreList.map((genre, i) => {
							return(
								<div>
									<ul>
										{
											genre.length !== undefined && genre.map(secondGenre => {
												return(<li>{secondGenre.ge_name}</li>)
											})
										}
									</ul>
									</div>
								)
							}
						)}
					</div>

					<Link to="/mypage/mybooks" id="my-books" className="btn btn-point">
						<span className="hidden">내 책꽂이</span>
						<i className="fa-solid fa-book"></i>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header;