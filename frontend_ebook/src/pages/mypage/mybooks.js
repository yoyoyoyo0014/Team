import { Fragment, useContext, useEffect, useState } from 'react';
import MySubMenu from "../../components/mysubmenu";
import '../../css/mypage.css';
import '../../css/mybooks.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../../context/LoginContext';

const MyBooks = () => {
	const { user } = useContext(LoginContext);
	let [myBookList, setMyBookList] = useState([]);

	useEffect(() => {
		axios({
			url: '/ebook/selectMyBook/' + user?.me_id,
			method: 'get'
		}).then(res => {
			setMyBookList(res.data.myBookList);
		})
	}, [])

	return (
		<Fragment>
			<MySubMenu/>
			<section className="mypage-content">
				<h2 className="section-title">내 책꽂이</h2>
				<div className="bookshelf theme-box">	
					<div className="container">
						{/* 1234 5678 9101112 */}
						{myBookList && [...Array(Math.ceil(myBookList.length/4))].map((n, i) => {
							return(
								<div className='row'>
									{[...Array(parseInt(4))].map((book, j) => {
										if (i > 0) j += 4;
										if (j >= myBookList.length) return null;
										return(
											<div className="book">
												<Link to={"/mypage/mybooks/book/" + myBookList[j].bk_num}>
													<div className="book-img"><img src={'/img/book_'+ myBookList[j].bk_num + '.jpg'} alt={myBookList[j].bk_name}/></div>
												</Link>
											</div>
										)
								})}
								</div>
							)
						})}
					</div>
				</div>
			</section>
		</Fragment>
	);
}

export default MyBooks;