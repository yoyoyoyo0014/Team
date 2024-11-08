import { Link } from "react-router-dom";
import '../css/join.css';
import { Fragment } from "react";

const JoinSelect = () => {
	return(<Fragment>
		<h2 className="page-title txt-center">회원 유형 선택</h2>
		<div className="member-select">
			<div className="member-type">
				<i className="fa-solid fa-user"></i>
				<h3>일반 회원 가입</h3>
				<p>개인 사용자</p>
				<Link to="/join/normal" className="btn btn-point">가입하기</Link>
			</div>

			<div className="member-type">
				<i class="fa-solid fa-building"></i>
				<h3>사업자 회원 가입</h3>
				<p>사업자 및 기타 단체</p>
				<Link to="/join/company" className="btn btn-point">가입하기</Link>
			</div>
		</div>
	</Fragment>)
}

export default JoinSelect;