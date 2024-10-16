import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
  const { po_num } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [me_id, setMeId] = useState('');

  // 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 게시글 정보를 가져오기
    fetch(`/post/detail/${po_num}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.post) {
          setTitle(data.post.po_title || ''); // undefined가 아니라 빈 문자열로 초기화
          setContent(data.post.po_content || ''); // undefined가 아니라 빈 문자열로 초기화
          setMeId(data.post.po_me_id || ''); // 작성자 ID 설정
        }
      })
      .catch((error) => console.error('Error fetching post:', error));
  }, [po_num]);

  function btnClick() {
    const updatedPost = {
      po_num,
      po_title: title,
      po_content: content,
      po_me_id: me_id, // 작성자 ID 추가
    };

    fetch(`/post/update/${po_num}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert('게시글이 수정되었습니다.');
        navigate(`/post/detail/${po_num}`);
      })
      .catch((error) => console.error('Error updating post:', error));
  }

  return (
    <div>
      <h1 style={{marginBottom: '50px'}}>게시글 수정</h1>
      제목<input type="text" id="title" name="title" placeholder="제목을 입력하세요." onChange={(e) => setTitle(e.target.value)} value={title || ''}/>
      작성자<input type="text" id="writer" name="writer" value={me_id || ''} readOnly />
      내용<textarea id="content" name="content" placeholder="내용을 입력하세요." onChange={(e) => setContent(e.target.value)} value={content || ''}></textarea>
      <button className="btn" onClick={btnClick}>
        게시글 수정
      </button>
    </div>
  );
}

export default Update;
