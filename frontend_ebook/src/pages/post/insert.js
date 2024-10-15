import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Insert() {
  const { co_num } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const btnClick = () => {
    // 제목과 내용이 비어 있는지 확인
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    // 서버에 전송할 게시글 데이터
    let post = {
      po_title: title,
      po_content: content,
      po_co_num: parseInt(co_num, 10),
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
      <input type="text" id="title" name="title" placeholder="제목을 입력하세요." onChange={(e) => setTitle(e.target.value)} value={title}/>
      <textarea id="content" name="content" placeholder="내용을 입력하세요." onChange={(e) => setContent(e.target.value)} value={content}></textarea>
      <button className="btn" onClick={btnClick}>게시글 등록</button>
    </div>
  );
}

export default Insert;
