import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const MyBooks = () => {
  const { bl_me_id } = useParams(); // URL에서 회원 ID 가져오기
  const [myBooks, setMyBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
      console.error("Error fetching my books:", error); // 콘솔에 오류 출력
      setErrorMessage("구매한 책 목록을 가져오는 중 오류가 발생했습니다.");
    }
  }, [bl_me_id]);

  useEffect(() => {
    fetchMyBooks();
		console.log(myBooks);
  }, [fetchMyBooks]);

  return (
		<div>
			<h1>내 책꽂이</h1>
			{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
			<ul>
				{myBooks.length > 0 ? (
					myBooks.map(book => (
						<li key={book.bl_bk_num}>
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
