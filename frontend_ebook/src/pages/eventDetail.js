import { Fragment } from "react";
import '../css/event.css';
import { useParams } from "react-router-dom";

const EventDetail = () => {
	const { ev_id } = useParams();
	console.log(ev_id);
	return (
		<Fragment>
			상세정보
		</Fragment>
	);
}

export default EventDetail;