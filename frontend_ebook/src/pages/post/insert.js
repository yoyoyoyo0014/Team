import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Insert() {
  const { co_num } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const btnClick = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
  
    // 서버에 전송할 데이터
    const formData = new FormData();
    formData.append("po_title", title);
    formData.append("po_me_id", writer);
    formData.append("po_me_nickname", nickname);
    formData.append("po_content", content);
    formData.append("po_co_num", co_num);
    if (start) formData.append("po_start", start);
    if (end) formData.append("po_end", end);
  
    fetch(`/post/insert/${co_num}`, {
      method: 'POST',
      body: formData, // FormData를 직접 전송
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
        <input type="hidden" id="writer" name="writer" value={writer} readOnly />
        <input type="hidden" id="nickname" name="nickname" value={nickname} readOnly />

        {/* co_num이 3 또는 4일 경우에만 이벤트 기간 입력 필드 표시 */}
        {(co_num === '3' || co_num === '4') && (
          <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label>이벤트 시작일</label>
              <DatePicker selected={start} onChange={(date) => setStart(date)} dateFormat="yyyy/MM/dd" className="form-control"/>
            </div>
            <div style={{ flex: 1 }}>
              <label>이벤트 종료일</label>
              <DatePicker selected={end} onChange={(date) => setEnd(date)} dateFormat="yyyy/MM/dd" className="form-control"/>
            </div>
          </div>
        )}

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
