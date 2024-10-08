import React from 'react';

function PostDetail({ po_title, po_me_id, po_date, po_view, po_like, po_content, prev_post, next_post }) {
  return (
    <div className="container">
      <h2>게시글 상세 페이지</h2>

      <div className="form-group">
        <label htmlFor="po_title">제목</label>
        <input type="text" id="po_title" className="form-control" value={po_title} readOnly/>
      </div>

      <div className="form-group">
				<label htmlFor="po_me_id">작성자</label>
        <input type="text" id="po_me_id" className="form-control" value={po_me_id} readOnly />
      </div>

      <div className="form-group">
				<label htmlFor="po_date">작성일</label>
        <input type="text" id="po_date" className="form-control" value={po_date} readOnly/>
      </div>

      <div className="form-group">
        <label htmlFor="po_view">조회수</label>
        <input type="text" id="po_view" className="form-control" value={po_view} readOnly/>
      </div>

      <div className="form-group">
        <label htmlFor="po_like">추천수</label>
        <input type="text" id="po_like" className="form-control" value={po_like} readOnly/>
      </div>

      <div className="form-group">
        <label htmlFor="po_content">내용</label>
        <textarea id="po_content" className="form-control" value={po_content} readOnly style={{ height: '400px' }}/>
      </div>

      <div className="prev-next-links">
        <div>
          {prev_post ? (
            <p>
              <strong>이전글 ▲</strong>
              <a href={`/post/${prev_post.id}`}>{prev_post.title}</a>
            </p>
          ) : (
            <p>이전글이 없습니다.</p>
          )}
        </div>
        <div>
          {next_post ? (
            <p>
              <strong>다음글 ▼</strong>
              <a href={`/post/${next_post.id}`}>{next_post.title}</a>
            </p>
          ) : (
            <p>다음글이 없습니다.</p>
          )}
        </div>
      </div>

      <button className="btn btn-outline-success" onClick={() => (window.location.href = `/post/list/${po_co_num}`)}>목록으로</button>
      {me_id === po_me_id && (
        <div>
          <button className="btn btn-outline-primary" onClick={() => (window.location.href = `/post/update/${po_num}`)}>수정하기</button>
          <button className="btn btn-outline-danger" onClick={() => (window.location.href = `/post/delete/${po_num}`)}>삭제하기</button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;