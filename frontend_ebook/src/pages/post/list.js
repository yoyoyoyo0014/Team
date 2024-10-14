import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const List = ({ communities = [] }) => {
  const { co_num } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pageMaker, setPageMaker] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    if (co_num) {
      fetch(`/post/list/${co_num}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            if (data.list) {
              const sortedList = data.list.sort((a, b) => new Date(b.po_date) - new Date(a.po_date));
              setList(sortedList);
            }
            if (data.pm) {
              setPageMaker(data.pm);
            }
          } else {
            console.error("No data received");
          }
        })
        .catch((error) => console.error('Error fetching posts:', error));
    }
  }, [co_num]);

  const handlePageClick = (page) => {
    // 페이지 번호 클릭 시 해당 페이지의 데이터를 가져옴
    fetch(`/post/list/${co_num}?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.list) {
          const sortedList = data.list.sort((a, b) => new Date(b.po_date) - new Date(a.po_date));
          setList(sortedList);
        }
        if (data.pm) {
          setPageMaker(data.pm);
        }
      })
      .catch((error) => console.error('Error fetching posts:', error));
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      // 빈 문자열일 경우 전체 리스트 출력
      fetch(`/post/list/${co_num}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.list) {
            const sortedList = data.list.sort((a, b) => new Date(b.po_date) - new Date(a.po_date));
            setList(sortedList);
          }
        })
        .catch((error) => console.error('Error fetching posts:', error));
    } else {
      const filteredList = list.filter((item) => item.po_title.includes(searchTerm));
      setList(filteredList);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const communityName = communities.find((community) => community.co_num === parseInt(co_num))?.co_name;

  return (
    <div className="container">
      <h2>{communityName || "커뮤니티 이름"}</h2>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ padding: '10px', width: '60%', borderRadius: '5px', border: '1px solid lightgray' }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '10px 20px', marginLeft: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}
        >
          검색
        </button>
      </div>
      <table className="table" style={{ textAlign: 'center', width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ color: 'gray', borderBottom: '1px solid gray' }}>
          <tr>
            <th style={{ width: co_num === '1' ? '10%' : '10%' }}>NO</th>
            <th style={{ width: co_num === '1' ? '80%' : '60%' }}>제목</th>
            <th style={{ width: co_num === '1' ? '10%' : '10%' }}>작성일</th>
            {co_num !== '1' && (
              <>
                <th style={{ width: '10%' }}>조회수</th>
                <th style={{ width: '10%' }}>추천수</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {list && list.length > 0 ? (
            list.map((item, idx) => (
              <tr key={idx} style={{ height: '75px', borderBottom: '1px solid lightgray' }}>
                <td>{pageMaker.totalCount - (pageMaker.cri.page-1)  * pageMaker.cri.perPageNum -  idx }</td>
                <td style={{ textAlign: 'left'}}>
                  <span style={{cursor: 'pointer', textDecoration: hoverIndex === idx ? 'underline' : 'none' }} onMouseEnter={() => setHoverIndex(idx)}onMouseLeave={() => setHoverIndex(null)} onClick={() => navigate(`/post/detail/${item.po_num}`)}>
                    {item.po_title}
                  </span>
                </td>
                <td>{formatDate(item.po_date)}</td>
                {co_num !== '1' && (
                  <>
                    <td>{item.po_view}</td>
                    <td>{item.po_like}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={co_num !== '1' ? '5' : '3'}>글 목록이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      {pageMaker && pageMaker.totalCount > pageMaker.cri.perPageNum && (
        <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
          {pageMaker.prev && (
            <button onClick={() => handlePageClick(pageMaker.startPage - 1)} style={{ margin: '0 5px', padding: '10px', cursor: 'pointer' }}>
              이전
            </button>
          )}
          {Array.from({ length: pageMaker.endPage - pageMaker.startPage + 1 }, (_, i) => pageMaker.startPage + i).map((page) => (
            <button key={page} onClick={() => handlePageClick(page)} style={{ margin: '0 5px', padding: '10px', cursor: 'pointer', backgroundColor: pageMaker.curPage === page ? '#007BFF' : '#FFFFFF',
                color: pageMaker.curPage === page ? '#FFFFFF' : '#007BFF', border: '1px solid #007BFF', borderRadius: '5px' }}>
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

