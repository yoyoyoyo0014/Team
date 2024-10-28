
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

//해당 책 페이지 번호 받아오기 없으면 -1
export async function selectReadBook(bookNum,userId) {
  var bookList ={
    bl_me_id : userId,
    bl_bk_num : bookNum,
    bl_nowPage : 0
  }
  try{
    const response = await fetch('/selectBook/currentBookPage',{
      method: 'POST',  // POST 요청 설정
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
      body: JSON.stringify(bookList),
    });
    const res =await response.text();
    return res;
  }catch(e){
    console.error(e);
  }
}

//해당 책 페이지 업데이트
export async function UpdateReadBook(bookList) {
  try{
    const response = await fetch('/selectBook/updateBookPage',{
      method: 'POST',  // POST 요청 설정
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
      body: JSON.stringify(bookList),
    });
    const res =await response.text();
    return res;
  }catch(e){
    console.error(e);
  }
}

export default BookList;
