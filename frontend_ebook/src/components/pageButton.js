import Button from "./form/button";

function MakePage(contentsCount,currentPage,lookPage=5) {
  let page = {
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
  let maxPage = Math.ceil(contentsCount/lookPage);
  if(page.endPage > maxPage){
    page.next = false;
    page.endPage = maxPage;
  }
  
  if(currentPage-1>=page.startPage)
    page.prev = true
  else 
    page.prev = false;

  if(currentPage+1<=page.endPage)
    page.next = true
   else
    page.next = false;

  let pageList = [];

  var pageCount = 1;
  for(var i=page.startPage;i<i+5;i++){
    if(pageCount>5)
      break;
    if(i>page.endPage)
      break;

    pageCount++;
    pageList.push(i);
  }

  page.pageList = pageList;
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
  page = getPage;

  return(
    <div className="ui-paging txt-center">
      <Button 
        click={()=>{if(pageEvent)pageEvent(page.currentPage-1)}}
        disabled={!page.prev}
        text={<i class="fa-solid fa-chevron-left"></i>}
        cls="paging-btn prev"
      />

      <div className="nums">
      {Array.isArray(page.pageList) && page.pageList.length > 0 && page.pageList.map((item, index) => {
          return(
            <Button
              cls={"paging-btn num " + (page.currentPage === (page.pageList[index]) ? "now" : "")}
              text={item} key={index}
              click={() => {if(pageEvent) pageEvent(item)}}/>
          )
        })}
      </div>

      <Button 
        click={()=>{if(pageEvent)pageEvent(page.currentPage+1)}}
        disabled={!page.next}
        text={<i class="fa-solid fa-chevron-right"></i>}
        cls="paging-btn next"
      />
    </div>
  )
}

export function PageButtonV2({getPage,pageEvent,url}){
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
    <div className="ui-paging txt-center">
      {page.pageList.length > 0 ?
      <Button 
        click={()=>{if(pageEvent)pageEvent(page.currentPage-1,url)}}
        disabled={!page.prev}
        text={<i class="fa-solid fa-chevron-left"></i>}
        cls="paging-btn prev"
      /> : ''}

      <div className="nums">
      {Array.isArray(page.pageList) && page.pageList.length > 0 && page.pageList.map((item, index) => {
          return(
            <Button
              cls={"paging-btn num " + (page.currentPage === (page.pageList[index]) ? "now" : "")}
              text={item} key={index}
              click={() => {if(pageEvent) pageEvent(item,url)}}/>
          )
        })}
      </div>

      {page.pageList.length > 0 ?
      <Button 
        click={()=>{if(pageEvent)pageEvent(page.currentPage+1,url)}}
        disabled={!page.next}
        text={<i class="fa-solid fa-chevron-right"></i>}
        cls="paging-btn next"
      /> : ''}
    </div>
  )
}
export default MakePage;
