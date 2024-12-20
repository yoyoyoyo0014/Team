
import {useState, useEffect, useContext} from 'react';
import ReportType from './reportType';
import { LoginContext } from '../context/LoginContext';
import Button from './form/button';
export function Report({getReport,exit}) {
  //user = 해당 유저
  //reportUser = 신고 당한 유저
  //content = 신고 내용
  let [reportType, setReportType] = useState([]);//신고 타입 객체
  const {user} = useContext(LoginContext);

  let [report,setReport] = useState({
    rp_num : 0,
    rp_me_id : '',
    rp_target : '',
    rp_content : '',
    rp_rt_num : 0,
    rp_id : ''
  })//신고객체

  let reportContent = getReport.rp_content//신고 사유
  let reportTypeNum = 1;  //신고 유형 번호

  function clickReportButton(){
    if(getReport.rp_me_id == getReport.rp_target){
      alert("신고할 수 없는 대상입니다.");
      exit();
    }//신고유저가 신고한 유저랑 같을 때 반환
    else if(reportTypeNum==0){
      alert("신고 유형을 선택해주세요");
      return;
    } else{
      report.rp_me_id = user?.me_id;
      report.rp_target = getReport.rp_target;
      report.rp_content = getReport.rp_content +  '신고 사유 : ' + reportContent;
      report.rp_rt_num = reportTypeNum;
      report.rp_id = getReport.rp_id;
      (async ()=>{
        var exist = await CheckReport(report);
        if(exist){
          alert('이미 접수된 신고입니다.')
          exit();
        }
        else
        {submitReport(report,exit())}
      })();
    }
  }//신고 보내기

  
  function submitReport(report,successSubmitReport){
    if(!user?.me_id){
      alert('로그인을 해주세요')
      return;
    }
    var targetId = report.rp_target;
    fetch("/report/insertReport/"+user?.me_id+"/"+
      targetId+"/"+reportTypeNum+"/NotUsed/"+reportContent,{
      //body : JSON.stringify(report),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.text())
    .then(successReportData=>{
      // resGetReviewData = 리뷰가 성공적으로 보내졌는지 유무
      if(successReportData){
        alert('신고가 접수 되었습니다');
        if(successSubmitReport)
          successSubmitReport();// 신고가 접수되면 실행
      } else alert('신고 접수가 되지 않았습니다.');
    })
    .catch(e=>console.error(e));
  }//신고 하기
  async function CheckReport(report){
    return null;
    // if(report.rp_me_id == null){
    //   return;
    // }
    // var meId = report.rp_me_id;
    // var targetId = report.rp_target;
    // var rpId = report.rpId;
    // try {
    //   // fetch 요청이 완료될 때까지 대기
    //   const response = await fetch("/bookReview/report/existReport/"+meId+"/"+
    //     targetId+"/NotUsed",{
    //       //method: "post",
    //       headers: {
    //           'Content-Type': 'application/json',
    //       },
    //   });
    //   const exitReport = await response.json();
    //   return exitReport;
    // } catch (e) {
    //   console.error(e);
    //   return false;;
    // }
  }//신고있는지 확인

  async function settingReportType() {
    var list =[]
    list = await ReportType();
    reportType = list;
    
    setReportType([...reportType]);
  }//리폿 타입 가져오기

  useEffect(() => {
    settingReportType();
  }, []); //처음 시작할 때

  return (
    <div>
      <div className="theme-box genre-wrapper">
      {reportType.map((item,index)=>{
        return(
          <><input
            defaultChecked={index === 0}
            onClick={()=>{
              reportTypeNum = index+1;
            }} type='radio' name="reportType" id={"reportType_" + item.rt_num} />  
          <label htmlFor={"reportType_" + item.rt_num}>{item.rt_name}</label></>
        )
      })}
      </div>
      <br/>
      <textarea onChange={e=>reportContent=e.target.value}
        maxLength="255"  placeholder="신고사유"></textarea>
      <button className="btn btn-point" onClick={clickReportButton}>신고하기</button>
      <button className="btn btn-point" onClick={exit}>취소</button>
    </div>
  )
}
//
export function bookReviewReport(targetNum){
  return 'BR';
}//책리뷰 신고 할 때
export default Report;