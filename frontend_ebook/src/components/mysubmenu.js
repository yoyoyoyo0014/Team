import { Link } from "react-router-dom";

const MySubMenu = () => {

	return(<nav id="my-sub-menu">
		<div>
			<h3>내 정보 관리</h3>
			<ul>
				<li>
					<Link to="/edit-profile">개인 정보 수정</Link>
				</li>
			</ul>
		</div>

		<div>
			<h3>내 컬렉션</h3>
			<ul>
				<li>
					<Link to="/mypage/mybooks">내 책꽂이</Link>
				</li>
				<li>
					<Link to="/mypage/badges">내 뱃지</Link>
				</li>
				<li>내 리뷰</li>
			</ul>
		</div>

		<div>
			<h3>문의</h3>
			<ul>
				<li>도서 요청</li>
				<li>자주 묻는 질문</li>
				<li>1:1 QnA</li>
			</ul>
		</div>
	</nav>)
}

export default MySubMenu;