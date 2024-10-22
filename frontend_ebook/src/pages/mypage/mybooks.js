import { Fragment } from 'react';
import MySubMenu from "../../components/mysubmenu";
import '../../css/mypage.css';
import '../../css/mybooks.css';
import { Link } from 'react-router-dom';

const MyBooks = () => {
	return (
		<Fragment>
			<MySubMenu/>
			<section className="mypage-content">
				<h2 className="section-title">내 책꽂이</h2>
				<div className="bookshelf theme-box">	
					<div className="container">
						{[...Array(parseInt(3))].map((n, i) => {
							return(<div className="row">
								<div className="book">
									<Link to={"/mypage/mybooks/book/" + (i + 1)}>
										<div className="book-img"><img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt="test" /></div>
									</Link>
								</div>
								<div className="book">
									<Link to={"/mypage/mybooks/book/" + (i + 1)}>
										<div className="book-img"><img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt="test" /></div>
									</Link>
								</div>
								<div className="book">
									<Link to={"/mypage/mybooks/book/" + (i + 1)}>
										<div className="book-img"><img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt="test" /></div>
									</Link>
								</div>
								<div className="book">
									<Link to={"/mypage/mybooks/book/" + (i + 1)}>
										<div className="book-img"><img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt="test" /></div>
									</Link>
								</div>
							</div>)
						})}
					</div>
				</div>
			</section>
		</Fragment>
	);
}

export default MyBooks;