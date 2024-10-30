import React from "react";
import "./memberManagement.css";

function MemberManagement() {
  const reportData = {
    rp_me_id: "홍길동",
    rp_target: "대상 이름",
    rp_content: "신고 내용 예시입니다.",
    rp_rt_num: 1,
    rp_date: "2024-10-30 12:34:56"
  };

  return (
    <div className="report-container">
      {/* 상단 레이블 */}
      <div className="report-item item-sender">신고자</div>
      <div className="report-item item-target">신고 대상</div>
      <div className="report-item item-content">신고 내용</div>
      <div className="report-item item-type">신고 유형</div>
      <div className="report-item item-time">신고 시간</div>
      <div className="report-item item-settings">정지 기간 설정</div>
      <div className="report-item item-period">º</div>

      {/* 하단 내용 */}
      <div className="report-content content-sender">{reportData.rp_me_id}</div>
      <div className="report-content content-target">{reportData.rp_target}</div>
      <div className="report-content content-content">{reportData.rp_content}</div>
      <div className="report-content content-type">{reportData.rp_rt_num}</div>
      <div className="report-content content-time">{reportData.rp_date}</div>
      <div className="report-content content-settings">정지 기간 설정 값</div>
      
			 {/* 확인 버튼 */}
			 <div className="report-content content-period">
        <button type="button" className="confirm-button">확인</button>
      </div>

    </div>
  );
}

export default MemberManagement;
