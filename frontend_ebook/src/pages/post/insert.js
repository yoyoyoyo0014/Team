import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Insert() {
  const { co_num } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState(() => localStorage.getItem('writer') || 'admin123');
  const [nickname, setNickname] = useState("관리자");
  const [content, setContent] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const btnClick = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
  
    // 필수 필드가 비어 있는지 확인
    if (!title) {
      alert('제목을 입력하세요.');
      return;
    }
  
    if (!writer) {
      alert('작성자 정보가 설정되지 않았습니다.');
      return;
    }
  
    if (!content) {
      alert('내용을 입력하세요.');
      return;
    }
  
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
  
    const requestData = {
      po_title: title,
      po_me_id: writer,
      po_me_nickname: nickname,
      po_content: content,
      po_co_num: co_num,
      po_start: start ? start.toISOString().split('T')[0] : null,
      po_end: end ? end.toISOString().split('T')[0] : null,
      po_date: formattedDate, // 시 분까지 저장된 현재 날짜 추가
    };
  
    fetch(`/post/insert/${co_num}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          // 서버에서 상태 코드와 메시지를 포함한 응답을 받을 때 처리
          return response.json().then((data) => {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          alert('게시글이 등록되었습니다.');
          navigate(`/post/list/${co_num}`);
        } else {
          alert(`게시글 등록에 실패했습니다. 서버 메시지: ${data.message || '알 수 없는 오류'}`);
        }
      })
      .catch((error) => {
        console.error('Error adding post:', error);
        alert(`게시글 등록 중 오류가 발생했습니다: ${error.message}`);
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
