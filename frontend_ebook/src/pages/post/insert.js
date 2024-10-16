import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Insert() {
  const { co_num } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // 로그인한 사용자의 아이디를 설정 (예: 로컬 스토리지나 서버에서 가져오기)
    const loggedInUserId = localStorage.getItem('me_id');
    setWriter(loggedInUserId || "admin123");
  }, []);

  const btnClick = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    
    // 제목과 내용이 비어 있는지 확인
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    // 서버에 전송할 게시글 데이터
    let post = {
      po_title: title,
      po_me_id: writer,
      po_content: content,
      po_co_num: parseInt(co_num, 10),
      po_date: new Date().toISOString() // 현재 시간을 ISO 문자열로 변환하여 po_date 설정
    };

    // 서버로 POST 요청 보내기
    fetch(`/post/insert/${co_num}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.result) {
        alert('게시글이 등록되었습니다.');
        navigate(`/post/list/${co_num}`);
      } else {
        alert('게시글 등록에 실패했습니다.');
      }
    })
    .catch((error) => {
      console.error('Error adding post:', error);
      alert('게시글 등록 중 오류가 발생했습니다.');
    });
  };

  return (
    <div>
      <h1>게시글 등록</h1>
      <form onSubmit={btnClick}>
        <div className="form-group">
          <label htmlFor="title">제목:</label>
          <input type="text" id="title" name="title" className="form-control" placeholder="제목을 입력하세요." onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <div className="form-group">
          <label htmlFor="writer">작성자:</label>
          <input type="text" id="writer" name="writer" className="form-control" value={writer} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용:</label>
          <textarea id="content" name="content" className="form-control" style={{ minHeight: '400px', height: 'auto' }} placeholder="내용을 입력하세요." onChange={(e) => setContent(e.target.value)} value={content}></textarea>
        </div>
        <button type="submit" className="btn btn-outline-info col-12">게시글 등록</button>
      </form>
      <a className="btn btn-outline-info" href={`/post/list/${co_num}`}>목록으로</a>
    </div>
  );
}

export default Insert;