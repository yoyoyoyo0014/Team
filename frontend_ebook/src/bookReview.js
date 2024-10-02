import {useState} from 'react';

function BookReview({userIsBuy,review}) {
  let [reviewCurrentPage,setReviewCurrentPage] = useState(0);//리뷰 리스트 페이지번호
  let [reviewList,setReviewList] = useState([]); //리뷰 리스트
  let [review,setReview] = useState({
    re_num : 0,
    re_content : '',
    re_bk_num : 0,
    re_star : 0,
    re_date : '',
    re_me_id : ''
  }); //해당 유저 리뷰

  let[useIsBuy, setUserIsBuy] = useState(false); ////유저가 책을 샀는가
  
  function writeReview(){
    if(!userIsBuy || review == null)
      return;


  }//유저가 리뷰를 쓸 때
  return (
    <div >
     

    </div>
  );
}

export default BookReview;
