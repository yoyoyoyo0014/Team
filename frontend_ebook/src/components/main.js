import '../css/main.css';
import GenreNavBar from './genrenavbar';

const Main = ({section}) => {
	return(
		<section className="top-section">
			<GenreNavBar/>
			<div id="books" className="theme-box">
				section: {section}
			</div>
		</section>
	)
}

export default Main;