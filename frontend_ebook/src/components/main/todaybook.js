import { Link } from 'react-router-dom';

const TodayBook = ({book}) => {
	return(
		<section id="today-book">
			<div className="theme-box">
				<h2>오늘의 책</h2>
				
				<div className="book-info">
					<div className="book-img">
						<img src={'/img/book_'+ book.bk_num + '.jpg'} alt="자신만만한 음치 거북이들"/>
					</div>

					<div className="book-desc">
						<div className="book-title">
							<p className="publisher"><strong>{book.bk_publisher}</strong></p>
							<h3>{book.bk_name}</h3>
							<p className="writer">{book.bk_writer}</p>
						</div>
						<div className="book-content">
							<p>
							{book.bk_plot}
							</p>
							<div className="blind">
								<p>이 책이 궁금하다면?</p>
								<Link to={"/ebook/selectBook/" + book.bk_num} className="btn btn-point">보러가기</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TodayBook;