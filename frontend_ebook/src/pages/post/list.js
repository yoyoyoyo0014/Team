import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const List = () => {
  const { co_num } = useParams();
  const { list } = useParams();
  const navigate = useNavigate();
  const [currentPosts, setCurrentPosts] = useState([]);  // 현재 페이지에 출력될 게시글 목록
  const [pageMaker, setPageMaker] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [communityName, setCommunityName] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 날짜 포맷 함수
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

  // 데이터를 가져오는 함수로 분리
  const fetchPosts = (page = 1, search = '') => {
    fetch(`/post/list/${co_num}?page=${page}&search=${search}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          // 전체 게시글 목록 설정
          if (data.list) {
            setCurrentPosts(data.list);  // 현재 페이지 게시글 업데이트
          }
          // 페이지네이션 설정
          if (data.pm) {
            if (data.totalCount !== undefined) { data.pm.totalCount = data.totalCount; }  // 검색된 게시글 수를 totalCount에 설정
            setPageMaker(data.pm);  // 페이지네이션 정보 설정
          }
          // 커뮤니티 이름 설정
          const community = data.communities.find((community) => community.co_num === parseInt(co_num));
          if (community) {
            setCommunityName(community.co_name);
          }
        } else {
          console.error("No data received");
        }
      })
      .catch((error) => console.error('Error fetching posts:', error));
  };

  // 처음 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    if (co_num) {
      fetchPosts();
    }
  }, [co_num]);

  // 검색 처리 함수 - 검색어를 백엔드에 전달하여 검색 결과를 가져옴
  const handleSearch = () => {
    if (pageMaker && pageMaker.cri && pageMaker.cri.search) {
      setIsSearchMode(true);
      fetchPosts(1, pageMaker.cri.search);  // 검색어를 포함하여 첫 페이지 데이터 가져오기
    } else {
      setIsSearchMode(false);
      fetchPosts(1);  // 검색어가 없을 경우 기본 데이터 가져오기
    }
  };

  // 엔터키로 검색 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 페이지 클릭 시 처리 함수
  const handlePageClick = (page) => {
    const search = pageMaker && pageMaker.cri ? pageMaker.cri.search : '';
    fetchPosts(page, search);  // 페이지 번호와 검색어를 기준으로 게시글을 서버에서 다시 가져옴
  };

  return (
    <div className="container">
      <h2 style={{ padding: '30px 0 60px', textAlign: 'center' }}>{communityName} 게시판</h2>
      {/* 검색창과 X 버튼 */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input type="text" placeholder="검색어를 입력하세요" value={pageMaker && pageMaker.cri ? pageMaker.cri.search : ''} onChange={(e) => setPageMaker({ ...pageMaker, cri: { ...pageMaker.cri, search: e.target.value }})} onKeyPress={handleKeyPress}
            style={{ padding: '10px 40px 10px 10px', width: '400px', borderRadius: '5px', border: '1px solid lightgray' }} />
          {pageMaker && pageMaker.cri && pageMaker.cri.search && (
            <button onClick={() => setPageMaker({ ...pageMaker, cri: { ...pageMaker.cri, search: '' }})} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', fontSize: '16px', cursor: 'pointer' }}>
              ✕
            </button>
          )}
        </div>
        <button onClick={handleSearch} style={{ padding: '10px 20px', marginLeft: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}>
          검색
        </button>
      </div>
      <div className="insert">
        <button style={{ marginBottom: '20px', float: 'right' }} onClick={() => navigate(`/post/insert/${co_num}`)}>글쓰기</button>
      </div>
      <table className="table" style={{ textAlign: 'center', width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ color: 'gray', borderBottom: '1px solid gray' }}>
          <tr>
            <th style={{ width: co_num !== '2' ? '90%' : '60%' }}>제목</th>
            {co_num === '2' && (
              <>
                <th style={{ width: '10%' }}>작성자</th>
              </>
            )}
            <th style={{ width: co_num !== '2' ? '10%' : '10%' }}>작성일</th>
            {co_num === '2' && (
              <>
                <th style={{ width: '10%' }}>조회수</th>
                <th style={{ width: '10%' }}>추천수</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentPosts && currentPosts.length > 0 ? (
            currentPosts.map((item, idx) => (
              <tr key={idx} style={{ height: '75px', borderBottom: '1px solid lightgray' }}>
                <td style={{ textAlign: 'left' }}>
                  <span style={{ cursor: 'pointer', textDecoration: hoverIndex === idx ? 'underline' : 'none' }} onMouseEnter={() => setHoverIndex(idx)} onMouseLeave={() => setHoverIndex(null)} onClick={() => navigate(`/post/detail/${co_num}/${item.po_num}`)}>
                    {item.po_title}
                  </span>
                </td>
                {co_num === '2' && (
                  <>
                    <td>{item.po_me_nickname}</td>
                  </>
                )}
                <td>{formatDate(item.po_date)}</td>
                {co_num === '2' && (
                  <>
                    <td>{item.po_view}</td>
                    <td>{item.po_like}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={co_num !== '1' ? '6' : '3'}>글 목록이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      {!isSearchMode && pageMaker && pageMaker.totalCount > 10 && (  /* 기본 게시글이 10개 이상일 때 페이지네이션 출력 */
        <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
          {pageMaker.prev && (
            <button onClick={() => handlePageClick(pageMaker.startPage - 1)} style={{ margin: '0 5px', padding: '10px', cursor: 'pointer' }}>
              이전
            </button>
          )}
          {Array.from({ length: pageMaker.endPage - pageMaker.startPage + 1 }, (_, i) => pageMaker.startPage + i).map((page) => (
            <button key={page} onClick={() => handlePageClick(page)} style={{ margin: '0 5px', padding: '10px', cursor: 'pointer', backgroundColor: pageMaker.cri.page === page ? '#007BFF' : '#FFFFFF',
                color: pageMaker.cri.page === page ? '#FFFFFF' : '#007BFF', border: '1px solid #007BFF', borderRadius: '5px' }}>
              {page}
            </button>
          ))}
          {pageMaker.next && (
            <button onClick={() => handlePageClick(pageMaker.endPage + 1)} style={{ margin: '0 5px', padding: '10px', cursor: 'pointer' }}>
              다음
            </button>
          )}
        </div>
      )}

      {/* 검색 후 페이지네이션 */}
      {isSearchMode && pageMaker && pageMaker.totalCount > 10 && currentPosts.length > 10 && (  /* 검색된 게시글이 10개 이상일 때 페이지네이션 출력 */
        <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
          {pageMaker.prev && (
            <button onClick={() => handlePageClick(pageMaker.startPage - 1)} style={{ margin: '0 5px', padding: '10px', cursor: 'pointer' }}>
              이전
            </button>
          )}
          {Array.from({ length: pageMaker.endPage - pageMaker.startPage + 1 }, (_, i) => pageMaker.startPage + i).map((page) => (
            <button key={page} onClick={() => handlePageClick(page)} style={{ margin: '0 5px', padding: '10px', cursor: 'pointer', backgroundColor: pageMaker.cri.page === page ? '#007BFF' : '#FFFFFF',
                color: pageMaker.cri.page === page ? '#FFFFFF' : '#007BFF', border: '1px solid #007BFF', borderRadius: '5px' }}>
              {page}
            </button>
          ))}
          {pageMaker.next && (
            <button onClick={() => handlePageClick(pageMaker.endPage + 1)} style={{ margin: '0 5px', padding: '10px', cursor: 'pointer' }}>
              다음
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
