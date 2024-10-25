import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import Header from '../header';
import BookReview from './bookReview';
import '../../css/barGraphs.css';
import Highcharts from 'highcharts';
import Accessibility from 'highcharts/modules/accessibility';
import { SelectWriterList,SelectWriter,SelectWriterBookList,selectWriterType } from './WriterList';
function BookDetail() {

  const {bo_num} = useParams();
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
    me_id : 'admin123', //아이디
    me_nickname : '꼬꼬마', //닉네임
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
  let[writerTypeList,setwriterTypeList] =useState([]); //작가 리스트

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

  async function getBookData(){
    book =await SelectookData(bo_num);
    setBook(book);
    popularityDistributionChart = PopularityDistributionChart(book);//인기분포율 세팅
    setPopularityDistributionChart(popularityDistributionChart)
  } 

  async function getWriterList(){
    writerList = await SelectWriterBookList(bo_num)

    for(var i =0;i<writerList.length;i++){
      var writer = await SelectWriter(writerList[i].wl_wr_num);
      writerList[i].wr_name = writer.wr_name;
    }

    setWriteList(writerList);
  }

  async function  getWriterType() {
    writerTypeList = await selectWriterType();
    setwriterTypeList(writerTypeList)
  }

  useEffect(() => {
    getBookData();
    getWriterList();
    getWriterType();
}, []); //처음 시작할 때


  return (
    <div>
      <img src={'/img/book_'+ bo_num + '.jpg'} alt="불러오지 못한 이미지"  width="50" height="75"></img>
      <div>책 제목 : {book.bk_name}</div>
      <div>목차 : {book.bk_index}</div>
      <div>줄거리 : {book.bk_plot}</div>
      <div>가격 : {book.bk_price}</div>
      <table>
        <thead>
            <tr>
                <th>작가 유형</th>
                <th>작가 명</th>
            </tr>
        </thead>
        <tbody>
        {
          Array.isArray(writerList) && writerList.length > 0 &&    writerList.map((item, index) => {
            return (
                <tr key={index}>
                  <td>
                    {writerTypeList && writerTypeList[item.wl_wt_num]
                      ? writerTypeList[item.wl_wt_num-1].wt_name
                      : ""}
                  </td>
                  <td>{item.wr_name}</td>
                </tr>
                );
              })
          }
        </tbody>
    </table>
    
      <br/>
      
      <BarGraph popularityDistributionChart={popularityDistributionChart}/>
      <BookReview bookNum={bo_num} userId={user.me_id}></BookReview>
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
}//인기 분포도 세팅

export async function SelectookData(bo_num) {
  try{
    const response = await fetch('/selectBook/'+bo_num,{
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    });
    const res =await response.json();
    return res;
  }catch(e){
    console.error(e);
  }
}

function BarGraph({popularityDistributionChart}){
var chart = popularityDistributionChart;
Accessibility(Highcharts);

  if (document.getElementById('container')) {
      Highcharts.chart('container', {
          chart: {
              type: 'bar'
          },
          title: {
              text: '연령, 성별 구매 율',
              align: 'left'
          },
          subtitle: {
              text: 'Source: <a href="https://countryeconomy.com/demography/population-structure/andorra" target="_blank">countryeconomy.com</a>',
              align: 'left'
          },
          xAxis: [{
              categories: [
                  '10대 남자','20대 남자','30대 남자','40대 남자','50대 남자','60대 남자'
              ],
              reversed: false,
              labels: {
                  step: 1
              }
          }, {
              opposite: true,
              reversed: false,
              linkedTo: 0,
              categories: [
                  '10대 여자','20대 여자','30대 여자','40대 여자','50대 여자','60대 여자'
              ]
          }],
          yAxis: {
              title: {
                  text: null
              },
              labels: {
                  formatter: function () {
                      return Math.abs(this.value) + '%';
                  }
              }
          },
          plotOptions: {
              series: {
                  stacking: 'normal',
                  borderRadius: '30%'
              }
          },
          tooltip: {
              formatter: function () {
                  return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                      'Population: ' + Math.abs(this.point.y).toFixed(2) + '%';
              }
          },
          series: [{
              name: '남자',
              data: [
                -chart.bk_age_10_malePer,-chart.bk_age_20_malePer,-chart.bk_age_30_malePer,-chart.bk_age_40_malePer,-chart.bk_age_50_malePer,-chart.bk_age_60_malePer
              ]
          }, {
              name: '여자',
              data: [
                chart.bk_age_10_femalePer,chart.bk_age_20_femalePer,chart.bk_age_30_femalePer,chart.bk_age_40_femalePer,chart.bk_age_50_femalePer,chart.bk_age_60_femalePer
              ]
          }]
      });
  }


  return(
    <div>
      <script src="https://code.highcharts.com/highcharts.js"></script>
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/modules/export-data.js"></script>
      <script src="https://code.highcharts.com/modules/accessibility.js"></script>

      <figure className="highcharts-figure">
          <div id="container"></div>
          <p className="highcharts-description">
          </p>
      </figure>

    </div>
  )
}

export default BookDetail;
