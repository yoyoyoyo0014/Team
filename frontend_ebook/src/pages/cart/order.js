import { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import '../../css/cart.css';
import Check from "../../components/form/check";
import Button from "../../components/form/button";

const OrderPage = () => {
	const [IMP, setIMP] = useState(null);
	const { me_id } = useParams();
  const location = useLocation();

  const orderList = location.state;
  let total = 0;

  orderList.map((item, i) => total += parseInt(item.bk_price))

	const saveBuyInfo = async (merchant_uid, totalAmount) => {
    try {
      const response = await fetch('/buy/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bu_uid: merchant_uid,
          bu_me_id: me_id,
          bu_state: '구매 완료',
          bu_payment: 'CARD',
          bu_total: total,
          bu_ori_total: total,
          bu_date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // buy_list에 저장 (선택한 책 목록)
      fetch('/buy/list/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderList
        }),
      })
      alert('구매 정보가 저장되었습니다.');
    } catch (error) {
      console.error("구매 정보 저장 중 오류 발생:", error);
      alert("구매 정보를 저장하는 중 오류가 발생했습니다.");
    }
  };

	useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    
    iamport.onload = () => {
      setIMP(window.IMP);
    };

    document.head.appendChild(jquery);
    document.head.appendChild(iamport); 
  }, [me_id]);


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
      name: `${orderList[0].bk_title} 외 ${orderList.length - 1}개`,
      amount: total,
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
            alert('결제 검증 성공');
            await saveBuyInfo(rsp.merchant_uid, total); // bu_uid와 totalAmount 전달
          } else {
            const errorMessage = await response.text();
            alert(`결제 검증 실패: ${errorMessage}`);
          }
        } catch (error) {
          alert('결제 검증 요청 중 오류가 발생했습니다.');
        }
        return;
      }
      alert(`결제 실패: ${rsp.error_msg}`);
    });
  };
	
	return(<form onSubmit={requestPay}>
  <section className="selected-books">
    <div className="section-title">
      <h2>주문하기</h2>
    </div>

    <div className="theme-box">
      <ul className="buy-list">
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
        <dd>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(0)}</dd>
      </dl>
    </div>

    <Button type="submit" cls="btn btn-point" text="결제하기"/>
  </section>
	</form>)
}

export default OrderPage;