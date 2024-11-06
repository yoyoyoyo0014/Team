import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LoginContext } from '../../context/LoginContext';

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
  const [link, setLink] = useState(null);
  const [image, setImage] = useState(null);
  const [postLinkPreview, setPostLinkPreview] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState(null);
  const { user } = useContext(LoginContext);

  // 게시글 정보 로드 및 접근 제한 확인
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
        if (!data.post) {
          // 게시글 데이터가 없을 경우 처리
          alert('존재하지 않는 게시글입니다.');
          navigate('/');
          return;
        }

        // 게시글 데이터 설정
        if (data.post) {
          setTitle(data.post.po_title || '');
          setContent(data.post.po_content || '');
          setMeId(data.post.po_me_nickname || '');
          setPoCoNum(data.post.po_co_num || null);

          // 기존의 po_link 및 po_image가 있다면 미리보기 설정
          if (data.post.po_link) {
            setLink(data.post.po_link);
            setPostLinkPreview(data.post.po_link);
          }
          if (data.post.po_image) {
            setImage(data.post.po_image);
            setPostImagePreview(data.post.po_image);
          }

          // po_start와 po_end 값을 Date 객체로 변환하여 설정
          if (data.post.po_start) {
            setStart(new Date(data.post.po_start));
          }
          if (data.post.po_end) {
            setEnd(new Date(data.post.po_end));
          }

          // ** 접근 제한 로직 - 게시글 정보가 로드된 후 검사 **
          if (!user || user.me_id !== data.post.po_me_id) {
            alert('접근 권한이 없습니다.');
            navigate('/');  // 메인 페이지로 리다이렉트
            return;
          }
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        alert('존재하지 않는 게시글입니다.');
        navigate('/');  // 메인 페이지로 리다이렉트
        setLoading(false);
      });
  }, [po_num, user, navigate]);

  // 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePostLinkChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostLinkPreview(URL.createObjectURL(file)); // 새로 선택한 파일 미리보기 설정
      setLink(file); // 새로운 파일 설정
    } else if (!file && link) {
      // 파일이 선택되지 않았을 경우 기존 링크를 그대로 유지
      setPostLinkPreview(link);
    }
  };

  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImagePreview(URL.createObjectURL(file)); // 새로 선택한 파일 미리보기 설정
      setImage(file); // 새로운 파일 설정
    } else if (!file && image) {
      // 파일이 선택되지 않았을 경우 기존 이미지를 그대로 유지
      setPostImagePreview(image);
    }
  };

  function btnClick() {
    const formData = new FormData();
    formData.append('po_num', po_num);
    formData.append('po_title', title);
    formData.append('po_content', content);
    formData.append('po_me_nickname', me_nickname);
    formData.append('po_start', start ? start.toISOString().split('T')[0] : '');
    formData.append('po_end', end ? end.toISOString().split('T')[0] : '');
    if (link) {
      formData.append('po_link', link);
    }
    if (image) {
      formData.append('po_image', image);
    }

    fetch(`/post/update/${po_num}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert('게시글이 수정되었습니다.');
        navigate(`/post/detail/${po_co_num}/${po_num}`);
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
        <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '15px'}}>
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
      {(po_co_num === 3 || po_co_num === 4) && (
        <>
          {/* 이미지 파일 입력 필드 및 미리보기 추가 */}
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '15px', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
              <label htmlFor="postLinkFile">게시글 리스트 이미지:</label>
              <input type="file" id="postLinkFile" name="postLinkFile" className="form-control" onChange={handlePostLinkChange} />
            </div>
            {postLinkPreview && <img src={postLinkPreview} alt="게시글 리스트 이미지 미리보기" style={{ maxHeight: '150px' }} />}
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '15px', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
              <label htmlFor="postImageFile">이벤트 이미지:</label>
              <input type="file" id="postImageFile" name="postImageFile" className="form-control" onChange={handlePostImageChange} />
            </div>
            {postImagePreview && <img src={postImagePreview} alt="이벤트 이미지 미리보기" style={{ maxHeight: '150px' }} />}
          </div>
        </>
      )}
      {(po_co_num !== 3 && po_co_num !== 4) && (
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea id="content" name="content" placeholder="내용을 입력하세요." onChange={(e) => setContent(e.target.value)} value={content} className="form-control" style={{ height: '400px', width: '100%', border: '1px solid lightgray', borderRadius: '15px', padding: '15px 15px' }}/>
            
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
        <a className="btn btn-outline-info" href={`/post/detail/${po_co_num}/${po_num}`}>돌아가기</a>
        <button className="btn btn-primary" onClick={btnClick}>게시글 수정</button>
      </div>
    </div>
  );
}

export default Update;
