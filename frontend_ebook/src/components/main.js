import '../css/main.css';
import GenreNavBar from './genrenavbar';
import TodayBook from './main/todaybook';
import RequestBook from './main/requestbook';
import BestSellers from './main/bestsellers';
import NewBooks from './main/newbooks';

const Main = ({section, genreList}) => {
	const SectionTitle = (section) => {
		if(section.section === 'bestsellers') {
			return(
				<div className="section-title">
					<h2>베스트셀러</h2>
					<p>최근 1주동안 가장 많이 구매한 도서 순위</p>
				</div>
			)
		} else {
			return(
				<div className="section-title">
					<h2>신상 도서</h2>
					<p>새로 나온 도서</p>
				</div>
			)
		}
	}

	return(
		<section id="main-section">
			<div id="top-section" className="section">
				<SectionTitle section={section}/>
				
				<div className="top-section-content">
					<GenreNavBar genreList={genreList}/>
					{section === 'bestsellers' ? <BestSellers/> : <NewBooks/>}
				</div>
			</div>
			
			<RequestBook/>
			<TodayBook/>
		</section>
	)
}

export default Main;