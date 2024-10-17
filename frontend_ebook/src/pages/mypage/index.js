import { Fragment, useContext } from "react";
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
	return(
		<Fragment>
			<MySubMenu/>
			
			<section class="mypage-content">
				<div className="theme-box pf-section">
					<div className="pf-pic"></div>
					<div className="pf-info">
						<h2>닉네임</h2>
					</div>
				</div>
			</section>

			
		</Fragment>
	)
}

export default MypageIndex;