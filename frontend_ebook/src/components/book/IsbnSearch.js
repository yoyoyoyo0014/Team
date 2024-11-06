import { useState } from "react";
import MakePage, { PageButton } from "../pageButton";
import Button from "../form/button";
function IsbnSearch({exit, onClose}) {
  let[search,setSearch] = useState('')
  let[searchDataList,setSearchDataList] = useState([])
  let[selectBookData,setSelectBookData] = useState({})

  let [eventButtons,setEventButtons] =useState([]);
  let[page,setPage] = useState({
    contentsCount : 0,
    currentPage : 1,
    startPage : 0,
    endPage : 0,
    prev : false,
    next : false,
    pageList : []
  })

  async function submitSearch(){
    var objs = await(SearchIsbnBookList(search,page.currentPage));
    searchDataList = objs.result;
    setSearchDataList(searchDataList);

    page.contentsCount = objs.total;
    page.pageList = page.pageList.slice(0,5);
    page = MakePage(page.contentsCount,page.currentPage);
    eventButtons = [];
    for(var i = page.startPage;i<=page.endPage;i++){
      console.log("페이지 이벤트 체크 : " + i)
      var res = i ;
      eventButtons.push(()=>{changePage(res)});
    }
    setEventButtons(eventButtons);
    
    setPage(page);
  }//검색하기

  const handClose =() =>{
    onClose(selectBookData);
  };//객체 넘기기

  async function insertBook(data){
    selectBookData = data;
    data.titleInfo = data.titleInfo?.replace(/<[^>]*>/g,'');
    setSelectBookData(prev => {
      return ({...prev, bk_name: data.bk_name, bk_isbn: data.isbn})
    });
    handClose();//넘겨주기
    exit();//나가기
  }//책 추가

  function changePage(num){
    console.log("갈 페이지" + num)
    page.currentPage = num;
    
    page = MakePage(page.contentsCount,page.currentPage);
    setPage(page);

    // console.log("페이지 넘기기" +page)

    submitSearch();
  }
  //검색 결과 제목 글자수 제한
  function TruncateHTML({ htmlContent, maxLength }) {
    const truncatedHTML = (() => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(htmlContent, 'text/html');
        let textContent = doc.body.textContent || "";
        let truncatedText = textContent.length > maxLength 
            ? textContent.slice(0, maxLength) + "..."
            : textContent;
        return truncatedText;
    })();

    return (
        <div dangerouslySetInnerHTML={{ __html: truncatedHTML }}></div>
    );
}
  return (
    <div>
      <div>현재 페이지 {page.currentPage}</div>
     
      <input onChange={e=>
      {
        setSearch(e.target.value)
      }} placeholder="isbn 검색" className="input-item"  style={{
        backgroundColor: '#f0f0f0', // 살짝 어두운 배경색
        color: '#333',               // 텍스트 색상
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        height: '30px' ,
        margin : '15px' 
    }}/><button onClick={()=>{submitSearch();
        page.currentPage = 1; setPage(page)
      }} className="btn btn-point">검색</button>
       <div style={{
        display: 'flex',
        justifyContent: 'center',    // 가로 중앙 정렬
        alignItems: 'center',        // 세로 중앙 정렬
        flexDirection: 'column'      // 세로 방향으로 정렬
      }}>
    {Array.isArray(searchDataList) && searchDataList.length > 0 && (
    <>
    <table>
        <thead >
            <tr >  
                <th style={{
                  width: '250px',
                textAlign: 'left',      // 테이블이 왼쪽에 붙도록 설정
                paddingLeft: '0'        // 왼쪽 패딩 제거
              }}>책제목</th>
                <th >isbn</th>
                <th style={{
                textAlign: 'right',      // 테이블이 왼쪽에 붙도록 설정
                paddingLeft: '0'        // 왼쪽 패딩 제거
              }}></th>
            </tr>
        </thead>
        <tbody>
            {searchDataList.map((item, index) => (
                <tr key={index} style={{ padding: '100px' }}>
                  <td >
                    <TruncateHTML htmlContent={item.titleInfo} maxLength={20} />
                  </td>
                    <td>{item.isbn && item.isbn.length > 0
                      ? (item.isbn.length > 15 
                          ? item.isbn.slice(0, 15) + "..." 
                          : item.isbn)
                      : "존재하지 않음"}
                    </td>
                    <td >
                        {item.isbn !== null && item.isbn !== '' && (
                            <Button style={{
                              borderRadius: '2px',
                              height: '5px',
                              lineHeight: '5px',        // 텍스트가 세로로 중앙 정렬되도록 조정
                              textAlign: 'center',      // 가로 중앙 정렬
                            }} click={() => insertBook(item)} cls="btn btn-point" text="추가" />
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    <PageButton getPage={page} pageEvent={changePage} prevPageEvent={()=>changePage(page.currentPage-1)} nextPageEvent={()=>changePage(page.currentPage+1)}></PageButton>
    </>
)}
</div>
</div>
  );
}

async function SearchIsbnBookList(search,page) {
  try{
    const response = await fetch("/searchBookIsbn/"+page+"/"+search,{
      
    headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    });
    const res =await response.json();
    return res;
  }catch(e){
    console.error(e);
  }
}

export default IsbnSearch;
