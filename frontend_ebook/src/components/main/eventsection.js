import {Link,useParams} from 'react-router-dom';
import Slide from '../slide';
import eventLink1 from '../../images/이벤트_링크_01.png';
import eventLink2 from '../../images/이벤트_링크_02.png';
import eventLink3 from '../../images/이벤트_링크_03.png';

const EventSection = () => {
	const { co_num } = useParams();
	let eventList = [
		eventLink1,
		eventLink2,
		eventLink3
	];

	return (
		<section id="event">
			<div className="section-title">
				<div>
					<h2>이벤트</h2>
					<p>현재 진행 중인 이벤트</p>
				</div>
				<Link to={`/post/list/${co_num || 3}`}>더보기</Link>
			</div>
			
			<Slide list={eventList}/>
		</section>
	)
}

export default EventSection;