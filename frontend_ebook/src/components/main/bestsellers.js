<<<<<<< HEAD
const BestSellers = () => {
	return (
		<div>best sellers</div>
=======
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BestSellers = () => {
	let [books, setBooks] = useState([{}]);

	const options = {
		url: '/main',
		method:'POST',
		header: {
			'Accept':'application/json',
			'Content-Type': "'text/plain';charset=UTP-8'"
		},
		data: {
			section: 'bestSellers'
		}
	}

	useEffect(() => {
		axios(options)
		.then(res => {
			setBooks(res.data.list);
		})
		.catch((error) => {
			if (error.response) {
				// 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
				console.log(error.response.status);
			} else if (error.request) {
				// 요청이 전송되었지만, 응답이 수신되지 않았습니다. 
				// 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
				// node.js에서는 http.ClientRequest 인스턴스입니다.
				console.log(error.request);
			} else {
				// 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
				console.log('Error', error.message);
			}
		})
	}, [])
	
	return (
		<div id="best-sellers" className="books theme-box">
			{
				books && books.map((book, i) => {
					return(
						<Link to={"/ebook/selectBook/" + book.bk_num} className="book">
							<div className="book-wrapper">
								<div className="book-img">
									<span className="rank">{i + 1}</span>
									<img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt={book.bk_name}/>
								</div>
							</div>
							<div className="book-info">
								<strong>{book.bk_name}</strong>
								<p>{book.bk_writer}</p>
							</div>
						</Link>
					)
				})
			}
		</div>
>>>>>>> KCL
	)
}

export default BestSellers;