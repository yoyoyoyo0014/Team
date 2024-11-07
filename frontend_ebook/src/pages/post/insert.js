import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LoginContext } from '../../context/LoginContext';

function Insert() {
  const { co_num, po_me_id } = useParams(); // URL에서 필요한 정보 가져오기
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [postLinkPreview, setPostLinkPreview] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState(null);
  const { user, loadingUser } = useContext(LoginContext);

  // 접근 제한 로직 (초기 로딩 시 모든 조건 충족 확인 후 접근)
  useEffect(() => {
    console.log('User:', user);
    console.log('Loading User:', loadingUser);
    console.log('Board Number:', co_num);
    if (loadingUser) return;
    if (!user.me_id) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 유효하지 않은 게시판 번호 접근 시 처리
    const validBoardNumbers = ['1', '2', '3', '4']; // 유효한 게시판 번호 목록
    if (!validBoardNumbers.includes(co_num)) {
      alert('존재하지 않는 게시판입니다.');
      navigate('/'); // 메인 페이지로 이동
      return;
    }

    // 권한 체크 및 접근 제한 로직
    if (user.me_authority) {
      const authority = user.me_authority.toLowerCase();
      if (co_num === '2' && authority !== 'USER') {
        alert('접근 권한이 없습니다.');
        navigate('/');
        return;
      } else if (co_num !== '2' && authority !== 'admin') {
        alert('접근 권한이 없습니다.');
        navigate('/');
        return;
      }
    }else{
      alert('접근 권한이 없습니다.');
        navigate('/');
        return;
    }
  }, [co_num, user, navigate, loadingUser]);

  // user 정보로 writer와 nickname 설정
  useEffect(() => {
    if (user) {
      setWriter(user.me_id || "");
      setNickname(user.me_nickname || "");
    }
  }, [user]);

  // 페이지 로드 시 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 페이지 로딩 중에는 아무것도 렌더링하지 않음
  if (loadingUser || !user) {
    return <div>로딩 중...</div>;
  }

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
      <h1 style={{ marginBottom: '20px' }}>게시글 등록</h1>
      <form onSubmit={btnClick}>
        <div className="form-group">
          <label htmlFor="title">제목:</label>
          <input type="text" id="title" name="title" className="form-control" placeholder="제목을 입력하세요." onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <input type="hidden" id="writer" name="writer" value={writer} readOnly />
        <input type="hidden" id="nickname" name="nickname" value={nickname} readOnly />

        {(co_num === '3' || co_num === '4') && (
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

        {(co_num === '3' || co_num === '4') && (
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

        {(co_num !== '3' && co_num !== '4') && (
          <div className="form-group">
            <label htmlFor="content">내용:</label>
            <textarea id="content" name="content" className="form-control" style={{ height: '400px', width: '100%', border: '1px solid lightgray', borderRadius: '15px', padding: '15px 15px' }} placeholder="내용을 입력하세요." onChange={(e) => setContent(e.target.value)} value={content}></textarea>
          </div>
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
