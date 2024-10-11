import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const List = ({ communities = [] }) => {
  const { co_num } = useParams();
  const [list, setList] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤을 맨 위로 이동
  }, []);

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
          if (data && data.list) {
            setList(data.list);
          } else {
            console.error("No 'list' field in response data:", data);
          }
        })
        .catch((error) => console.error('Error fetching posts:', error));
    }
  }, [co_num]);

  return (
    <div className="container">
      <table className="table" style={{ textAlign: 'center', width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{color: 'gray', borderBottom: '1px solid gray'}}>
          <tr>
            <th style={{ width: co_num === '1' ? '10%' : 'auto' }}>NO</th>
            <th style={{ width: co_num === '1' ? '80%' : 'auto' }}>제목</th>
            <th style={{ width: co_num === '1' ? '10%' : 'auto' }}>작성일</th>
            {co_num !== '1' && (
              <>
                <th>조회수</th>
                <th>추천수</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {list && list.length > 0 ? (
            list.map((item, idx) => (
              <tr key={idx} style={{height: '75px', borderBottom: '1px solid lightgray'}}>
                <td>{list.length - idx}</td>
                <td style={{ textAlign: 'left' }} onClick={() => console.log(`클릭한 항목 인덱스: ${idx}`)}>
                  {item.po_title}
                </td>
                <td>{item.po_date}</td>
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
    </div>
  );
};

export default List;
