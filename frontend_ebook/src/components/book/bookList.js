import { Link } from 'react-router-dom';
import '../../css/booklist.css';
import axios from 'axios';
import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import Button from '../form/button';

function BookList({bookList}) {
  const { user } = useContext(LoginContext);

  const addCart = (bk_num) => {
    const options = {
      url: '/cart/add',
      method:'POST',
      header: {
        'Accept':'application/json',
        'Content-Type': "'application/json';charset=UTF-8'"
        //연결은 됐는데 보내는 타입이 맞지 않음(content type 점검)
      },
      data: {
        ca_bk_num: bk_num,
        ca_me_id: user?.me_id,
      }
    }

    axios(options)
    .then(res => {
      console.log(res);
			alert('장바구니에 추가했습니다');
		})
		.catch((error) => {
			console.log(error);
		})
  }

  return (
    <div className="book-list">
      <ul>
     {Array.isArray(bookList) && bookList.length > 0 &&    bookList.map((item, index) => {
         return (
            <li className="theme-box" key={index}>
              <div className="book-img"><Link to={"/ebook/selectBook/" + item.bk_num}><img src={'/img/book_'+ item.bk_num + '.jpg'} alt="불러오지 못한 이미지"  width="50" height="75" /></Link></div>
              <div className="book-info">
                <h3 className="title"><Link to={"/ebook/selectBook/" + item.bk_num}>{item.bk_name}</Link></h3>
                <p className="writer">{item.bk_writer}</p>
                <strong className="price">{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(item.bk_price)}</strong>
                <p style={{whiteSpace: 'pre-line'}}>{item.bk_plot.length > 200 ? item.bk_plot.slice(0, 200).split('<br/>').join("\r\n") + '...' : item.bk_plot.split('<br/>').join("\r\n")}</p>
                <Button text="바로 구매" cls="btn btn-point"/>
                <Button text="장바구니" click={() => {addCart(item.bk_num)}} cls="btn btn-dark"/>                
              </div>
            </li>
            );
          })
      }
      </ul>
    </div>
  );
}

//해당 책 페이지 번호 받아오기 없으면 -1
export async function selectReadBook(bookNum,userId) {
  var bookList ={
    bl_me_id : userId,
    bl_bk_num : bookNum,
    bl_nowPage : 0
  }
  try{
    const response = await fetch('/selectBook/currentBookPage',{
      method: 'POST',  // POST 요청 설정
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
      body: JSON.stringify(bookList),
    });
    const res =await response.text();
    return res;
  }catch(e){
    console.error(e);
  }
}

//해당 책 페이지 업데이트
export async function UpdateReadBook(userId,bookNum) {
  var bookList ={
    bl_me_id : userId,
    bl_bk_num : bookNum,
    bl_nowPage : 0
  }
  try{
    const response = await fetch('/selectBook/updateBookPage',{
      method: 'POST',  // POST 요청 설정
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
      body: JSON.stringify(bookList),
    });
    const res =await response.text();
    return res;
  }catch(e){
    console.error(e);
  }
}

//해당 페이지 가져오기
export async function SelectBookshelf(userId,bookNum) {
  try{
    const response = await fetch('/selectBookList/selectBookshelfPage/'+userId+"/"+bookNum,{
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      }
    });
    const res =await response.text();
    return res;
  }catch(e){
    console.error(e);
  }
}

export default BookList;