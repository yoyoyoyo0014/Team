import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const MySubMenu = () => {
	const { user } = useContext(LoginContext);
	return(<nav id="my-sub-menu">
		<div>
			<h3>{user.me_authority === 'USER' ? '내 정보' : '사업자 정보'} 관리</h3>
			<ul>
				<Link to="/edit-profile">{user.me_authority === 'USER' ? '개인 정보' : '사업장 정보'} 수정</Link>
			</ul>
		</div>

		{user.me_authority === 'USER' ?
			<div>
				<h3>내 컬렉션</h3>
				<ul>
					<li><Link to="/mypage/mybooks">내 책꽂이</Link></li>
					<li><Link to="/mypage/badges">내 뱃지</Link></li>
					<li>내 리뷰</li>
				</ul>
			</div> :
			<div>
				<h3>도서 출판</h3>
				<ul>
					<li><Link to="/mycompany/bookList">출판 도서 목록</Link></li>
					<li><Link to="/mycompany/bookInsert">도서 출판 신청</Link></li>
					<li><Link to="/mycompany/bookRegisterList">도서 신청 현황</Link></li>
				</ul>
			</div>
		}

		<div>
			<h3>문의</h3>
			<ul>
				{user.me_authority === 'USER' ? <li>도서 요청</li> : ''}
				<li>자주 묻는 질문</li>
				<li>1:1 QnA</li>
			</ul>
		</div>
	</nav>)
}

export default MySubMenu;