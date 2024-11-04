import {Fragment, useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import ReportType from '../reportType';
import { bookReviewReport } from '../report';
import MakePage from '../pageButton';
import Report from '../report';
import Button from '../form/button';
import axios from 'axios';
import { Input } from '../form/input';
import StarRating from '../starRating';
import { LoginContext } from '../../context/LoginContext';

Modal.setAppElement('#root'); // 접근성 관련 설정 (필수)

function BookReview({bookNum, loadBook}) {
  //bookNum = 받을 책 번호
  //userIsBuy = 유저가 이미 책을 샀는가
  //review =  유저가 리뷰를 작성 하면 받는 값
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //const {user, isLoggedIn} = useContext(LoginContext);
  const {user} = useContext(LoginContext);
  const reviewPageCount = 5;//한 페이지에 존재하는 리뷰 수

  let [reviewList,setReviewList] = useState([]); //리뷰 리스트
  let [userIsBuy,setUserIsBuy] = useState(true);
  let [writeUserReview,setWriteUserReview] = useState({
    re_num : 0,
    re_content : '',
    re_bk_num : 0,
    re_star : 0,
    re_date : '',
    re_me_id : ''
  }); //유저가 쓸 리뷰

  let [oriWriteUserReview,setOriWriteUserReview] = useState({
    re_num : 0,
    re_content : '',
    re_bk_num : 0,
    re_star : 0,
    re_date : '',
    re_me_id : ''
  })//기존 리뷰  수정되지 않으면 변경되지 않기 위함

  let[writerIsReview, setWriterIsReview] = useState(false);  //유저가 리뷰를 작성했는가

  let [page,setPage] = useState({
    contentsCount : 5,
    currentPage : 1,
    startPage : 1,
    endPage : 5,
    prev : false,
    next : false,
    pageList : []
  })//페이지 이동버튼

  let [reportType,setReportType] = useState([]);

  let [report,setReport] = useState({
    rp_num : 0,
    rp_me_id : user?.me_id,
    rp_target : '',
    rp_content : '',
    rp_rt_num : 0,
    rp_id : ''
  })//신고객체
  
  function insertReview(){
    if(user === false){
      alert('로그인을 해주세요.')
      return;
    }
    if(writerIsReview){
      console.log(user?.me_id)
      alert('이미 리뷰를 작성하였습니다.')
      return;
    }
    if(!userIsBuy){
      alert('책을 구매하지 않았습니다.')
      return;
    }

    writeUserReview.re_me_id =  user?.me_id;
    writeUserReview.re_bk_num = bookNum; //리뷰 책 번호 세팅
    setWriteUserReview(prev => {
      return {...prev,
        re_star: writeUserReview.re_star,
        re_content: writeUserReview.re_content
      }
    });

    if(!TestStar(writeUserReview.re_star))
      return;//제대로 된 별점 X

    const options = {
      url: '/review/insertReview',
      method:'POST',
      header: {
        'Accept':'application/json',
        'Content-Type': "'application/json;charset=UTP-8'"
      },
      data: {
        re_me_id: user?.me_id,
        re_bk_num: bookNum,
        re_content: writeUserReview.re_content,
        re_star: writeUserReview.re_star
      }
    }

    axios(options)
		.then(res=>{
      // resGetReviewData = 리뷰가 성공적으로 보내졌는지 유무
      if(res){
        alert('성공적으로 작성되었습니다.');
        setWriterIsReview(true);
        oriWriteUserReview = writeUserReview;
        selectReviewList(page.currentPage);//리뷰 목록 다시가져오기
        changePageOri();//페이지 번호 재설정
        loadBook();
      } else console.log('리뷰가 작성되지 않았습니다.');
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
		})
   }//유저가 리뷰를 쓸 때

  function updateReview(){
    if(oriWriteUserReview.re_content === writeUserReview.re_content &&
       oriWriteUserReview.re_star === writeUserReview.re_star){
      alert('리뷰가 수정되지 않았습니다.');
      return;
    }
    writeUserReview.re_me_id =  user?.me_id;
    writeUserReview.re_bk_num = bookNum; //리뷰 책 번호 세팅
    setWriteUserReview(writeUserReview);

    if(!TestStar(writeUserReview.re_star))
      return;//제대로 된 별점 X

    fetch('/review/updateReview',{
      method : "post",
      body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.text())
    .then(resGetReviewData=>{
      // resGetReviewData = 리뷰가 성공적으로 보내졌는지 유무
      if(resGetReviewData){
        alert('성공적으로 수정되었습니다.');
        oriWriteUserReview = writeUserReview;
        setOriWriteUserReview(writeUserReview);
        selectReviewList(page.currentPage);//리뷰 목록 다시가져오기
        changePageOri();//페이지 번호 재설정
      }
      else
        alert('리뷰 수정에 실패했습니다.');
    })
    .catch(e=>console.error(e));
  }//리뷰 수정

  function deleteReview(){
    fetch('/review/deleteReview/' + bookNum + '/' + user?.me_id, {
      method : "post",
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      }
    })
    .then(res=>res.text())
    .then(resDeleteData=>{
      // resGetReviewData = 리뷰가 성공적으로 보내졌는지 유무
      if(resDeleteData){
        alert('성공적으로 삭제되었습니다.');
        oriWriteUserReview = null;
        //setOriWriteUserReview(writeUserReview);
        setWriterIsReview(false);

        loadBook();
        writeUserReview.re_content = '';
        setWriteUserReview({...writeUserReview, re_content : ' '});
        setWriteUserReview({...writeUserReview, re_star : 0});
        selectReviewList(page.currentPage);//리뷰 목록 다시가져오기
        changePageOri();//페이지 번호 재설정
      }
      else
        alert('리뷰삭제를 실패했습니다.');
    })
    .catch(e=>console.error(e));
  }//리뷰삭제

  function changeContent(e){
    setWriteUserReview(prev => {
      return {...prev, re_content: e.target.value}
    });
  }//컨텐츠 작성

  const selectStar = (e) => {
    e.target.previousElementSibling.checked = true;
    setWriteUserReview(prev => {
      return {...prev, re_star: e.target.previousElementSibling.value}
    });
    
    //changeStar(e.target.previousElementSibling.value);
  }

  function TestStar(starValue){
    if(starValue<=0 || starValue>5){
      alert("별점을 작성해주세요.");
      return false;
    }
    return true;
  }//별점이 0점이하 5점 초과 시 false

  function checkReview(){
    if(user?.me_id ==null)
      return;

    fetch('/review/selectMyReview/' + bookNum + '/' + user?.me_id, {
      //method : "post",
      body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.text())
    .then(userReviewData=>{
      // userReviewData = 유저의 리뷰 없으면 null
      if(userReviewData){
        setWriterIsReview(true);
        writeUserReview = JSON.parse(userReviewData);
        setWriteUserReview(writeUserReview);
        oriWriteUserReview = writeUserReview;
        setOriWriteUserReview(writeUserReview);
      }
    })
    .catch(e=>console.error(e));
  }//해당 유저가 리뷰를 썼는지

  function selectReviewList(currentPageNum, successSelectReviewList = null){
    var pageNum = (currentPageNum - 1) * reviewPageCount;
    
    fetch("/review/selectReview/" + bookNum + "/" + pageNum, {
      method : "post",
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.json())
    .then(reviewListData=>{
      // reviewListData = 리뷰 목록 데이터
      var objs = [];
      objs = [...reviewListData.reviewList];
      setReviewList(objs);
      if(successSelectReviewList)
        successSelectReviewList()// 리뷰목록을 성공적으로 가져오면 실행하기
    })
    .catch(e=>console.error(e));
  }//리뷰 목록(현제 페이지 번호, 성공할 시 실행할 메소드)

  function selectReviewCount (){
    fetch('/review/reviewCount/' + bookNum, {
      method : "post",
      body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.text())
    .then(reviewCount=>{
      page.contentsCount = reviewCount
      page = MakePage(page.contentsCount,page.currentPage);
      setPage({...page});
    })
    .catch(e=>console.error(e));
  }//리뷰 개수

  function changePage(index){
    var i;
    if(typeof index === 'number'){//index가 정수값일 때
      
      i = index;

      const successSelectPage =  function(){
        page.currentPage = i;
        page = MakePage(page.contentsCount,page.currentPage);
        setPage({...page});
      }
  
      selectReviewList(i,successSelectPage);//리뷰 목록 바꾸기
      return;
    }else{
      i ={index : 0}
      i = index
    }//index가 객체값일 때
    const successSelectPage =  function(){
      page.currentPage = page.pageList[i.index];

      page = MakePage(page.contentsCount,page.currentPage);

      setPage({...page});
    }

    selectReviewList(page.pageList[i.index],successSelectPage);//리뷰 목록 바꾸기
    //페이지 바꾸기
  }//페이지가 바뀔 때

  function changePageOri(){
    selectReviewCount();
    page = MakePage(page.contentsCount,page.currentPage);
    setPage({...page})
  }// page.currentPage로 페이지 변경

  function userReport(id,content,reviewNum){
    report.rp_target = id;
    report.rp_id =bookReviewReport(reviewNum);//bookReviewReport(reviewNum);
    report.rp_content = '신고 위치 : 책 리뷰에서 신고, '+ '신고 내용 : ' +content;
    setReport({...report});
  }//유저 리폿할 때

  //console.log(렌더링 횟수);
  useEffect(() => {
      selectReviewCount();//리뷰 개수
      selectReviewList(page.currentPage);  //리뷰 리스트 목록
      checkReview();  //리뷰 썼는지 확인
  }, []); //처음 시작할 때
  return (
    <Fragment>
      <div className="theme-box review-write">
        <div className="star-rating">
        {[...Array(parseInt(5))].map((n, i) => {
					return(
            <Fragment>
              <Input
              type="radio"
              cls="star"
              value={i + 1}
              name="rating" 
              checked={writeUserReview.re_star == i + 1}/>
              <label onClick={(e) => selectStar(e)}>{i+1}</label>
          </Fragment>
          )
        })}
				</div>

        <textarea style={{background: '#fff'}} onChange={e => changeContent(e)} placeholder="최대 255자 입력 가능"></textarea>

        <Button click={insertReview} text="작성" cls="btn btn-point"/>
      </div>

      <div className="review-list">
        <ul>
        {reviewList.length === 0 ? <li className="no-data txt-center">작성된 리뷰가 없습니다</li> :
        reviewList.map((item, index) => (
          <li key={index}>
            <div className="theme-box pf"></div>

            <div className="review-content">
              <div className="review-header">
                <strong>{item.me_nickname}</strong>
                {(() => {
                  const date = new Date(item.re_date);
                  const y = date.getFullYear();
                  const m = date.getMonth();
                  const d = date.getDate();
                  return (<span className="review-date">{y}.{m}.{d}</span>);
                })()}
              </div>
              <div className="rating">
                <StarRating score={item.re_star}/>
              </div>
              
              <p>{item.re_content}</p>
              
              <div className="review-footer">
                {item.me_nickname ===user.me_nickname ? (<Button click={updateReview} text="수정" cls="btn btn-point"/>) : ''}
                {item.me_nickname ===user.me_nickname ? (<Button click={deleteReview} text="삭제" cls="btn"/>) : ''}
                {item.me_nickname !==user.me_nickname ? (<Button click={() => {userReport(item.re_me_id,item.re_content,item.re_num); setModalIsOpen(true)}} text="신고" cls="btn btn-danger" />) : ''}
              </div>
            </div>
          </li>
          ))}
        </ul>
        
        <Button click={()=>changePage(page.currentPage-1)}  cls="btn" disabled = {!page.prev} text="이전"/>
        
        {page.pageList.map((item,index)=>{
            return(<Button click={()=>changePage({index})} disabled={page.currentPage===(index+1)} key={index} cls="btn" text={item}/>)
        })}

        <Button click={()=>changePage(page.currentPage+1)}  cls="btn" disabled = {!page.next} text="다음"/>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: 'rgba(1, 1, 1, 0.5)', zIndex:100 },
          content: { color: 'black', padding: '20px', borderRadius: '8px'},
        }}
      >
       <Report reportTypeList={reportType} getReport={report} exit={()=>setModalIsOpen(false)}/>
      </Modal>
    </Fragment>
  );
}

export default BookReview;