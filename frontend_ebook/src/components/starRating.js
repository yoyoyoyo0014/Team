import { InputItem } from "./form/input";

const StarRating = ({score}) => {
	return(<div className="star-rating">
		{[...Array(parseInt(5))].map((n, i) => {
			return(
				<InputItem
					type="radio"
					cls="star"
					value={i + 1}
					name="rating"
					readOnly={true}
					label={i + 1}
					checked={score === i + 1 ? 'checked' : ''}/>
			)
		})}
	</div>)
}

export default StarRating;