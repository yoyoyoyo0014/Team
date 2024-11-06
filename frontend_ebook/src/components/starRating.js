import { Fragment } from "react";
import { Input } from "./form/input";

const StarRating = ({score}) => {
	return(<div className="star-rating readonly">
		{[...Array(parseInt(5))].map((n, i) => {
			return(
				<Fragment>
					<Input
						type="radio"
						cls="star"
						value={i}
						readOnly={true}
						checked={score === i + 1 ? 'checked' : ''}/>
						<label></label>
				</Fragment>
			)
		})}
	</div>)
}

export default StarRating;