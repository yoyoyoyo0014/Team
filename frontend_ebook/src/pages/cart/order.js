import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/cart.css';
import Button from "../../components/form/button";
import {Input} from "../../components/form/input";
import { LoginContext } from "../../context/LoginContext";

const OrderPage = () => {
	const [IMP, setIMP] = useState(null);
  const [point, setPoint] = useState(0);
  const {user} = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();

  const tmpList = location.state.tmp;
  const orderList = location.state.orderList;
  let total = 0;

  // total 계산
  //tmpList.map((item, i) => total += parseInt(item.bk_price))

  total = 100;
  //테스트 결제를 위해 합계값 100원으로 고정.
  //실제 시연 시에는 total += parseInt(item.bk_price)) 주석 해제 및 total = 100 삭제

	const saveBuyInfo = async (merchant_uid, total) => {
    try {
      const buyVO = {
        bu_uid: merchant_uid,
        bu_me_id: user?.me_id,
        bu_state: '구매 완료',
        bu_payment: 'CARD',
        bu_total: total,
        bu_ori_total: total,
        bu_date: new Date().toISOString()
      }

      let response = await fetch('/buy/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyVO,
          orderList
        })
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
    } catch (error) {
      console.error("구매 정보 저장 중 오류 발생");
      console.log(error)
      alert("구매 정보를 저장하는 중 오류가 발생했습니다.");
    }

    navigate('/order/success', {
      state: tmpList
    });
  };

	useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    
    iamport.onload = () => setIMP(window.IMP);

    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
  }, []);

	const requestPay = (e) => {
    e.preventDefault();
    if (!IMP) {
      alert('IAMPORT 스크립트가 로드되지 않았습니다.');
      return;
    }

    IMP.init('imp48350481');

    IMP.request_pay({
      pg: 'html5_inicis.INIpayTest',
      pay_method: 'CARD',
      merchant_uid: new Date().getTime().toString(),
      name: `${tmpList[0].bk_title} 외 ${tmpList.length - 1}개`,
      amount: total,
      buyer_email: `${user?.me_email}`,
      buyer_name: `${user?.me_name}`
    }, async (rsp) => {
      if (rsp.success) {
        try {
          const response = await fetch('/buy/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              imp_uid: rsp.imp_uid,
              expectedAmount: total,
            }),
          });

          if (response.ok) {
            await saveBuyInfo(rsp.merchant_uid, total);
          } else {
            const errorMessage = await response.text();
            alert(`결제에 실패했습니다: ${errorMessage}`);
          }
        } catch (error) {
          alert('결제에 실패했습니다');
        }
        return;
      }
      alert(`결제에 실패했습니다 ${rsp.error_msg}`);
    });
  };
	
	return(<form id="order" onSubmit={requestPay}>
    <section className="selected-books">
      <div className="section-title">
        <h2>주문하기</h2>
      </div>

      <div className="theme-box">
        <ul className="buy-list">
          {tmpList.map((item, i) => {
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
    </section>

    <section className="payment">
      <div className="section-title">
        <h2>결제하기</h2>
      </div>

      <div className="theme-box">
        <dl>
          <dt><strong>총 금액</strong></dt>
          <dd>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(total)}</dd>
        </dl>
        <dl>
          <dt><strong>포인트</strong></dt>
          <dd>
            <Input
              type="text"
              change={setPoint}
              placeholder={Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(user?.me_point)}/>
          </dd>
        </dl>

        <Button type="submit" cls="btn btn-point full" text="결제하기"/>
      </div>
    </section>
	</form>)
}

export default OrderPage;