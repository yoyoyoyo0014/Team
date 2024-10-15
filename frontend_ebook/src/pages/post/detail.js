import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Detail() {
  const { po_num } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatDate(isoString) {
    const date = new Date(isoString);
    const today = new Date();

    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    if (isToday) {
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
  }

  useEffect(() => {
    // 게시글 정보를 가져오기 위해 fetch 호출 (가정: API 경로는 /post/detail/{po_num})
    fetch(`/post/detail/${po_num}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.post) {
          setPost(data.post);
        } else {
          console.error("No post data received");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        setError(error);
        setLoading(false);
      });
  }, [po_num]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container">
      <h1 style={{marginBottom: '50px'}}>게시글 상세</h1>
      <div className="form-group">
        <label htmlFor="po_title">제목</label>
        <input type="text" id="po_title" className="form-control" value={post.po_title || ''} readOnly/>
      </div>

      <div className="form-group">
        <label htmlFor="po_me_id">작성자</label>
        <input type="text" id="po_me_id" className="form-control" value={post.po_me_id || ''} readOnly />
      </div>

      <div className="form-group">
        <label htmlFor="po_date">작성일</label>
        <input type="text" id="po_date" className="form-control" value={formatDate(post.po_date) || ''} readOnly/>
      </div>

      <div className="form-group">
        <label htmlFor="po_view">조회수</label>
        <input type="text" id="po_view" className="form-control" value={post.po_view || ''} readOnly/>
      </div>

      <div className="form-group">
        <label htmlFor="po_like">추천수</label>
        <input type="text" id="po_like" className="form-control" value={post.po_like || ''} readOnly/>
      </div>

      <div className="form-group">
        <label htmlFor="po_content">내용</label>
        <textarea id="po_content" className="form-control" value={post.po_content || ''} readOnly style={{ height: '400px' }}/>
      </div>

      <button className="btn btn-outline-success" onClick={() => navigate(`/post/list/${post.po_co_num}`)}>목록으로</button>
      {post.po_me_id && (
        <div>
          <button className="btn btn-outline-primary" onClick={() => navigate(`/post/update/${post.po_num}`)}>수정하기</button>
          <button className="btn btn-outline-danger" onClick={() => navigate(`/post/delete/${post.po_num}`)}>삭제하기</button>
        </div>
      )}
    </div>
  );
}

export default Detail;
