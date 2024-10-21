
function MakePage(contentsCount,currentPage) {
  const lookPage = 5;
  let page ={
    contentsCount : contentsCount,
    currentPage : currentPage,
    startPage : 0,
    endPage : 0,
    prev : false,
    next : false,
    pageList : []
  }
  
  page.startPage = currentPage-2;
  page.startPage > 1 ? (page.startPage = page.startPage) : page.prev = false; page.startPage = 1;

  page.endPage = currentPage+2;
  let maxPage = Math.ceil(contentsCount/lookPage);
  page.endPage <= maxPage ? (page.endPage  = page.endPage) : page.next = false;page.endPage = maxPage;
  
  
  if(currentPage-1>=page.startPage)
    page.prev = true
  else 
    page.prev = false;


  if(currentPage+1<=page.endPage)
    page.next = true
  else
    page.next = false;

  let pageList = [];
  for(var i = page.startPage;i<=page.endPage;i++)
    pageList.push(i);  

  page.pageList = pageList;
  console.log(page)
  return page;
}

export function PageButton({getPage,pageEvent,prevPageEvent,nextPageEvent}){
  let page ={
    contentsCount : 0,
    currentPage : 0,
    startPage : 0,
    endPage : 0,
    prev : false,
    next : false,
    pageList : []
  }
  getPage.pageList=getPage.pageList.slice(0,5);
  page = getPage;
  return(
    <div>
      <button onClick={prevPageEvent} disabled={page.prev}>이전</button>
      {
            Array.isArray(page.pageList) && page.pageList.length > 0 && page.pageList.map((item, index) => {
            return(
              <button onClick={()=>{
                if(pageEvent){
                  pageEvent[index]();
                }
              }} key={index}>{item}</button>
            )
            })
          }
      <button onClick={nextPageEvent} disabled={page.next}>다음</button>
    </div>
  )
}
export default MakePage;
