import { Fragment, useContext, useEffect, useState } from 'react';
import MySubMenu from "../../components/mysubmenu";
import '../../css/mybadges.css';
import axios from 'axios';
import { LoginContext } from '../../context/LoginContext';

const MyBadges = () => {
	const { user } = useContext(LoginContext);
	let [myAchList, setMyAchList] = useState([]);
	useEffect(() => {
		axios({
			url: '/ach/getMyAchs/' + user?.me_id,
			method: 'get'
		}).then(res => {
			setMyAchList(res.data.myAchList);
		}).catch(error => {
			console.log(error);
		})
	}, []);

	return (
		<Fragment>
			<MySubMenu/>
			<section className="mypage-content">
				<h2 className="section-title">내 뱃지</h2>
				<div className="theme-box">	
					<div className="badge-container">
						{myAchList && myAchList.map((item, i) => {
							return(<div className="badge-item">
								<div className="badge">
									<i className={"fa-solid " + item.ac_icon}></i>
								</div>
								<div className="badge-info txt-center">
									<strong>{item.ac_title}</strong>
									<p>{item.ac_info}</p>
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