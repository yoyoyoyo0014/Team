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
  
  return (
    <div >
      <div>현재 페이지 {page.currentPage}</div>
     <input onChange={e=>
      {
        setSearch(e.target.value)
      }} placeholder="isbn 검색"></input><button onClick={()=>{submitSearch();
        page.currentPage = 1; setPage(page)
      }}>검색</button>
      <table>
        <thead>
        <tr>
            <th>책제목</th>
            <th>isbn</th>
            <th></th>
        </tr>
        
        </thead>
        <tbody>
        {Array.isArray(searchDataList) && searchDataList.length > 0 && searchDataList.map((item, index) => {
            return(<tr key={index}>
              <td dangerouslySetInnerHTML={{__html: item.titleInfo}}></td>
              <td>{item.isbn}</td>
              <td>
                <Button click={()=>insertBook(item)} cls="btn btn-point" text="추가" />
              </td>
              </tr>)
          })
        }
        </tbody>
      </table>
      <PageButton getPage={page} pageEvent={changePage} prevPageEvent={()=>changePage(page.currentPage-1)} nextPageEvent={()=>changePage(page.currentPage+1)}></PageButton>
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
