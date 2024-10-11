import {useState} from 'react';
import React, { useEffect } from 'react';
import MakePage from './pageButton';
import Modal from 'react-modal';
import Report, { bookReviewReport } from './report';
import ReportType from './reportType';

Modal.setAppElement('#root'); // 접근성 관련 설정 (필수)

function BookReview({bookNum,userId,userIsBuy}) {
  //bookNum = 받을 책 번호
  //userIsBuy = 유저가 이미 책을 샀는가
  //review =  유저가 리뷰를 작성 하면 받는 값
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const reviewPageCount = 5;//한 페이지에 존재하는 리뷰 수

  let [reviewList,setReviewList] = useState([]); //리뷰 리스트
  
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
    rp_me_id : userId,
    rp_target : '',
    rp_content : '',
    rp_rt_num : 0,
    rp_id : ''
  })//신고객체

  function insertReview(){
    if(writerIsReview){
      alert('이미 리뷰를 작성하였습니다.')
      return;
    }
    if(!userIsBuy){
      alert('책을 구매하지 않았습니다.')
      return;
    }
    if(userId == null){
      alert('유저의 정보를 찾지 못하였습니다.')
      return;
    }

    writeUserReview.re_me_id =  userId;
    writeUserReview.re_bk_num = bookNum; //리뷰 책 번호 세팅
    setWriteUserReview(writeUserReview);

    if(!TestStar(writeUserReview.re_star))
      return;//제대로 된 별점 X

    fetch('/ebook/insertReview',{
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
        alert('성공적으로 작성되었습니다.');
        setWriterIsReview(true);
        oriWriteUserReview = writeUserReview;
        selectReviewList(page.currentPage);//리뷰 목록 다시가져오기
        changePageOri();//페이지 번호 재설정
      }
      else
        alert('리뷰가 작성되지 않았습니다.');
    })
    .catch(e=>console.error(e));
  }//유저가 리뷰를 쓸 때

  function updateReview(){
    if(oriWriteUserReview.re_content == writeUserReview.re_content &&
       oriWriteUserReview.re_star == writeUserReview.re_star){
      alert('리뷰가 수정되지 않았습니다.');
      return;
    }
    writeUserReview.re_me_id =  userId;
    writeUserReview.re_bk_num = bookNum; //리뷰 책 번호 세팅
    setWriteUserReview(writeUserReview);

    if(!TestStar(writeUserReview.re_star))
      return;//제대로 된 별점 X

    fetch('/ebook/updateReview',{
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
        alert('성공적으로 변경되었습니다.');
        oriWriteUserReview = writeUserReview;
        setOriWriteUserReview(writeUserReview);
        selectReviewList(page.currentPage);//리뷰 목록 다시가져오기
        changePageOri();//페이지 번호 재설정
      }
      else
        alert('리뷰변경을 실패했습니다.');
    })
    .catch(e=>console.error(e));
  }//리뷰 수정

  function deleteReview(){
    if(!writerIsReview)
      return;

    fetch('/ebook/deleteReview/'+bookNum+'/'+userId,{
      method : "post",
      //body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.text())
    .then(resDeleteData=>{
      // resGetReviewData = 리뷰가 성공적으로 보내졌는지 유무
      if(resDeleteData){
        alert('성공적으로 삭제되었습니다.');
        oriWriteUserReview = null;
        //setOriWriteUserReview(writeUserReview);
        setWriterIsReview(false);

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

  function writeContent(e){
      setWriteUserReview({...writeUserReview, re_content : e.target.value});
  }//컨텐츠 작성

  function writerStar(e){
    setWriteUserReview({...writeUserReview, re_star : e.target.value});
  }//별점 작성

  function TestStar(starValue){
    if(starValue<=0 || starValue>5){
      alert("별점을 작성해주세요.");
      return false;
    }
      
    return true;
  }//별점이 0점이하 5점 초과 시 false

  function checkReview(){
    fetch('/ebook/selectMyReview/'+userId+'/'+bookNum,{
      method : "post",
      //body : JSON.stringify(writeUserReview),
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

  function selectReviewList(currentPageNum ,successSelectReviewList = null){
    var pageNum = (currentPageNum-1) * reviewPageCount;
    
    fetch("/ebook/reviewList/"+bookNum+"/"+pageNum,{
      method : "post",
      //body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.json())
    .then(reviewListData=>{
      // reviewListData = 리뷰 목록 데이터
      var objs = [];
      objs = [...reviewListData];
      setReviewList(objs);
      if(successSelectReviewList)
        successSelectReviewList()// 리뷰목록을 성공적으로 가져오면 실행하기
    })
    .catch(e=>console.error(e));
  }//리뷰 목록(현제 페이지 번호, 성공할 시 실행할 메소드)

  function selectReviewCount (){
    fetch('/ebook/reviewCount/'+bookNum,{
      method : "post",
      //body : JSON.stringify(writeUserReview),
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
    report.rp_id = bookReviewReport(reviewNum);
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
    <div>
      <label>리뷰내용
       <input value={writeUserReview.re_content} onChange={e=>writeContent(e)} type='text' maxLength="255" placeholder="최대 255자 입력 가능"/>
      </label>

      <label>평점
       <input value={writeUserReview.re_star} onChange={e=>writerStar(e)} type='number'/>
      </label>
      {writerIsReview ? ( <button onClick={updateReview}>변경</button>) : ( <button onClick={insertReview}>작성</button>)}

      {writerIsReview ? (<button onClick={deleteReview}>삭제</button>) : (<input type='hidden'/>)}
      <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>내용</th>
              <th>별점</th>
              <th>신고</th>
            </tr>
          </thead>
        
        <tbody>
        {reviewList.map((item, index) => (
            <tr key={index}>
              <td>{item.re_me_id}</td>
              <td>{item.re_content}</td>
              <td>{item.re_star}</td>
              <td><button onClick={() => {userReport(item.re_me_id,item.re_content,item.re_num);
                 setModalIsOpen(true)}}>신고하기</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={()=>changePage(page.currentPage-1)} disabled= {!page.prev}>이전</button>

      {page.pageList.map((item,index)=>{
          return(<button onClick={()=>changePage({index})} disabled={page.currentPage==(index+1)} key={index}>{item}</button>)
      })}

      <button onClick={()=>changePage(page.currentPage+1)} disabled = {!page.next}>다음</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: { color: 'black', padding: '20px', borderRadius: '8px' },
        }}
      >
        <Report reportTypeList={reportType} getReport={report} exit={()=>setModalIsOpen(false)}/>
       
      </Modal>
     
    </div>
  );
}

export default BookReview;