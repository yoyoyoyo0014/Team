import React, { useState, useEffect } from "react";
import "./memberManagement.css";

function MemberManagement() {
  const [reportData, setReportData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`/report/list?page=${currentPage}&size=${itemsPerPage}`)
      .then((response) => response.json())
      .then((data) => {
        setReportData(data.list || []);
        setTotalItems(data.pageMaker?.totalCount || 0);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 팝업 열기 함수
  function openPopup(target) {
    const popupUrl = `/report-popup.html?target=${target}`;
    window.open(popupUrl, "_blank", "width=600,height=240");
  }

  return (
    <div className="report-container">
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
            <div
              className="report-content content-target"
              onClick={() => openPopup(item.rp_target)}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              {item.rp_target}
            </div>
            <div className="report-content content-content">{item.rp_content}</div>
            <div className="report-content content-type">{item.rt_name}</div>
            <div className="report-content content-time">{new Date(item.rp_date).toLocaleDateString()} {new Date(item.rp_date).toLocaleTimeString()}</div>
          </React.Fragment>
        ))
      )}

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
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

export default MemberManagement;
