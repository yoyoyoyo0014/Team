import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Update() {
  const { po_num } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [me_nickname, setMeId] = useState('');
  const [po_co_num, setPoCoNum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  // 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 게시글 정보를 가져오기
    fetch(`/post/update/${po_num}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.post) {
          setTitle(data.post.po_title || ''); // undefined가 아니라 빈 문자열로 초기화
          setContent(data.post.po_content || ''); // undefined가 아니라 빈 문자열로 초기화
          setMeId(data.post.po_me_nickname || ''); // 작성자 ID 설정
          setPoCoNum(data.post.po_co_num || null); // 커뮤니티 번호 설정
          console.log(data.post);

          // po_start와 po_end 값을 Date 객체로 변환하여 설정
          if (data.post.po_start) {
            setStart(new Date(data.post.po_start));
          }
          if (data.post.po_end) {
            setEnd(new Date(data.post.po_end));
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [po_num]);

  function btnClick() {
    const formData = new FormData();
    formData.append('po_num', po_num);
    formData.append('po_title', title);
    formData.append('po_content', content);
    formData.append('po_me_nickname', me_nickname); // 작성자 ID 추가
  
    fetch(`/post/update/${po_num}`, {
      method: 'POST',
      body: formData, // FormData를 사용하므로 Content-Type 헤더를 설정하지 않음
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert('게시글이 수정되었습니다.');
        navigate(`/post/detail/${po_co_num}/${po_num}`); // 수정된 게시글 상세 페이지로 이동
      })
      .catch((error) => console.error('Error updating post:', error));
  }
  

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '50px' }}>게시글 수정</h1>
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input type="text" id="title" name="title" placeholder="제목을 입력하세요." onChange={(e) => setTitle(e.target.value)} value={title} className="form-control"/>
      </div>
      {po_co_num === 2 && (
        <div className="form-group">
          <label htmlFor="writer">작성자</label>
          <input type="text" id="writer" name="writer" value={me_nickname} readOnly className="form-control"/>
        </div>
      )}
      {(po_co_num === 3 || po_co_num === 4) && (
        <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label>이벤트 시작일</label>
            <DatePicker selected={start} onChange={(date) => setStart(date)} dateFormat="yyyy/MM/dd" className="form-control" />
          </div>
          <div style={{ flex: 1 }}>
            <label>이벤트 종료일</label>
            <DatePicker selected={end} onChange={(date) => setEnd(date)} dateFormat="yyyy/MM/dd" className="form-control" />
          </div>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea id="content" name="content" placeholder="내용을 입력하세요." onChange={(e) => setContent(e.target.value)} value={content} className="form-control" style={{ height: '200px' }}/>
      </div>
      <button className="btn btn-primary" onClick={btnClick}>
        게시글 수정
      </button>
    </div>
  );
}

export default Update;
