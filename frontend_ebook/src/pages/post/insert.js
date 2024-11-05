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
  const [postLinkPreview, setPostLinkPreview] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState(null);

  // 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (co_num === '3' || co_num === '4') {
      setContent("이벤트");
    }
  }, [co_num]);

  const handlePostLinkChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostLinkPreview(URL.createObjectURL(file));
    } else {
      setPostLinkPreview(null);
    }
  };

  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImagePreview(URL.createObjectURL(file));
    } else {
      setPostImagePreview(null);
    }
  };

  const btnClick = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

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

    const formData = new FormData();
    formData.append('po_title', title);
    formData.append('po_me_id', writer);
    formData.append('po_me_nickname', nickname);
    formData.append('po_content', content);
    formData.append('po_co_num', co_num);
    formData.append('po_start', start ? start.toISOString().split('T')[0] : '');
    formData.append('po_end', end ? end.toISOString().split('T')[0] : '');
    formData.append('po_date', formattedDate);

    // 이미지 파일 추가
    if(co_num === '3' || co_num === '4'){
      const postLinkFile = document.getElementById('postLinkFile').files[0];
      if (postLinkFile) {
        formData.append('po_link', postLinkFile);
      }

      const postImageFile = document.getElementById('postImageFile').files[0];
      if (postImageFile) {
        formData.append('po_image', postImageFile);
      }
    }
    fetch(`/post/insert/${co_num}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
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
      <h1 style={{marginBottom: '20px'}}>게시글 등록</h1>
      <form onSubmit={btnClick}>
        <div className="form-group">
          <label htmlFor="title">제목:</label>
          <input type="text" id="title" name="title" className="form-control" placeholder="제목을 입력하세요." onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <input type="hidden" id="writer" name="writer" value={writer} readOnly />
        <input type="hidden" id="nickname" name="nickname" value={nickname} readOnly />

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
        {(co_num !== '3' && co_num !== '4') && (
          <div className="form-group">
            <label htmlFor="content">내용:</label>
            <textarea id="content" name="content" className="form-control" style={{ height: '400px', width: '100%', border: '1px solid lightgray', borderRadius: '15px', padding: '15px 15px' }} placeholder="내용을 입력하세요." onChange={(e) => setContent(e.target.value)} value={content}></textarea>
          </div>
        )}
        
        {(co_num === '3' || co_num === '4') && (
          <>
            {/* 이미지 파일 입력 필드 및 미리보기 추가 */}
            <div className="form-group">
              <label htmlFor="postLinkFile">게시글 리스트 이미지:</label>
              <input type="file" id="postLinkFile" name="postLinkFile" className="form-control" onChange={handlePostLinkChange} />
              {postLinkPreview && <img src={postLinkPreview} alt="게시글 리스트 이미지 미리보기" style={{ marginTop: '10px', maxHeight: '200px' }} />}
            </div>

            <div className="form-group">
              <label htmlFor="postImageFile">이벤트 이미지:</label>
              <input type="file" id="postImageFile" name="postImageFile" className="form-control" onChange={handlePostImageChange} />
              {postImagePreview && <img src={postImagePreview} alt="이벤트 이미지 미리보기" style={{ marginTop: '10px', maxHeight: '200px' }} />}
            </div>
          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
          <a className="btn btn-outline-info" href={`/post/list/${co_num}`}>목록으로</a>
          <button type="submit" style={{ display: 'flex', gap: '10px' }} className="btn btn-outline-info col-12">게시글 등록</button> 
        </div>
      </form>
    </div>
  );
}

export default Insert;
