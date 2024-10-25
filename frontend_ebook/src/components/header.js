<<<<<<< HEAD
import { Link } from "react-router-dom";
import { Input } from "./form/input";
import Button from "./form/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Header = ({selectSection, genreList}) => {
	let [keyword, setKeyword] = useState('');
	let [section, setSection] = useState('');

	const navigate = useNavigate();
  let [country,setCountry] = useState("all");
  let [genre,setGenre] = useState(0);
  let [category,setCategory] = useState('popularity');

	const showBooks = (sectionName) => {
		selectSection(sectionName);
		//header => app로 sectionname 전달(callback function app에서 생성) 완
		//callback function을 자식 컴포넌트에 props로 전달 완
		//자식 컴포넌트에서 해당 callback function을 사용
		axios.get(`./compontents/main/${sectionName}`)
		.then((data) => {
			console.log('success');
		})
		.catch(() => {
			console.log('fail3');
		})
	}

	const showGenre = () =>{
		const wrapper = document.querySelector('.gnb-genre-wrapper');

		wrapper.classList.toggle('show');
	}
	function clickSearchBtn(){
	 navigate("/searchBook/"+country+"/"+genre+"/"+category+"/"+0+"/bookSearch="+keyword);
	}

	return(
		<header>
			<div className="fix-layout">
				<Link to="/"><h1 id="logo">Book<br/>Garden</h1></Link>
					
				<div className="search-box">
=======
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
		navigate('/logout');
		alert('로그아웃 되었습니다');
    setIsLoggedIn(false);  // 로그인 상태를 false로 업데이트
		setUser(null);
		localStorage.removeItem('user');
    localStorage.removeItem('loginToken');  // localStorage에서 토큰 삭제
		navigate('/');
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
				<li><Link to={"/cart/admin123"}>장바구니</Link></li>
				<li><Link to="/mypage">마이페이지</Link></li>
				<li><Link to="javascript: void(0);" onClick={handleLogout}>로그아웃</Link></li>
			</ul>)
		}
	}
	return(
		<header>
			<Link to="/"><h1 id="logo">Book<br/>Garden</h1></Link>
				
			<div className="search-box">
>>>>>>> KCL
					<form name="search">
						<Input  type="text" placeholder={"검색어를 입력해주세요"} cls={"full frm-input"} change={e=>setKeyword(e)} value={keyword}/>
						<Button click={e=>clickSearchBtn()} text={"검색"} cls={"ico btn search"}/>
					</form>
				</div>
<<<<<<< HEAD

				<div className="menu">
					<button type="button" className="cate-toggle-btn btn btn-basic" onClick={showGenre}>
						<span className="hidden">전체 메뉴</span>
						<i className="fa-solid fa-bars"></i>
					</button>
					
					<div className="gnb">
						<div className="site-menu">
							<ul>
								<li onClick={()=>showBooks('bestsellers')}>베스트셀러</li>
								<li onClick={()=>showBooks('newbooks')}>신상 도서</li>
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
=======

			<div className="menu">
				<button type="button" className="cate-toggle-btn btn btn-basic" onClick={showGenre}>
					<span className="hidden">전체 메뉴</span>
					<i className="fa-solid fa-bars"></i>
				</button>
					
				<div className="gnb">
					<div className="site-menu">
						<ul>
							<li onClick={()=>{
								navigate('/');
								showBooks('bestSellers');
							}}>베스트셀러</li>
							<li onClick={()=>{
								navigate('/');
								showBooks('newBooks');
							}}>신상 도서</li>
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
>>>>>>> KCL
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