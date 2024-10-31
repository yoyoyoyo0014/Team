import React, { useState, useEffect } from "react";
import "./memberManagement.css";

function MemberManagement() {
  const [reportData, setReportData] = useState([]); // 데이터 저장용 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalItems, setTotalItems] = useState(0); // 총 아이템 개수 상태 추가
  const itemsPerPage = 10; // 페이지 당 항목 수

  useEffect(() => {
    // 백엔드에서 데이터 불러오기
    fetch(`/report/list?page=${currentPage}&size=${itemsPerPage}`)
    .then((response) => response.json())
    .then((data) => {

      console.log("Fetched Data:", data); // 응답 데이터 확인

      setReportData(data.list || []); // 데이터 목록 설정
      setTotalItems(data.pageMaker?.totalCount || 0); // pageMaker 객체의 totalCount로 접근

      console.log("Total Items:", totalItems);
      console.log("Items Per Page:", itemsPerPage);
      console.log("Total Pages:", Math.ceil(totalItems / itemsPerPage));

    })
    .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage]);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="report-container">
      {/* 상단 레이블 */}
      <div className="report-item item-sender">신고자</div>
      <div className="report-item item-target">신고 대상</div>
      <div className="report-item item-content">신고 내용</div>
      <div className="report-item item-type">신고 유형</div>
      <div className="report-item item-time">신고 시간</div>

      {reportData.length === 0 ? (
        <div className="no-reports">등록된 신고가 없습니다.</div>
      ) : (
        reportData.map((item, index) => (
          <React.Fragment key={index}>
            <div className="report-content content-sender">{item.rp_me_id}</div>
            <div className="report-content content-target">{item.rp_target}</div>
            <div className="report-content content-content">{item.rp_content}</div>
            <div className="report-content content-type">{item.rp_rt_num}</div>
            <div className="report-content content-time">{item.rp_date}</div>
          </React.Fragment>
        ))
      )}

      {/* 페이지네이션 버튼 */}
      {reportData.length > 0 && (
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            이전
          </button>
          {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}>
            다음
          </button>
        </div>
      )}
      </div>
  );
}

export default MemberManagement;
