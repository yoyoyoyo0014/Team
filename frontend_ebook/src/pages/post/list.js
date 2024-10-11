import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const List = ({ communities = [] }) => {
  const { co_num } = useParams();
  const [list, setList] = useState([]);
  function titleClick(index){
		let tmp = [...list];
		tmp[index].view++;
		setList(tmp);
    console.log(co_num)
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
        .then((data) => console.log(data))
        .catch((error) => console.error('Error fetching posts:', error));
    }
  }, [co_num]);

  return (
    <div className="container">
      {communities.length > 0 ? (
        communities.map((communityItem, index) => (
          <table className="table" style={{ textAlign: 'center' }} key={index}>
            <thead>
              <tr>
                <th>NO</th>
                <th>제목</th>
                <th>작성일</th>
              </tr>
              {communityItem.co_num !== 1 && (
                <tr>
                  <th>조회수</th>
                  <th>추천수</th>
                </tr>
              )}
            </thead>
            <tbody>
              {list && list.length > 0 ? (
                list.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <tr>
                      <td>{list.length - idx}</td>
                      <td style={{ textAlign: 'left' }} onClick={() => titleClick(idx)}>
                        {item.po_title}
                      </td>
                      <td>{item.po_date}</td>
                    </tr>
                    {item.co_num !== 1 && (
                      <tr>
                        <td>{item.po_view}</td>
                        <td>{item.po_like}</td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="3">글 목록이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        ))
      ) : (
        <p>커뮤니티 목록이 없습니다.</p>
      )}
    </div>
  );
};

export default List;