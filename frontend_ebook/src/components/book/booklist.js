import {useState} from 'react';
import { Link, useLocation } from "react-router-dom";
function BookList({readLastPage, LastPage}) {
  let[useIsBuy, setUserIsBuy] = useState(false); //유저가 책을 샀는가
  let [currentPage,setCurrentPage] = useState(0); //현재 페이지

  function exit(){
    if(readLastPage>currentPage){
      //마지막 페이지를 현재 페이지로 정할것인가 묻기
    }
  }

  function dataSubmit(savePage){
    //데이터 베이스에 저장
  }
  return (
    <div >
      

    </div>
  );
}

export default BookList;
