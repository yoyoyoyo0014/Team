import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Order = ({total}) => {
	const [IMP, setIMP] = useState(null);
	const { me_id } = useParams();

	const saveBuyInfo = async (merchant_uid, totalAmount) => {
    // try {
    //   const response = await fetch('/buy/save', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       bu_uid: merchant_uid,
    //       bu_me_id: me_id,
    //       bu_state: '구매 완료',
    //       bu_payment: 'CARD',
    //       bu_total: total,
    //       bu_ori_total: total,
    //       bu_date: new Date().toISOString(),
    //     }),
    //   });
		// }
	}

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     // buy_list에 저장 (선택한 책 목록)
  //     const selectedBooks = cart.filter(item => selectedItems[item.ca_num]);
  //     await Promise.all(selectedBooks.map(item => {
  //       return fetch('/buy/list/save', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           bl_bk_num: item.book.bk_num,
  //           bl_me_id: me_id,
  //         }),
  //       });
  //     }));

  //     alert('구매 정보가 저장되었습니다.');
  //   } catch (error) {
  //     console.error("구매 정보 저장 중 오류 발생:", error);
  //     alert("구매 정보를 저장하는 중 오류가 발생했습니다.");
  //   }
  // };

	// useEffect(() => {
  //   const jquery = document.createElement("script");
  //   jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
  //   const iamport = document.createElement("script");
  //   iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    
  //   iamport.onload = () => {
  //     setIMP(window.IMP);
  //   };

  //   document.head.appendChild(jquery);
  //   document.head.appendChild(iamport); 
  // }, [me_id]);


	const requestPay = () => {
    // if (!IMP) {
    //   alert('IAMPORT 스크립트가 로드되지 않았습니다.');
    //   return;
    // }

    // const selectedPrices = cart
    //   .filter(item => selectedItems[item.ca_num]) // 선택된 아이템 필터링
    //   .reduce((total, item) => total + item.book.bk_price, 0);
      
    // const selectedItemNames = cart
    //   .filter(item => selectedItems[item.ca_num])
    //   .map(item => item.book.bk_name)
    //   .join(", ");

    // if (total === 0) {
    //   alert("구매할 책을 선택해 주세요.");
    //   return;
    // }

    // console.log(total);
    // IMP.init('imp48350481');
  
    // IMP.request_pay({
    //   pg: 'html5_inicis.INIpayTest',
    //   pay_method: 'card',
    //   merchant_uid: new Date().getTime().toString(),
    //   name: `구매 아이템: ${selectedItemNames}`,
    //   amount: selectedPrices,
    // }, async (rsp) => {
    //   if (rsp.success) {
    //     try {
    //       const response = await fetch('/buy/verify', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: new URLSearchParams({
    //           imp_uid: rsp.imp_uid,
    //           expectedAmount: selectedPrices,
    //         }),
    //       });

    //       if (response.ok) {
    //         alert('결제 검증 성공');
    //         await saveBuyInfo(rsp.merchant_uid, selectedPrices); // bu_uid와 totalAmount 전달
    //       } else {
    //         const errorMessage = await response.text();
    //         alert(`결제 검증 실패: ${errorMessage}`);
    //       }
    //     } catch (error) {
    //       alert('결제 검증 요청 중 오류가 발생했습니다.');
    //     }
    //   } else {
    //     alert(`결제 실패: ${rsp.error_msg}`);
    //   }
    // });
  };
	
	return(<div>
	order page
	</div>)
}

export default Order;