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
  const [postImage, setPostImage] = useState(null); // 게시글 이미지 파일
  const [contentImage, setContentImage] = useState(null); // 게시글 내용 이미지 파일
  const [postImagePreview, setPostImagePreview] = useState(""); // 게시글 이미지 미리보기 URL
  const [contentImagePreview, setContentImagePreview] = useState(""); // 게시글 내용 이미지 미리보기

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

  // 게시글 이미지 파일이 변경될 때 미리보기 URL 설정
  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPostImagePreview(previewUrl);
    }
  };

  // 게시글 내용 이미지 파일이 변경될 때 미리보기 URL 설정
  const handleContentImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContentImage(file);
      const previewUrl = URL.createObjectURL(file);
      setContentImagePreview(previewUrl);
    }
  };

  function btnClick() {
    const formData = new FormData();
    formData.append('po_num', po_num);
    formData.append('po_title', title);
    formData.append('po_content', content);
    formData.append('po_me_nickname', me_nickname); // 작성자 ID 추가
    
    // 이벤트 시작일과 종료일을 ISO 형식의 문자열로 변환하여 추가
    if (start) formData.append('po_start', start.toISOString());
    if (end) formData.append('po_end', end.toISOString());
  
    // 이미지 파일이 있는 경우에만 추가
    if (postImage) formData.append('postImage', postImage);
    if (contentImage) formData.append('contentImage', contentImage);
  
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
      {(po_co_num === 3 || po_co_num === 4) && (
        <div>
          {/* 게시글 이미지 업로드 필드 */}
          <div className="image">
            <label htmlFor="postImage">게시글 이미지:</label>
            <input type="file" id="postImage" name="postImage" className="form-control" accept="image/*" onChange={handlePostImageChange} />
            {postImagePreview && (
              <div>
                <img src={postImagePreview} alt="게시글 이미지 미리보기" style={{ width: '200px', height: 'auto', marginTop: '10px' }} />
              </div>
            )}
          </div>

          {/* 게시글 내용 이미지 업로드 필드 */}
          <div className="image">
            <label htmlFor="contentImage">게시글 내용 이미지:</label>
            <input type="file" id="contentImage" name="contentImage" className="form-control" accept="image/*" onChange={handleContentImageChange} />
            {contentImagePreview && (
              <div>
                <img src={contentImagePreview} alt="게시글 내용 이미지 미리보기" style={{ width: '200px', height: 'auto', marginTop: '10px' }} />
              </div>
            )}
          </div>
        </div>
      )}
      <button className="btn btn-primary" onClick={btnClick}>
        게시글 수정
      </button>
    </div>
  );
}

export default Update;
