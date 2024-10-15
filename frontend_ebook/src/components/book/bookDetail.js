import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '../form/button';
import '../../css/detail.css';
import StarRating from '../starRating';

const BookDetail = ({Getuser}) => {
  const bookNum = useParams().bk_num;

  let [reviewList, setReviewList] = useState([]);
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
  let [writer, setWriter] = useState([]);

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
    popularityDistributionChart = PopularityDistributionChart(book);//인기분포율 세팅
  }

  let score = (book.bk_score / book.bk_reviewCount).toFixed(1);

  const options = {
		url: '/api/selectBook/' + bookNum,
		method:'GET',
		header: {
			'Accept':'application/json',
			'Content-Type': "'application/json';charset=UTP-8'"
			//연결은 됐는데 보내는 타입이 맞지 않음(content type 점검)
		},
		data: {
			bookNum: bookNum
		}
	}

  useEffect(() => {
    axios(options)
      .then(res => {
        setBook(res.data.book);
        setWriter(res.data.writer);
        console.log("data load 성공")
      })
      .catch((error) => {
        if (error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
          console.log(error.response.status);
        } else if (error.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않았습니다. 
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
          // node.js에서는 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  }, [])
  return (
    <div>
      <div className="book-info">
        <div className="book-img">
          <img src="https://image.aladin.co.kr/product/34765/53/cover200/k632933028_1.jpg" alt={book.bk_name}/>
        </div>
        <div className="info">
          <p className="publisher">{book.bk_publisher}</p>
          <h2>{book.bk_name}</h2>
          <dl>
            <dt>판매가</dt>
            <dd>{Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(book.bk_price)}</dd>
          </dl>
          {writer.map(item => {
            return (
              <dl>
                <dt>{item.wt_name}</dt>
                <dd>{item.wr_name}</dd>
              </dl>
            )
          })}

          <div className="rating">
            <StarRating score={Math.floor(score)}/>
            <span><strong>{score === "NaN" ? 0 : score}</strong>({book.bk_reviewCount})</span>
          </div>

          <div className="btns">
            <Button type="button" text="장바구니" cls="btn"/>
            <Button type="button" text="구매하기" cls="btn btn-point"/>
          </div>
        </div>
      </div>

      <div className="book-desc section">
        <h3>책 소개</h3>
        <p>{book.bk_plot}</p>
      </div>

      <hr/>
      <div className="review-container section">
        <h3>리뷰</h3>

        <ul>
          {reviewList ? <li className="no-data">작성된 리뷰가 없습니다</li> :
          [...Array(parseInt(5))].map((item, i) => {
            <li>
              리뷰1
            </li>
          })}
        </ul>
      </div>
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
