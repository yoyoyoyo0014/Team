<<<<<<< HEAD

function MakePage(contentsCount,currentPage) {
  const lookPage = 5;
  let page ={
=======
function MakePage(contentsCount,currentPage) {
  const lookPage = 5;
  let page = {
>>>>>>> KCL
    contentsCount : contentsCount,
    currentPage : currentPage,
    startPage : 0,
    endPage : 0,
    prev : false,
    next : false,
    pageList : []
  }
  
  page.startPage = currentPage-2;
  if(page.startPage <= 1){
    page.prev = false; page.startPage = 1;
  }

  page.endPage = currentPage+2;
  let maxPage = Math.ceil(contentsCount/lookPage)-1;
  if(page.endPage > maxPage){
    page.next = false;
    page.endPage = maxPage;
  }
  
  
  if(currentPage-1>=page.startPage)
    page.prev = true
  else 
    page.prev = false;

<<<<<<< HEAD
  if(currentPage+1<=page.endPage){
    page.next = true
  }
    
  else
=======
  if(currentPage+1<=page.endPage)
    page.next = true
   else
>>>>>>> KCL
    page.next = false;

  let pageList = [];
  
  for(var i = page.startPage;i<=page.endPage;i++)
    pageList.push(i);

  page.pageList = pageList;
  //console.log("total : "+contentsCount+" endPage" + page.endPage,"next" + page.next+"currentPage"+page.currentPage)
  return page;
}

export function PageButton({getPage,pageEvent}){
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
  //page.currentPage = getPage.currentPage
  page = getPage;

  
  return(
    <div>
      <button onClick={()=>{if(pageEvent)pageEvent(page.currentPage-1)}} disabled={!page.prev}>이전</button>
      {
            Array.isArray(page.pageList) && page.pageList.length > 0 && page.pageList.map((item, index) => {
            return(
              <button onClick={()=>{
                if(pageEvent){
                  pageEvent(item);
                }
              }} key={index}>{item}</button>
            )
            })
          }
      <button onClick={()=>{if(pageEvent)pageEvent(page.currentPage+1)}} disabled={!page.next}>다음</button>
    </div>
  )
}
export default MakePage;
