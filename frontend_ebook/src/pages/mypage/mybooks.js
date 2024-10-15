import '../../css/mybooks.css';

const MyBooks = () => {
	return (
		<div className="bookshelf theme-box">
			<h2>내 책꽂이</h2>
			<div className="container">
				{[...Array(parseInt(3))].map((n, i) => {
					return(<div className="row">
						<div className="book">
							<div className="book-img"><img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt="test" /></div>
						</div>
						<div className="book">
							<div className="book-img"><img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt="test" /></div>
						</div>
						<div className="book">
							<div className="book-img"><img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt="test" /></div>
						</div>
					</div>)
				})}
			</div>
		</div>
	);
}

export default MyBooks;