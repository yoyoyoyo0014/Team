import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import { useParams } from 'react-router-dom';
import "../../css/reader.css";
import Button from '../../components/form/button';


const EpubReader = () => {
  const bk_num = useParams().bk_num;
  let rendition = null;

  const viewerRef = useRef(null); // 뷰어를 참조하기 위한 ref
  const renditionRef = useRef(null); // 렌디션을 참조하기 위한 ref
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 (0부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [startPage, setStartPage] = useState(1); // 시작 페이지 (사용자에게 보여줄 때 1부터 시작)

  useEffect(() => {
    const book = ePub(`/epub/book_${bk_num}.epub`); // EPUB 파일 로드

    // if (book.isOpen === false) {
    //   alert('존재하지 않는 책입니다');
    //   console.log(book);
    //   navigate(-1);
    // }
    
    const initializeBook = async () => {
      try {
        await book.loaded; // 책 로딩 완료 대기
        
        const spine = book.spine; // 책의 spine 정보 가져오기
        const pageCount = spine.length; // 페이지 수
        setTotalPages(pageCount); // 전체 페이지 수 설정
        
        // 로컬 스토리지에서 현재 페이지 불러오기
        const savedPage = localStorage.getItem('currentPage');
        console.log('hi');
        console.log(savedPage);
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
    let newPageNumber = parseInt(event.target.value);
    
    if (Number.isNaN(newPageNumber)) setCurrentPage(1);

    if (newPageNumber <= 0)
      setCurrentPage(1);
    else if (newPageNumber >= totalPages)
      setCurrentPage(totalPages);
    else
      setCurrentPage(newPageNumber); // 현재 페이지 업데이트
    localStorage.setItem('currentPage', currentPage);

    if (renditionRef.current) show(currentPage - 1);
  };

  const show = (e) => {
    //renditionRef.current.display(e.target.value - 1); // 슬라이더에서 선택한 페이지 표시
    let val = e.target.value;
    if (val.length === 0) setCurrentPage(0);
    let newPageNumber = parseInt(val);

    console.log('hi2', val);
  }

  // const setPage = (e) => {
  //   let to = parseInt(e.target.value) - 1;
  //   if (to < totalPages)
  //     setCurrentPage(to);
  //   renditionRef.current.display(to);
  // }
  
  const progress = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

  return (
    <div className="theme-box">
      <input type="hidden" value={progress.toFixed(2)} />
      {/* <div ref={viewerRef} style={{ width: '100%', height: '600px'}} /> */}
      <p className="book-paging">
        <input
          type="number"
          name="showcPage"
          id="showcPage"
          value={startPage}
          onChange={show}
          inInput={e => this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}/> /
        {totalPages}</p>
      <Button cls="btn" click={goToPrevPage} disabled={currentPage <= 0} text="이전"/>
      <Button cls="btn" click={goToNextPage} disabled={currentPage >= totalPages - 1} text="다음"/>
      <input
        className="range"
        type="range"
        min="1"
        max={totalPages} 
        value={currentPage}
        onChange={show}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default EpubReader;