import {useState} from 'react';

async function ReportType() {
    try {
      // fetch 요청이 완료될 때까지 대기
      const response = await fetch("api/report/selectReportType", {
          method: "post",
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const reportTypeListData = await response.json();
      return reportTypeListData;
  } catch (e) {
      console.error(e);
      return undefined;
  }
}



export default ReportType;
