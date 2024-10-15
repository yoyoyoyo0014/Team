import '../css/main.css';
import GenreNavBar from './genrenavbar';
import TodayBook from './main/todaybook';
import BestSellers from './main/bestsellers';
import NewBooks from './main/newbooks';
import EventSection from './main/eventsection';
import { GenreContext } from '../context/GenreContext';
import { useContext } from 'react';

const Main = ({section}) => {
	const {book} = useContext(GenreContext);

	const SectionTitle = (section) => {
		if(section.section === 'newBooks') {
			return(
				<div className="section-title">
					<h2>신상 도서</h2>
					<p>새로 나온 도서</p>
				</div>
			)
		} else {
			return(
				<div className="section-title">
					<h2>베스트셀러</h2>
					<p>최근 1주동안 가장 많이 구매한 도서 순위</p>
				</div>
			)
		}
	}

	return(
		<div id="main-section">
			<section id="top-section">
				<SectionTitle section={section}/>
				
				<div className="top-section-content">
					<GenreNavBar/>
					{section === 'newBooks' ? <NewBooks/> : <BestSellers/>}
				</div>
			</section>
			
			<EventSection/>

			<TodayBook book={book}/>
		</div>
	)
}

export default Main;