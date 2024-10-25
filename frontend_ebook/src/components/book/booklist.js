
import { useNavigate } from 'react-router-dom';
function BookList({bookList}) {
  const navigate = useNavigate();

  function clickBookDetail(bookNum){
    navigate('/selectBook/'+bookNum)
  }
  return (
    <div >
      <table>
      <thead>
        <tr>
          <th>책표지</th>
          <th>책 제목</th>
          <th>가격</th>
        </tr>
      </thead>
      <tbody>
     {
      Array.isArray(bookList) && bookList.length > 0 &&    bookList.map((item, index) => {
         return (
            <tr onClick={()=>{clickBookDetail(item.bk_num)}} key={index}>
              <td><img src={'/img/book_'+ item.bk_num + '.jpg'} alt="불러오지 못한 이미지"  width="50" height="75"></img></td>
              <td>{item.bk_name}</td>
              <td>{item.bk_price}</td>
              </tr>
            );
          })
      }
      </tbody>
      </table>
    </div>
  );
}

export default BookList;
