import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import Check from '../../components/form/check';
import '../../css/cart.css';
import Button from '../../components/form/button';

const CartPage = () => {
  const { me_id } = useParams();
  const [cart, setCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 추가
  let [total, setTotal] = useState(0);

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
      // // 초기 선택 상태 설정
      // const initialSelectedItems = {};
      // data.forEach(item => {
      //   initialSelectedItems[item.ca_num] = false;
      // });
      // setSelectedItems(initialSelectedItems);
    } catch (error) {
      setErrorMessage("카트 아이템을 가져오는 중 오류가 발생했습니다.");
    }
  }, [me_id]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  useEffect(()=>{
    calcPrice();
  },[selectedItems])

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

  //전체 금액 계산하는 함수
  const calcPrice = () => {
    let tmp = cart.reduce((acc, obj)=>{      
      // if(selectedItems[obj.ca_num]){
      //   return acc + obj.bk_price;
      // }
      // else
      //   return acc;
    }, 0)
    
    setTotal(tmp);
    document.querySelector('[name="total"]').value = total;
  }

  const handleSelectAllChange = () => {
    const newSelectedItems = [];
    cart.forEach((item, i) => {
      let chk = document.querySelector('#item_' + item.ca_num).querySelector('[type="checkbox"');
      chk.checked = !chk.checked;

      if(chk.checked === true)
        newSelectedItems.push(item);
    });

    setSelectedItems([newSelectedItems]);
    calcPrice();
    console.log(selectedItems);
    setSelectAll(!selectAll); // 전체 선택 상태 토글
  };


  const handleSelectChange = (e) => {
    let arr = []
    for(let ca_num in selectedItems){
      if(selectedItems[ca_num]){
        arr.push(ca_num);
      }
    }
    
    return arr;
  }

  const goOrder = (e) => {
    e.preventDefault();
    let arr = test();
    console.log(selectedItems);
    if(selectedItems.length === 0) {
      alert("구매할 책을 선택해 주세요.");
      return ;
    }

    return ;
  }

  return (
    <Fragment>
      <div className="section-title">
        <h2>장바구니</h2>
      </div>

      <form id="cart" onSubmit={goOrder}>
        <input type="hidden" name="total" value={total}/>
        <Check name={"allSelect"} id="allSelect" label={"전체 선택"} change={handleSelectAllChange}/>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <ul className="cart-item-wrapper">
          {cart.length !== 0 ? cart.map(item => (
            <li id={"item_" + item.ca_num} className="theme-box cart-item" key={item.ca_num}>
              <input type="hidden" className="bk_num" id={"bk_num_" + item.ca_num} name={"bk_num_" + item.ca_num} value={item.bk_num}/>
              <input type="hidden" className="bk_price" id={"bk_price_" + item.ca_num} name={"bk_price_" + item.ca_num} value={item.bk_price}/>
              <Check
                name={"chk_item_" + item.ca_num}
                id={"chk_item_" + item.ca_num}
                cls={"chk_item"}
                label=""
                value={item.ca_num}
                change={handleSelectChange}
                click={e => {
                  if(e.target.checked === true)
                    e.target.checked = false;
                  else
                    e.target.checked = true;
                  calcPrice();
                }
                  
                }/>
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
          <p><span>상품 금액</span><span>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(total)}</span></p>
          <p><span>할인 금액</span><span>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(0)}</span></p>
          <hr />
          <p>
            <strong>총 결제 금액</strong>
            <strong>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(total)}</strong>
          </p>
          <p><span>적립 예정 포인트</span><span>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(0)}</span></p>
          <Button type="submit" cls="btn btn-point full" text="구매하기"/>
        </div>
      </form>
    </Fragment>
  );
};

export default CartPage;
