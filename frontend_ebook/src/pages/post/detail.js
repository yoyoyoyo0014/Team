import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Detail() {
  const { co_num, po_num } = useParams(); // co_num과 po_num을 둘 다 받아오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    // 게시글 정보를 가져오기 위해 fetch 호출 (가정: API 경로는 /post/detail/{co_num}/{po_num})
    if (co_num && po_num) {
      fetch(`/post/detail/${co_num}/${po_num}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.post) {
            setPost(data.post);
            console.log(data.post)
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
    }
  }, [co_num, po_num]);

  const handleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      fetch(`/post/delete/${co_num}/${po_num}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          alert('게시글이 삭제되었습니다.');
          navigate(`/post/list/${co_num}`); // 삭제 후 해당 커뮤니티 목록으로 이동
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
          alert('게시글 삭제 중 오류가 발생했습니다.');
        });
    }
  };

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
      {co_num !== '3' && co_num !== '4' && (
        <div className="form-group">
          <label htmlFor="po_title">제목</label>
          <input type="text" id="po_title" className="form-control" value={post.po_title || ''} readOnly />
        </div>
      )}
      {co_num === '2' && (
        <>
        <div className="form-group">
          <label htmlFor="po_me_nickname">작성자</label>
          <input type="text" id="po_me_nickname" className="form-control" value={post.po_me_nickname || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="po_date">작성일</label>
          <input type="text" id="po_date" className="form-control" value={formatDate(post.po_date) || ''} readOnly />
        </div>
        </>
      )}
      {(co_num === '3' || co_num === '4') && (
        <div className="form-group">
          <div>
            <label>이벤트 기간</label>
            <input type="text" className="form-control" value={`${post.po_start} ~ ${post.po_end}`} readOnly style={{marginBottom: '20px'}}/>
          </div>
          <img src={`${post.po_image}`} alt="첨부 이미지"/>
        </div>
        
      )}
      {(co_num !== '3' && co_num !== '4') && (
        <div className="form-group">
          <label htmlFor="po_content">내용</label>
          <textarea id="po_content" className="form-control" value={post.po_content || ''} readOnly style={{ height: '400px' }} />
        </div>
      )}

      <button className="btn btn-outline-success" onClick={() => navigate(`/post/list/${co_num}`)}>목록으로</button>
      
        <div>
          <button className="btn btn-outline-primary" onClick={() => navigate(`/post/update/${po_num}`)}>수정하기</button>
          <button className="btn btn-outline-danger" onClick={handleDelete}>삭제하기</button>
        </div>
    </div>
  );
}

export default Detail;
