import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ePub from 'epubjs';

const EpubReader = () => {
  const { me_id, bk_num } = useParams(); // me_id와 bk_num 가져오기
  const viewerRef = useRef(null);
  const renditionRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    const book = ePub(`/epub/book${bk_num}.epub`);
  
    const initializeBook = async () => {
      try {
        await book.loaded;
        const spine = book.spine;
        const pageCount = spine.length;
        setTotalPages(pageCount);
  
        // 로컬 스토리지에서 저장된 현재 페이지를 가져오고, 유효성 체크
        const savedPage = localStorage.getItem(`currentPage_${me_id}_${bk_num}`);
        const pageToDisplay = savedPage ? parseInt(savedPage, 10) : 0;
  
        // 유효한 페이지 범위 체크
        if (pageToDisplay >= 0 && pageToDisplay < pageCount) {
          setCurrentPage(pageToDisplay);
        } else {
          setCurrentPage(0); // 유효하지 않으면 첫 페이지로 설정
        }
  
        if (viewerRef.current) {
          const rendition = book.renderTo(viewerRef.current, {
            width: "100%",
            height: "100%",
          });
  
          // 초기 페이지를 불러오기 전에 currentPage가 업데이트되도록 wait
          rendition.display(currentPage); 
          renditionRef.current = rendition;
  
          rendition.on("relocated", (location) => {
            const pageList = rendition.pagination;
            if (pageList) {
              const pageNumber = pageList.currentPage || 0;
              setCurrentPage(pageNumber);
              localStorage.setItem(`currentPage_${me_id}_${bk_num}`, pageNumber);
            }
          });
        }
      } catch (error) {
        console.error("EPUB 책 로드 중 오류:", error);
      }
    };
  
    const checkViewerReady = setInterval(() => {
      if (viewerRef.current) {
        initializeBook();
        clearInterval(checkViewerReady);
      }
    }, 100);
  
    return () => {
      clearInterval(checkViewerReady);
      if (renditionRef.current) {
        renditionRef.current.destroy();
      }
    };
  }, [me_id, bk_num]);

  // 다음 페이지로 이동
  const goToNextPage = () => {
    if (renditionRef.current) {
      renditionRef.current.next().then(() => {
        const newPageNumber = currentPage + 1;
        setCurrentPage(newPageNumber); // 현재 페이지 업데이트
        localStorage.setItem(`currentPage_${me_id}_${bk_num}`, newPageNumber); // 회원별로 페이지 저장
      });
    }
  };
  
  // 이전 페이지로 이동
  const goToPrevPage = () => {
    if (renditionRef.current) {
      renditionRef.current.prev().then(() => {
        const newPageNumber = currentPage - 1;
        setCurrentPage(newPageNumber); // 현재 페이지 업데이트
        localStorage.setItem(`currentPage_${me_id}_${bk_num}`, newPageNumber); // 회원별로 페이지 저장
      });
    }
  };
  // 슬라이더 변경 핸들러
  const handleSliderChange = (event) => {
    const newPageNumber = parseInt(event.target.value, 10);
    setCurrentPage(newPageNumber); // 현재 페이지 업데이트
    if (renditionRef.current) {
      renditionRef.current.display(newPageNumber); // 슬라이더에서 선택한 페이지 표시
      localStorage.setItem('currentPage', newPageNumber);
    }
  };

  
  const progress = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

  return (
    <div>
      <div ref={viewerRef} style={{ width: '100%', height: '600px', border: '1px solid #ccc' }} />
      <p>시작 페이지: {startPage}</p>
      <p>현재 페이지: {currentPage + 1} / {totalPages}</p>
      <p>진행률: {progress.toFixed(2)}%</p> 
      <button onClick={goToPrevPage} disabled={currentPage <= 0}>이전</button>
      <button onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>다음</button>
      <br />
      <input
        type="range"
        min="0" 
        max={totalPages - 1} 
        value={currentPage}
        onChange={handleSliderChange}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default EpubReader;
