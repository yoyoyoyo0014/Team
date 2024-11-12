import '../css/main.css';
import GenreNavBar from './genrenavbar';
import TodayBook from './main/todaybook';
import BestSellers from './main/bestsellers';
import NewBooks from './main/newbooks';
import EventSection from './main/eventsection';
import { GenreContext } from '../context/GenreContext';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate  } from 'react-router-dom';
const Main = ({section}) => {
	const {book} = useContext(GenreContext);
	let [books, setBooks] = useState([{}]);
	const [hover, setHover] = useState(null);
	let [list, setList] = useState([]);
	let [pm, setPm] = useState({});
	const {co_num} = useParams();
	const navigate = useNavigate();

	const location = useLocation();

	useEffect(() => {
    fetch('/post/list/1')
      .then((res) => res.json())
      .then(res=>{
				if (res.list) {
					console.log(res.list)
					var tmp = res.list.map((item) => {
						var date = new Date(item.po_date).toLocaleDateString();
						item = { ...item, date };
						return item;
					});
					setList(tmp);
			}
			setPm(res.pm || {});
      }).catch(e=>console.log(e))
  }, [])

	 // list가 업데이트될 때마다 console.log(list)로 확인
	 useEffect(() => {
		console.log('Updated list:', list);
		}, [list]);

	const handleMouseEnter = (index) => {
		setHover(index);
	};

	const handleMouseLeave = () => {
		setHover(null);
	};

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
			<div id="notice" style={{ margin: '2em 0 4em' }}>
				<div className="section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
					<h2>공지사항</h2>
					<Link to={`/post/list/${co_num || 1}`} className="notice-link">더보기</Link>
				</div>

				<ul>
				{list && list.length > 0 ? (
					list.slice(0, 3).map((item, index) => (
						<li key={item.po_num || index}>
							<Link to={`/post/detail/${co_num || 1}/${item.po_num}`}>
								<strong>{item.po_title}</strong>
								<span>{item.date}</span>
							</Link>
						</li>
					))
				) : (
					<li><p>공지사항이 없습니다.</p></li>
				)}
				</ul>
			</div>
			
			<TodayBook book={book}/>
		</div>
	)
}

export default Main;
