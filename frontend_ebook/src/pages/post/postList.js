import React from 'react';

const PostList = ({ communities, list }) => {
	function titleClick(index){
		let tmp = [...list];
		tmp[index].view++;
		setList(tmp);
		setModal(true);
	}

  return (
    <div className="container">
      {communities.map((communityItem, index) => (
        <table className="table" style={{ textAlign: 'center' }} key={index}>
          <thead>
            <tr>
              <th>NO</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
            {communityItem.co_num != 1 && (
              <tr>
                <th>조회수</th>
                <th>추천수</th>
              </tr>
            )}
          </thead>
          <tbody>
            {list.map((item, idx) => (
              <React.Fragment key={idx}>
                <tr>
                  <td>{item.length - idx}</td>
                  <td style={{ textAlign: 'left' }} onClick={()=>titleClick(index)}>
											{item.po_title}
										</td>
                  <td>{item.po_date}</td>
                </tr>
                {item.co_num != 1 && (
                  <tr>
                    <td>{item.po_views}</td>
                    <td>{item.po_like}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default TableComponent;