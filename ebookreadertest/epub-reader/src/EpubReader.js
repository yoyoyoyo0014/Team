import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';

const EpubReader = () => {
  const viewerRef = useRef(null); // 뷰어를 참조하기 위한 ref
  const renditionRef = useRef(null); // 렌디션을 참조하기 위한 ref
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 (0부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [startPage, setStartPage] = useState(1); // 시작 페이지 (사용자에게 보여줄 때 1부터 시작)

  useEffect(() => {
    const book = ePub("/epub/book.epub"); // EPUB 파일 로드

    const initializeBook = async () => {
      try {
        await book.loaded; // 책 로딩 완료 대기
        const spine = book.spine; // 책의 spine 정보 가져오기
        const pageCount = spine.length; // 페이지 수
        setTotalPages(pageCount); // 전체 페이지 수 설정

        // 로컬 스토리지에서 현재 페이지 불러오기
        const savedPage = localStorage.getItem('currentPage');
        const pageToDisplay = savedPage ? parseInt(savedPage, 10) : currentPage;
        setCurrentPage(pageToDisplay); // 현재 페이지 설정

        if (viewerRef.current) {
          const rendition = book.renderTo(viewerRef.current, {
            width: "100%",
            height: "100%",
          });

          rendition.display(pageToDisplay); // 특정 페이지 표시
          renditionRef.current = rendition;

          rendition.on("relocated", (location) => {
            const pageList = rendition.pagination;
            if (pageList) {
              const pageNumber = pageList.currentPage || 0; 
              setCurrentPage(pageNumber); 
              localStorage.setItem('currentPage', pageNumber);
            }
          });
        }
      } catch (error) {
        console.error("EPUB 책 로드 중 오류:", error);
      }
    };

    const checkViewerReady = setInterval(() => {
      if (viewerRef.current) {
        initializeBook(); // 뷰어가 준비되면 책 초기화
        clearInterval(checkViewerReady);
      }
    }, 100);

    return () => {
      clearInterval(checkViewerReady); // 컴포넌트 언마운트 시 인터벌 정리
      if (renditionRef.current) {
        renditionRef.current.destroy();
      }
    };
  }, []);

  // 다음 페이지로 이동
  const goToNextPage = () => {
    if (renditionRef.current) {
      renditionRef.current.next().then(() => {
        const newPageNumber = currentPage + 1;
        setCurrentPage(newPageNumber); // 현재 페이지 업데이트
        localStorage.setItem('currentPage', newPageNumber);
      });
    }
  };

  // 이전 페이지로 이동
  const goToPrevPage = () => {
    if (renditionRef.current) {
      renditionRef.current.prev().then(() => {
        const newPageNumber = currentPage - 1;
        setCurrentPage(newPageNumber); // 현재 페이지 업데이트
        localStorage.setItem('currentPage', newPageNumber);
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
