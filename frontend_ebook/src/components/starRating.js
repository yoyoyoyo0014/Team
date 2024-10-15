import { Input } from "./form/input";

const StarRating = ({score}) => {
	return(<div className="star-rating">
		{[...Array(parseInt(5))].map((n, i) => {
			return(
				<div className={score >= i + 1 ? 'checked' : ''}>
					<Input
						type="radio"
						cls="star"
						value={5 - i}
						name="rating"
						readOnly={true}
						checked={score === i + 1 ? 'checked' : ''}/>
						<label>{i+1}</label>
				</div>
			)
		})}
	</div>)
}

export default StarRating;