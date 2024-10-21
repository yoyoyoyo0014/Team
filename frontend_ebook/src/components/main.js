import '../css/main.css';
import Button from './form/button';
import GenreNavBar from './genrenavbar';
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate  } from 'react-router-dom';

const Main = ({section, genreList, addPost}) => {
	let [books, setBooks] = useState([{}]);
	const [hover, setHover] = useState(null);
	let [list, setList] = useState([]);
	let [pm, setPm] = useState({});
	const {co_num} = useParams();
	const navigate = useNavigate();

	const location = useLocation();
	let post = location.state;
	if(post != null){
		addPost(post);
		location.state = null;
	}

	useEffect(() => {
    fetch('/main')
      .then((res) => res.json())
      .then(res=>{
				if (res.postList) {
					var tmp = res.postList.map((item, index) => {
						var date = new Date(item.po_date).toLocaleDateString();
						const no = res.pm ? res.pm.totalCount - (res.pm.cri.page - 1) * res.pm.cri.perPageNum - index : res.postList.length - index;
						item = { ...item, date, no };
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

	return(
		<section id="main-section">
			<div id="top-section" className="section">
				<div className="section-title">
					<h2>베스트셀러</h2>
					<p>최근 1주동안 가장 많이 구매한 도서 순위</p>
				</div>
				
				<div className="top-section-content">
					<GenreNavBar genreList={genreList}/>
					<div id="books" className="theme-box">
						section: {section}
					</div>
				</div>
			</div>
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
			

			<div id="today-book">
				
				<div className="theme-box" style={{marginTop: '30px'}}>
					<h2>오늘의 책</h2>
					
					<div className="book-info">
						<div className="book-img">
							<img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt="자신만만한 음치 거북이들"/>
						</div>

						<div className="book-desc">
							<div className="book-title">
								<p className="publisher"><strong>북스그라운드</strong></p>
								<h3>자신만만한 음치 거북이들</h3>
								<p className="writer">아구스틴 산체스 아길라르 지음 | 이은경 그림 | 김정하 옮김</p>
							</div>
							<div className="book-content">
								<p>
								한때 세계적인 성악가로 이름을 날렸으나 한 번의 실수로 추락해버린 닭 '카실도'. 어느 날, 집세를 내지 못해 쫓겨날 위기에 처한 그는 거북이 합창단 '원더풀'의 노래 선생님 자리를 제안받는다. 제자를 가르칠 수 있는 일자리를 얻어 한껏 기대에 부푼 카실도. 하지만, 그 앞에 등장한 이들은 타고난 음치의 거북이들이다. 노래 경연 대회에서 1등을 하겠다는 해맑은 거북이들과 그런 제자들 때문에 골치 아픈 카실도의 우당탕탕 이야기가 펼쳐진다.<br/><br/>
								스페인의 권위 있는 문학상인 '에데베 문학상'은 당해 스페인어로 쓰인 문학 작품 가운데 가장 뛰어난 작품에 수여된다. 이 책은 심사 위원 만장일치로 2023년 수상작에 선정되었다. 성악가 닭과 음치 거북이들이 삐걱대면서도 서로에게 조금씩 스며들어가는 과정이 유쾌하게 담겨 있다. 결과보다 배움 자체를 즐기는 낙천적인 거북이들과 함께하는 시간 안에서 과거의 상처를 서서히 극복해 나가는 주인공의 성장기도 돋보인다. 희극과 비극이 교차하며 웃음과 눈물을 선사하다가 결국에는 한 사람을 다시 일으켜 세우는 감동을 안긴다.
								</p>
								<div className="blind">
									<p>이 책이 궁금하다면?</p>
									<Button text="보러 가기" type="button" cls="btn btn-point"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Main;