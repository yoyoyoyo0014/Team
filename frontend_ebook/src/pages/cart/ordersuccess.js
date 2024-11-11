import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
	const location = useLocation();
	const orderList = location.state;
	
	return(<>
		<h2 className="page-title txt-center">구매 완료!</h2>
		<section id="success" className="my-buy-list">
			<div className="section-title">
				<h3>구매 목록</h3>
			</div>
			<div className="theme-box">
				<ul>
					{orderList.map((item, i) => {
						return(<li>
							<div>
								<strong>{item.bk_title}</strong>
								<p>{item.bk_writer}</p>
							</div>
							<p className="price">{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(item.bk_price)}</p>
						</li>);
					})}
				</ul>
			</div>

			<Link to="/mypage/mybooks" className="btn btn-point">내 책꽂이로</Link>
		</section>
	</>)
}

export default OrderSuccess;