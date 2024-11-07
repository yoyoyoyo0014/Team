import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Check from '../../components/form/check';
import '../../css/cart.css';
import Button from '../../components/form/button';
import axios from 'axios';

const CartPage = () => {
  const { handleSubmit } = useForm();
  const navigate = useNavigate(); // useNavigate 훅 선언
  const { me_id } = useParams();
  const [cart, setCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  let [total, setTotal] = useState(0);
  let [selectedBooks, setSelectedBooks] = useState([]);

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
    } catch (error) {
      setErrorMessage("카트 아이템을 가져오는 중 오류가 발생했습니다.");
    }
  }, [me_id]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  //전체 금액 계산하는 함수
  const calcPrice = () => {
    let tmp = 0;

    const inps = document.querySelectorAll('[name="ca_num"]');
    inps.forEach(inp => {
      if (inp.checked === true) {
        tmp += parseInt(inp.parentElement.parentElement.querySelector('[name="bk_price"]').value);
      }
    })
    
    setTotal(tmp);
    document.querySelector('[name="total"]').value = total;
  }

  useEffect(() => {
    handleSelectAllChange();
    calcPrice();
  }, []);

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

  const goOrder = (e) => {
    e.preventDefault();
    let cnt = 0;
    let tmp = [];
    let orderList = [];
    const inps = document.querySelectorAll('[name="ca_num"]');

    inps.forEach(inp => {
      if (inp.checked === true) {
        cnt++;
        tmp.push({
          bk_title: inp.parentElement.parentElement.querySelector('.bk_title').innerText,
          bk_writer: inp.parentElement.parentElement.querySelector('.bk_writer').innerText,
          bk_price: inp.parentElement.parentElement.querySelector('.bk_price').value
        });
        orderList.push({
          bl_num: 0,
          bl_ca_num: inp.parentElement.parentElement.querySelector('[name="ca_num"]').value,
          bl_me_id: me_id,
          bl_bk_num: inp.parentElement.parentElement.querySelector('.bk_num').value
        })
      }
    });
    
    if(cnt === 0) {
      alert("구매할 책을 선택해 주세요.");
      return;
    }
    navigate('/buy', {
      state: {
        tmp: tmp,
        orderList: orderList
      }
    });
  }

  const handleSelectAllChange = (e) => {
    if(!e) return;
    const inps = document.querySelectorAll('[name="ca_num"]');
    inps.forEach(inp => {
      if (e.target.checked === true)
        inp.checked = true;
      else
        inp.checked = false;
    });
    calcPrice();
  };

  return (
    <Fragment>
      <div className="section-title">
        <h2>장바구니</h2>
      </div>
      <form id="cart" onSubmit={goOrder} action="/buy">
        <Check name={"allSelect"} id="allSelect" label={"전체 선택"} change={e => handleSelectAllChange(e)}/>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <ul className="cart-item-wrapper">
          {cart.length !== 0 ? cart.map(item => (
            <li className="theme-box cart-item" key={item.ca_num}>
              <input type="hidden" className="bk_price" id={"bk_price_" + item.ca_num} name={"bk_price"} value={item.bk_price}/>
              <input type="hidden" className="bk_num" id={"bk_num_" + item.bk_num} name={"bk_num"} value={item.bk_num}/>
              <Check
                id={"cart_item_" + item.ca_num}
                name="ca_num"
                label=""
                change={calcPrice}
                value={item.ca_num}/>
              <div className="book-img">
                <Link to={"/ebook/selectBook/" + item.bk_num}>
                <img src={'/img/book_'+ item.bk_num + '.jpg'} alt="불러오지 못한 이미지" />
                </Link>
              </div>
              <div className="book-info">
                <h3 className="bk_title">{item.bk_name}</h3>
                <p className="bk_writer">{item.bk_writer}</p>
              </div>
              
              <div className="cart-item-controller">
                <div className="price">{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(item.bk_price)}</div>
                <Button type="button" cls="btn btn-dark" text="삭제" click={() => removeFromCart(item.ca_num)}/>
              </div>
            </li>
          )) : <li className="txt-center" style={{padding: '2em 0'}}>장바구니가 비었습니다</li>}
        </ul>
        
        <div className="total theme-box">
          <input type="hidden" name="total" value={total}/>
          <p><span>상품 금액</span><span>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(total)}</span></p>
          <p><span>할인 금액</span><span>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(0)}</span></p>
          <hr />
          <p>
            <strong>총 결제 금액</strong>
            <strong>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(total)}</strong>
          </p>
          <p><span>적립 예정 포인트</span><span>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(0)}</span></p>
          <Button type="submit" cls="btn btn-point full" text="구매하기" />
        </div>
      </form>
    </Fragment>
  );
};

export default CartPage;