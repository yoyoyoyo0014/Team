import { Fragment } from "react";
import '../css/event.css';
import { Link } from "react-router-dom";

const Event = () => {
	return (
		<Fragment>
			<div className="section-title">
				<h2>이벤트</h2>
			</div>
			<ul style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr',
				gap: '2em'
			}}>{[...Array(parseInt(9))].map((n, i) => {
				return(<li className="theme-box event-item">
					<Link to={"/event/" + i}>
						<img src="https://image.aladin.co.kr/img/bn/blog/2024/04/240913_communebut_blog_640_1.jpg" alt="test" />
						<div className="event-info">
							<h3>이벤트 제목</h3>
							<p>2024.10.18 ~ 2024.10.18</p>
						</div>
					</Link>
				</li>)
			})}</ul>
		</Fragment>
	);
}

export default Event;