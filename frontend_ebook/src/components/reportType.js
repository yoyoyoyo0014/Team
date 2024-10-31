import {useState} from 'react';

async function ReportType() {
    try {
      // fetch 요청이 완료될 때까지 대기
      const response = await fetch("/report/selectReportType", {
          //method: "post",
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const reportTypeListData = await response.json();
      return reportTypeListData;
  } catch (e) {
      console.error(e);
      return undefined;
      // <Report reportTypeList={reportType} getReport={report} exit={()=>setModalIsOpen(false)}/>
  }
}



export default ReportType;
