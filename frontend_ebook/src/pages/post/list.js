import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

const List = () => {
  const { co_num } = useParams();
  const navigate = useNavigate();
  const [currentPosts, setCurrentPosts] = useState([]);
  const [pageMaker, setPageMaker] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [communityName, setCommunityName] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState('');
  const { user } = useContext(LoginContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 글쓰기 버튼 렌더링 조건
  const canWrite = (co_num !== '2' && user && user.me_authority && user.me_authority.toLowerCase() === 'admin') || (co_num === '2' && user && user.me_authority && user.me_authority.toLowerCase() === 'user');

  // 날짜 포맷 함수
  function formatDate(isoString) {
    const date = new Date(isoString);
    const today = new Date();

    const isToday = date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth() &&
                    date.getDate() === today.getDate();

    if (isToday) {
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
  }

  // 데이터 가져오기 함수
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
          setCurrentPosts(data.list || []);
          setPageMaker(data.pm || null);
          const community = data.communities.find((community) => community.co_num === parseInt(co_num));
          if (community) {
            setCommunityName(community.co_name);
          } else {
            // 유효하지 않은 게시판 번호일 경우 경고 후 메인 페이지로 이동
            alert('존재하지 않는 게시판입니다.');
            navigate('/');
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        // 오류 발생 시 경고 후 메인 페이지로 이동
        alert('존재하지 않는 게시판입니다.');
        navigate('/');
      });
  };

  useEffect(() => {
    if (co_num) {
      fetchPosts();
    }
  }, [co_num]);

  // 검색 처리 함수 - 검색어를 백엔드에 전달하여 검색 결과를 가져옴
  const handleSearch = () => {
    if (pageMaker && pageMaker.cri && pageMaker.cri.search) {
      setIsSearchMode(true);
      setSearchedTerm(pageMaker.cri.search); // 검색어를 searchedTerm에 저장
      fetchPosts(1, pageMaker.cri.search);  // 검색어를 포함하여 첫 페이지 데이터 가져오기
    } else {
      setIsSearchMode(false);
      setSearchedTerm(''); // 검색어 초기화
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

  // 카드 스타일 적용
  const renderCardList = () => (
    <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' }}>
      {currentPosts.map((item, idx) => (
        <div key={idx} className="card" style={{ width: '23%', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
        onMouseEnter={() => setHoverIndex(idx)} onMouseLeave={() => setHoverIndex(null)} onClick={() => navigate(`/post/detail/${co_num}/${item.po_num}`)}>
          {item.po_link && (
            <img src={item.po_link} alt="첨부 이미지" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
          )}
          <p style={{ margin: '10px 0', fontSize: '15px' }}>{item.po_title}</p>
          <p style={{fontSize:'13px', color: 'gray'}}>{`${formatDate(item.po_start)} ~ ${formatDate(item.po_end)}`}</p>
        </div>
      ))}
    </div>
  );

  // 기존 테이블 스타일 유지
  const renderTableList = () => (
    <table className="table" style={{ textAlign: 'center', width: '100%', borderCollapse: 'collapse' }}>
      <thead style={{ color: 'gray', borderBottom: '1px solid gray' }}>
        <tr>
          <th style={{ width: co_num !== '2' ? '80%' : '60%' }}>제목</th>
          {co_num === '2' && (
            <>
              <th style={{ width: '10%' }}>작성자</th>
              <th style={{ width: '10%' }}>조회수</th>
              <th style={{ width: '10%' }}>추천수</th>
            </>
          )}
          <th style={{ width: '10%' }}>작성일</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts.length > 0 ? (
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
                  <td>{item.po_view}</td>
                  <td>{item.po_like}</td>
                </>
              )}
              <td>{formatDate(item.po_date)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">
              {isSearchMode && searchedTerm
                ? `"${searchedTerm}"와 일치하는 게시글이 없습니다.`
                : '글 목록이 없습니다.'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderPagination = () => {
    return (
      <>
        {/* 페이지네이션 */}
        {!isSearchMode && pageMaker && pageMaker.totalCount > 10 && (
          /* 기본 게시글이 10개 이상일 때 페이지네이션 출력 */
          <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
            {pageMaker.prev && (
              <button
                onClick={() => handlePageClick(pageMaker.startPage - 1)}
                style={{ margin: '0 5px', padding: '10px', cursor: 'pointer' }}
              >
                이전
              </button>
            )}
            {Array.from({ length: pageMaker.endPage - pageMaker.startPage + 1 }, (_, i) => pageMaker.startPage + i).map((page) => (
              <button key={page} onClick={() => handlePageClick(page)}
                style={{ margin: '0 5px', padding: '10px', cursor: 'pointer', backgroundColor: pageMaker.cri.page === page ? '#84cb70' : '#FFFFFF',
                  color: pageMaker.cri.page === page ? '#FFFFFF' : '#84cb70', border: '1px solid #84cb70', borderRadius: '5px' }}>
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
        {isSearchMode && pageMaker && pageMaker.totalCount > 10 && currentPosts.length > 10 && (
          /* 검색된 게시글이 10개 이상일 때 페이지네이션 출력 */
          <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
            {pageMaker.prev && (
              <button onClick={() => handlePageClick(pageMaker.startPage - 1)} style={{ margin: '0 5px', padding: '10px', cursor: 'pointer' }}>
                이전
              </button>
            )}
            {Array.from({ length: pageMaker.endPage - pageMaker.startPage + 1 }, (_, i) => pageMaker.startPage + i).map((page) => (
              <button key={page} onClick={() => handlePageClick(page)}
                style={{ margin: '0 5px', padding: '10px', cursor: 'pointer', backgroundColor: pageMaker.cri.page === page ? '#84cb70' : '#FFFFFF',
                  color: pageMaker.cri.page === page ? '#FFFFFF' : '#84cb70', border: '1px solid #84cb70', borderRadius: '5px' }}>
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
      </>
    );
  };
  

  return (
    <div className="container">
      <h2 style={{ padding: '30px 0 60px', textAlign: 'center' }}>{communityName} 게시판</h2>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div  iv style={{ position: 'relative', display: 'inline-block' }}>
          <input type="text" placeholder="검색어를 입력하세요" value={pageMaker && pageMaker.cri ? pageMaker.cri.search : ''} 
                  onChange={(e) => setPageMaker({ ...pageMaker, cri: { ...pageMaker.cri, search: e.target.value }})} onKeyPress={handleKeyPress}
            style={{ padding: '10px 40px 10px 10px', width: '400px', borderRadius: '5px', border: '1px solid lightgray' }} />
            {pageMaker && pageMaker.cri && pageMaker.cri.search && (
              <button onClick={() => setPageMaker({ ...pageMaker, cri: { ...pageMaker.cri, search: '' }})} 
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', 
                                border: 'none', background: 'transparent', fontSize: '16px', cursor: 'pointer' }}>
                ✕
              </button>
            )}
          </div>
          <button onClick={handleSearch} style={{ padding: '8px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#84cb70', color: 'white', cursor: 'pointer' }}>
            검색
          </button>
        </div>
        <div className="insert">
          {canWrite && (
            <button className="btn btn-outline-primary" style={{ marginBottom: '20px', float: 'right' }} onClick={() => navigate(`/post/insert/${co_num}`)}>글쓰기</button>
          )}
        </div>
      <div style={{ marginTop: '50px'}}>
        {co_num === '3' || co_num === '4' ? renderCardList() : renderTableList()}
        {renderPagination()}
      </div>
    </div>
  );
};

export default List;
