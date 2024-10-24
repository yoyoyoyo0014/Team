import { Fragment } from 'react';
import MySubMenu from "../../components/mysubmenu";
import '../../css/mypage.css';
import '../../css/mybadges.css';

const MyBadges = () => {
	return (
		<Fragment>
			<MySubMenu/>
			<section className="mypage-content">
				<h2 className="section-title">내 뱃지</h2>
				<div className="theme-box">	
					<div className="badge-container">
						{[...Array(parseInt(16))].map((n, i) => {
							return(<div className="badge-item">
								<div className="badge">
									<i className="fa-solid fa-ribbon"></i>
								</div>
								<div className="badge-info txt-center">
									<strong>뱃지 이름</strong>
									<p>달성 조건</p>
								</div>
							</div>)
						})}
					</div>
				</div>
			</section>
		</Fragment>
	);
}

export default MyBadges;