import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';

const EpubReader = () => {
  const viewerRef = useRef(null);
  const renditionRef = useRef(null);
  const [progress, setProgress] = useState(0); // 진행률 상태

  useEffect(() => {
    const book = ePub("/epub/book.epub");
    const rendition = book.renderTo(viewerRef.current, {
      width: "100%",
      height: "100%",
    });

    rendition.display();

    // 저장된 위치가 있다면 해당 위치로 이동
    const savedLocation = localStorage.getItem("currentLocation");
    if (savedLocation) {
      rendition.display(savedLocation);
    }

    renditionRef.current = rendition;

    // 페이지가 이동할 때마다 현재 위치를 저장하고, 진행률을 계산
    rendition.on("relocated", (location) => {
      if (location && location.start) {
        const currentLocation = location.start.cfi;
				const endPage = location.end.cfi;
        const percentage = (currentLocation/endPage) * 100; // 진행률 계산 (소수점)
        setProgress(percentage.toFixed(2)); // 진행률을 2자리 소수로 설정
        localStorage.setItem("currentLocation", currentLocation);
      }
    });

    return () => {
      rendition.destroy();
    };
  }, []);

  const handleNext = () => {
    renditionRef.current.next();
  };

  const handlePrev = () => {
    renditionRef.current.prev();
  };

  return (
    <div>
      <div ref={viewerRef} style={{ width: '100%', height: '600px', border: '1px solid #ccc' }} />
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <p>Progress: {progress}%</p> {/* 진행률 표시 */}
    </div>
  );
};

export default EpubReader;
