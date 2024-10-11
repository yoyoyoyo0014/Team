import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const CartPage = () => {
  const { me_id } = useParams();
  const [cart, setCart] = useState([]);
  const [bk_num, setBk_num] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [IMP, setIMP] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 추가

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch(`/cart/${me_id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCart(data);
      setErrorMessage('');
      // 초기 선택 상태 설정
      const initialSelectedItems = {};
      data.forEach(item => {
        initialSelectedItems[item.cart.ca_num] = false;
      });
      setSelectedItems(initialSelectedItems);
    } catch (error) {
      setErrorMessage("카트 아이템을 가져오는 중 오류가 발생했습니다.");
    }
  }, [me_id]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (e) => {
    e.preventDefault();
    const itemExists = cart.some(item => item.cart.ca_bk_num === bk_num);
    if (itemExists) {
      alert("이미 장바구니에 담긴 상품입니다.");
      return;
    }

    try {
      const response = await fetch(`/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ca_bk_num: bk_num, ca_me_id: me_id }),
      });
      if (!response.ok) {
        if (response.status === 409) {
          alert("이미 장바구니에 담긴 상품입니다.");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        setBk_num('');
        await fetchCart();
      }
    } catch (error) {
      console.error("카트에 아이템 추가 중 오류 발생:", error);
      setErrorMessage("카트에 아이템 추가 중 오류가 발생했습니다.");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`/cart/remove/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await fetchCart();
    } catch (error) {
      console.error("카트에서 아이템을 삭제하는 중 오류 발생:", error);
      setErrorMessage("카트에서 아이템을 삭제하는 중 오류가 발생했습니다.");
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
  }, []);

  const requestPay = () => {
    if (!IMP) {
      alert('IAMPORT 스크립트가 로드되지 않았습니다.');
      return;
    }

    const selectedPrices = cart
      .filter(item => selectedItems[item.cart.ca_num]) // 선택된 아이템 필터링
      .reduce((total, item) => total + item.book.bk_price, 0);
      
    const selectedItemNames = cart
      .filter(item => selectedItems[item.cart.ca_num])
      .map(item => item.book.bk_name)
      .join(", ");

    if (selectedPrices === 0) {
      alert("구매할 아이템을 선택해 주세요.");
      return;
    }

    IMP.init('imp48350481');
  
    IMP.request_pay({
      pg: 'html5_inicis.INIpayTest',
      pay_method: 'card',
      merchant_uid: new Date().getTime().toString(),
      name: `구매 아이템: ${selectedItemNames}`,
      amount: selectedPrices,
    }, async (rsp) => {
      if (rsp.success) {
        try {
          const response = await fetch('/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              imp_uid: rsp.imp_uid,
              expectedAmount: selectedPrices,
            }),
          });

          if (response.ok) {
            alert('결제 검증 성공');

          } else {
            const errorMessage = await response.text();
            alert(`결제 검증 실패: ${errorMessage}`);
          }
        } catch (error) {
          alert('결제 검증 요청 중 오류가 발생했습니다.');
        }
      } else {
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    });
  };
  //결제 검증 성공시 실행시킬 함수를 추가
  //CREATE TABLE `buy` (
	// `bu_num`	varchar(255) primary key	NOT NULL,
	// `bu_me_id`	varchar(15)	NOT NULL, 현재 카트의 ME_ID
	// `bu_state`	varchar(5)	NOT NULL, '구매 완료', '구매 취소' 상태로 나뉘어짐 
	// `bu_payment`	varchar(15)	NOT NULL, 'CARD', 'CASH' 로 나누어짐
	// `bu_total`	int	NOT NULL, '추후 추가 예정인 포인트를 사용한 금액
	// `bu_ori_total`	int	NOT NULL, 선택한 책값을 더한 값
	// `bu_date`	datetime	NOT NULL 결제 완료된 날짜 및 시간정보
  //위 테이블에 결제 진행 정보를 입력하는 함수

  const handleCheckboxChange = (ca_num) => {
    setSelectedItems(prev => {
      const newSelectedItems = {
        ...prev,
        [ca_num]: !prev[ca_num], // 체크 상태 토글
      };

      // 전체 선택 상태 업데이트
      const allSelected = cart.every(item => newSelectedItems[item.cart.ca_num]);
      setSelectAll(allSelected);

      return newSelectedItems;
    });
  };

  const handleSelectAllChange = () => {
    const newSelectedItems = {};
    cart.forEach(item => {
      newSelectedItems[item.cart.ca_num] = !selectAll; // 전체 선택 또는 선택 해제
    });
    setSelectedItems(newSelectedItems);
    setSelectAll(!selectAll); // 전체 선택 상태 토글
  };

  return (
    <div>
      <h1>장바구니</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          전체 선택
        </label>
      </div>
      <ul>
        {cart.map(item => (
          <li key={item.cart.ca_num}>
            <input
              type="checkbox"
              checked={!!selectedItems[item.cart.ca_num]} // 체크박스 상태
              onChange={() => handleCheckboxChange(item.cart.ca_num)}
            />
            <span>
              책 번호: {item.book.bk_num} - 제목: {item.book.bk_name} - 가격: {item.book.bk_price}
            </span>
            <button onClick={() => removeFromCart(item.cart.ca_num)}>삭제</button>
          </li>
        ))}
      </ul>

      <form onSubmit={addToCart}>
        <input
          type="text"
          placeholder="책 번호를 입력하세요"
          value={bk_num}
          onChange={(e) => setBk_num(e.target.value)}
          required
        />
        <button type="submit">카트에 추가</button>
        <br />
        <button type="button" onClick={requestPay}>구매하기</button>
      </form>
    </div>
  );
};

export default CartPage;
