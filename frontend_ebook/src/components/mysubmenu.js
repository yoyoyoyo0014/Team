const MySubMenu = () => {
	return(<nav id="my-sub-menu">
		<div>
			<h3>내 정보 관리</h3>
			<ul>
				<li>내 프로필 수정</li>
				<li>개인 정보 수정</li>
			</ul>
		</div>

		<div>
			<h3>내 컬렉션</h3>
			<ul>
				<li>내 책꽂이</li>
				<li>내 뱃지</li>
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