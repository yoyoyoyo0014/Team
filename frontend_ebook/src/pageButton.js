
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

  return page;
}

export default MakePage;
