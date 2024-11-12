import {Link,useParams} from 'react-router-dom';
import Slide from '../slide';
import eventLink1 from '../../images/event1.jpg';
import eventLink2 from '../../images/event2.jpg';
import eventLink3 from '../../images/event3.jpg';

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