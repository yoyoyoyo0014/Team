import {Link} from 'react-router-dom';
import Slide from '../slide';

const EventSection = () => {
	let eventList = [
		`https://image.aladin.co.kr/img/bn/blog/2024/04/240913_communebut_blog_640_1.jpg`,
		`https://image.aladin.co.kr/img/bn/book/2024/04/m_241008_ourbook_kimyaong_p.jpg`,
		`https://image.aladin.co.kr/img/bn/book/2024/04/m_241010_daughter_p.jpg`
	];

	return (
		<section id="event">
			<div className="section-title">
				<div>
					<h2>이벤트</h2>
					<p>현재 진행 중인 이벤트</p>
				</div>
				<Link to={"/event"}>더보기</Link>
			</div>
			
			<Slide list={eventList}/>
		</section>
	)
}

export default EventSection;