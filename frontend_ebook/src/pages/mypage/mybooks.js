import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MyBooks = () => {
  const { bl_me_id } = useParams(); // URL에서 회원 ID 가져오기
  const [myBooks, setMyBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // navigate 훅 사용

  const fetchMyBooks = useCallback(async () => {
    try {
      const response = await fetch(`/mypage/mybooks/${bl_me_id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMyBooks(data);
      setErrorMessage('');
    } catch (error) {
      console.error("Error fetching my books:", error);
      setErrorMessage("구매한 책 목록을 가져오는 중 오류가 발생했습니다.");
    }
  }, [bl_me_id]);

  useEffect(() => {
    fetchMyBooks();
  }, [fetchMyBooks]);

  // EPUB 리더로 이동하는 함수 정의
  const openEpubReader = (bk_num) => {
    navigate(`/epub/${bl_me_id}/${bk_num}`); // bl_me_id와 bk_num을 URL로 전달하여 이동
  };

  return (
    <div>
      <h1>내 책꽂이</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {myBooks.length > 0 ? (
          myBooks.map(book => (
            <li key={book.bl_bk_num} onClick={() => openEpubReader(book.bookVO.bk_num)}>
              <span>
                책 번호: {book.bookVO.bk_num} - 제목: {book.bookVO.bk_name} - 가격: {book.bookVO.bk_price}원
              </span>
            </li>
          ))
        ) : (
          <p>구매한 책이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default MyBooks;
