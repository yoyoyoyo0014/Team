import {useState} from 'react';

function BookDetail({Getuser,bookNum}) {
  
  let [book,setBook] = useState({
    bk_num : 0, //도서 번호
    bk_name : '', //도서 이름
    bk_state : 0, // 국내도서, 해외도서
    bk_date : '', //출간일
    bk_sg_num : 0,  //도서 분류
    bk_plot : '', //줄거리
    bk_price : 0, //가격
    bk_amount : 0, //재고
    bk_index : '',  //목차
    bk_isbn : '', //isbn
    bk_score : 0, //평점
    bk_reviewCount : 0, //총 리뷰 수
    bk_totalPage : 0,  //총 페이지
    bk_agelimit : 0, //연령제한


    bk_totalPurchase: 0,  //총 구매 수
    bk_age_60_male: 0,  //60대 남자
    bk_age_60_female: 0,  //60대 여자
    bk_age_50_male: 0,  //50대 남자
	  bk_age_50_female: 0,  //50대 여자
  	bk_age_40_male: 0,  //40대 남자
  	bk_age_40_female: 0,  //40대 여자
    bk_age_30_male: 0,  //30대 남자
	  bk_age_30_female: 0,  //30대 여자
	  bk_age_20_male: 0,  //20대 남자
  	bk_age_20_female: 0,  //20대 여자
	  bk_age_10_male: 0,  //10대 남자
	  bk_age_10_female: 0  //10대 여자
  })//책 데이터

  let[user,setUser] = useState({
    me_id : '', //아이디
    me_nickname : '', //닉네임
    me_pw : '', //비밀번호
    me_email : '',  //이메일
    me_address : '',  //주소
    me_postalCode : '', //우편번호
    me_gender : '',
    me_birth : '',  //생년월일
    me_phone : '',  //전화번호
    me_adult : 0, //성인인증
    me_authority : '',  //권한
    me_fail : 0,  //로그인실패 횧수
    me_cookie : '', //쿠키
    me_report : 0,  //신고횟수
    me_ms_name : '',  //회원상태명
    me_stop : '',//정지일
    me_cm : '',//사업자 번호
    me_entercount : 0, //로그인 횟수
    me_last : '' //마지막 접속
  })//유저 데이터

  let[useIsBuy, setUserIsBuy] = useState(false); //유저가 책을 샀는가
  let[writerList,setWriteList] =useState([]); //작가 리스트

  let[popularityDistributionChart,setPopularityDistributionChart] = useState({
    bk_age_60_malePer: 0,
    bk_age_60_femalePer: 0,
    bk_age_50_malePer: 0,
	  bk_age_50_femalePer: 0,
  	bk_age_40_malePer: 0,
  	bk_age_40_femalePer: 0,
    bk_age_30_malePer: 0,
	  bk_age_30_femalePer: 0,
	  bk_age_20_malePer: 0,
  	bk_age_20_femalePer: 0,
	  bk_age_10_malePer: 0,
	  bk_age_10_femalePer: 0
  });//인기분포도 %

  function getBookData(){
    fetch('/ebook/selectBook/'+bookNum,{
      method : "post",
			//body : JSON.stringify(book),
			headers : {
				"Content-type" : "application/json"
			}
    })
      .then(res=>res.text())
      .then(bookData=>{
        if(bookData){
          book = JSON.parse(bookData); 
          setBook(book);
          popularityDistributionChart = PopularityDistributionChart(book);//인기분포율 세팅
        }
      })
      .catch(e=>console.error(e));
  }//책 데이터 가져오기

  return (
    <div>
      <button onClick={getBookData}>클릭해봐!</button>

      <label>리뷰할 책 번호
      <input type='number'/>
      </label>

      <label>리뷰내용
      <input type='text' maxLength="255" placeholder="최대 255자 입력 가능"/>
      </label>

      <label>평점
      <input type='number'/>
      </label>
      
    </div>
  )
}

function PopularityDistributionChart(book){
  let popularityDistributionChart = {
    bk_age_60_malePer: book.bk_age_50_male/book.bk_totalPurchase  *100,
    bk_age_60_femalePer: book.bk_age_60_female/book.bk_totalPurchase  *100,
    bk_age_50_malePer: book.bk_age_50_male/book.bk_totalPurchase  *100,
	  bk_age_50_femalePer: book.bk_age_50_female/book.bk_totalPurchase  *100,
  	bk_age_40_malePer: book.bk_age_40_male/book.bk_totalPurchase  *100,
  	bk_age_40_femalePer: book.bk_age_40_female/book.bk_totalPurchase  *100,
    bk_age_30_malePer: book.bk_age_30_male/book.bk_totalPurchase  *100,
	  bk_age_30_femalePer: book.bk_age_30_female/book.bk_totalPurchase  *100,
	  bk_age_20_malePer: book.bk_age_20_male/book.bk_totalPurchase  *100,
  	bk_age_20_femalePer: book.bk_age_20_female/book.bk_totalPurchase  *100,
	  bk_age_10_malePer: book.bk_age_10_male/book.bk_totalPurchase  *100,
	  bk_age_10_femalePer: book.bk_age_10_female/book.bk_totalPurchase  *100
  }//인기분포도 %

  return popularityDistributionChart;
}

export default BookDetail;
