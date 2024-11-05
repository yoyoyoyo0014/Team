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
    fetch('/main')
      .then((res) => res.json())
      .then(res=>{
				if (res.postList) {
					var tmp = res.postList.map((item) => {
						var date = new Date(item.po_date).toLocaleDateString();
						item = { ...item, date };
						return item;
					});
					setList(tmp);
			}
			setPm(res.pm || {});
      }).catch(e=>console.log(e))
  }, [])

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
			<div id="notice" style={{ marginTop: '35px'}}>
				<div className="section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
					<h2>공지사항</h2>
					<Link to={`/post/list/${co_num || 1}`} className="notice-link" style={{ float: 'right', textDecoration: hover !== null ? 'underline' : 'none' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
						<strong>더보기 +</strong>
					</Link>
				</div>

				{list && list.length > 0 ? (
					<table className="article-table" style={{textAlign: 'center', width: '100%', borderCollapse: 'collapse'}}>
							<thead style={{color: 'gray', borderBottom: '1px solid gray'}}>
								<tr>
										<th style={{ width: '80%' }}>제목</th>
										<th style={{ width: '15%' }}>작성일</th>
								</tr>
							</thead>
							<tbody>
								{list.slice(0,3).map((item, index) => (
										<tr key={item.po_num || index} style={{height: '75px', borderBottom: '1px solid lightgray'}}>
											<td style={{ textAlign: 'left', cursor: 'pointer', textDecoration: hover === index ? 'underline' : 'none' }} onClick={() => navigate(`/post/detail/${co_num || 1}/${item.po_num}`)}
											onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
												{item.po_title}
											</td>
											<td>{item.date}</td>
										</tr>
								))}
							</tbody>
					</table>
				) : (
					<p>공지사항이 없습니다.</p>
				)}
			</div>
			<TodayBook book={book}/>
		</div>
	)
}

export default Main;
