import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import Check from '../../components/form/check';
import '../../css/cart.css';
import Button from '../../components/form/button';
import axios from 'axios';

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
      //콘솔
      setErrorMessage('');
      // 초기 선택 상태 설정
      const initialSelectedItems = {};
      data.forEach(item => {
        initialSelectedItems[item.ca_num] = false;
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
    const itemExists = cart.some(item => item.bk_num === bk_num);
    if (itemExists) {
      alert("이미 장바구니에 담긴 상품입니다.");
      return;
    }

    const options = {
      url: '/cart/add',
      method:'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': "'application/json';charset=UTP-8'"
      },
      data: {bk_num: bk_num, ca_me_id: me_id }
    }

    await axios(options)
    .then(res => {
      
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    })

    fetchCart();
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
  }, [me_id]);

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
          bu_total: totalAmount,
          bu_ori_total: totalAmount,
          bu_date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // buy_list에 저장 (선택한 책 목록)
      const selectedBooks = cart.filter(item => selectedItems[item.ca_num]);
      await Promise.all(selectedBooks.map(item => {
        return fetch('/buy/list/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bl_bk_num: item.book.bk_num,
            bl_me_id: me_id,
          }),
        });
      }));

      alert('구매 정보가 저장되었습니다.');
    } catch (error) {
      console.error("구매 정보 저장 중 오류 발생:", error);
      alert("구매 정보를 저장하는 중 오류가 발생했습니다.");
    }
  };
  const requestPay = () => {
    if (!IMP) {
      alert('IAMPORT 스크립트가 로드되지 않았습니다.');
      return;
    }

    const selectedPrices = cart
      .filter(item => selectedItems[item.ca_num]) // 선택된 아이템 필터링
      .reduce((total, item) => total + item.book.bk_price, 0);
      
    const selectedItemNames = cart
      .filter(item => selectedItems[item.ca_num])
      .map(item => item.book.bk_name)
      .join(", ");

    if (selectedPrices === 0) {
      alert("구매할 책을 선택해 주세요.");
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
          const response = await fetch('/buy/verify', {
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
            await saveBuyInfo(rsp.merchant_uid, selectedPrices); // bu_uid와 totalAmount 전달
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

  const handleCheckboxChange = (ca_num) => {
    setSelectedItems(prev => {
      const newSelectedItems = {
        ...prev,
        [ca_num]: !prev[ca_num], // 체크 상태 토글
      };

      // 전체 선택 상태 업데이트
      const allSelected = cart.every(item => newSelectedItems[item.ca_num]);
      setSelectAll(allSelected);

      return newSelectedItems;
    });
  };

  const handleSelectAllChange = () => {
    const newSelectedItems = {};
    cart.forEach(item => {
      newSelectedItems[item.ca_num] = !selectAll; // 전체 선택 또는 선택 해제
    });
    setSelectedItems(newSelectedItems);
    setSelectAll(!selectAll); // 전체 선택 상태 토글
  };

  return (
    <Fragment>
      <h2>장바구니</h2>

      <form id="cart" onSubmit={requestPay}>
        <Check name={"allSelect"} id="allSelect" label={"전체 선택"} change={handleSelectAllChange}/>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <ul className="cart-item-wrapper">
          {cart.length !== 0 ? cart.map(item => (
            <li className="theme-box cart-item" key={item.ca_num}>
              <input type="hidden" value={item.bk_num}/>
              <Check
                name=""
                label=""
                change={() => handleCheckboxChange(item.ca_num)}
                checked={!!selectedItems[item.ca_num]} 
                click={(e) => {
                  if(e.target.previousSibling.checked === true)
                    e.target.previousSibling.checked = false;
                  else
                  e.target.previousSibling.checked = true;
                }}/>
              <div className="book-img">
                <Link to={"/ebook/selectBook/" + item.bk_num}>
                <img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt="test" />
                </Link>
              </div>
              <div className="book-info">
                <h3>{item.bk_name}</h3>
                <p>작가명</p>
              </div>
              
              <div className="cart-item-controller">
                <div className="price">{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(item.bk_price)}</div>
                <Button type="button" cls="btn btn-dark" text="삭제" click={() => removeFromCart(item.ca_num)}/>
              </div>
            </li>
          )) : <li className="txt-center" style={{padding: '2em 0'}}>장바구니가 비었습니다</li>}
        </ul>
        
        <div className="total theme-box">
          <p><span>상품 금액</span><span>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(0)}</span></p>
          <p><span>할인 금액</span><span>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(0)}</span></p>
          <hr />
          <p>
            <strong>총 결제 금액</strong>
            <strong>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(0)}</strong>
          </p>
          <p><span>적립 예정 포인트</span><span>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(0)}</span></p>
          <Button cls="btn btn-point full" type="submit" text="구매하기" />
        </div>
      </form>
    </Fragment>
  );
};

export default CartPage;
