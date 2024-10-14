import {useEffect, useState} from 'react';
import MakePage from './pageButton';

function BookSearch({initSearch,initGenre,initCountry,initCategory,initPage}) {

  let [data, setData] = useState({
    search : '',
    country : 'all',
    genre : 0,
    category : '',
    page : 0
  })//검색 시 필요한 목록


  let [bookList,setBookList] = useState([])
  //let [bookCount,setBookCount] = useState(0); //책 숫자
  
  let [search,setSearch] = useState('doNotExist');
  let [country,setCountry] = useState("all");
  let [genre,setGenre] = useState(0);
  let [category,setCategory] = useState('popularity');
  let [page,setPage] = useState({
    contentsCount : 5,
    currentPage : 1,
    startPage : 1,
    endPage : 5,
    prev : false,
    next : false,
    pageList : []
  })//페이지 이동버튼
  let[genreList,setGenreList] = useState([{
  }])//장르 리스트

  let bannedSearchTerms =["#","%",";"]

  function checkedCountry(e){
    setCountry(e.target.value);
  }//국내, 국외인지 

  function checkedGenre(num){
    setGenre(num);
  }//장르 설정

  function getCategory(e){
    setCategory(e.target.value);
  }//카테고리 설정

  function getSearch(e){
    setSearch(e.target.value);
  }//검색 설정

  function getGenreList(){
    fetch('/ebook/selectGenreList',{
      method : "post",
      //body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.json())
    .then(genreListData=>{
      // genreListData = 장르 리스트
      if(genreListData){
        setGenreList([...genreListData]);
      }
      
    })
    .catch(e=>console.error(e));
  }//장르리스트 가져오는 함수

  async function getSearchCount(){
    for(var i = 0;i<bannedSearchTerms.length;i++){
      if(search.indexOf(bannedSearchTerms[i]) !==-1){
        alert('금지된 검색이 포함되어있습니다.')
        return false;
      }
    }
    try {
      // fetch 요청이 완료될 때까지 대기
      const response = await fetch('/ebook/searchBookCount/'+country+"/"+genre+"/"+search,{
        method : "post",
        //body : JSON.stringify(writeUserReview),
        headers: {
          'Content-Type': 'application/json',  // Content-Type 헤더 설정
        },
      })
      const searchCount = await response.text();
      return searchCount;
    } catch (e) {
      console.error(e);
      return false;;
    }


  }//검색개수 가져오기

  async function selectSearch(){
    for(var i = 0;i<bannedSearchTerms.length;i++){
      if(search.indexOf(bannedSearchTerms[i]) !==-1){
        alert('금지된 검색이 포함되어있습니다.')
        return false;
      }
    }
    try {
      // fetch 요청이 완료될 때까지 대기
      const response = await fetch('/ebook/searchBook/'+category+"/"+country+'/'+
        genre+'/'+page.currentPage+'/'+search,{
        method : "post",
        //body : JSON.stringify(writeUserReview),
        headers: {
          'Content-Type': 'application/json',  // Content-Type 헤더 설정
        },
      })
      const bookListData = await response.json();
      return bookListData;
    } catch (e) {
      console.error(e);
      return false;;
    }

  }//검색하기

  async function changePage(index){
    if(typeof index ==='number'){
      page.currentPage = index;
    }else{
      
      var i ={
        index : 0
      }
      i = index;
      page.currentPage = i.index+1;
    }
    page = MakePage(page.contentsCount,page.currentPage);
    await submitSearch();
    
  }//페이지 바꾸기

  async function submitSearch(){
    var searchCount = await getSearchCount();
    if(!searchCount)
      return;
    page.contentsCount = searchCount;
    page = MakePage(page.contentsCount,page.currentPage);
    var searchDataList = await selectSearch();
    console.log(searchDataList)
    setBookList(searchDataList);
    setPage({...page});
  }//책 검색

  
  
  useEffect(()=>{
    getGenreList();//장르 리스트 가져오기
    submitSearch(); //그냥 검색
  },[]);
  console.log('렌더링 횟수')
  return (
    <div >
      <input onChange={e=>getSearch(e)} placeholder="검색칸"></input>
        <br/>
        <div>
          <label>
              <input onClick={e=>checkedCountry(e)} type="radio" id="all" name="country" value="all" defaultChecked/>전체
            </label>

            <label>
              <input onClick={e=>checkedCountry(e)} type="radio" id="domestic" name="country" value="domestic"/>국내
            </label>

            <label>
              <input onClick={e=>checkedCountry(e)} type="radio" id="foreign" name="country" value="foreign"/>해외도서
            </label>
          <br/>
        </div>
        <div>
        <label>
           <input onClick={e=>getCategory(e)} type="radio" id="popularity" name="category" value="popularity" defaultChecked/>인기순
          </label>
          
          <label>
            <input onClick={e=>getCategory(e)}  type="radio" id="latest" name="category" value="latest"/>최신순
          </label>

          <label>
          <input onClick={e=>getCategory(e)} type="radio" id="orderPurchase" name="category" value="orderPurchase"/> 구매 순
          </label>

          <label>
            <input onClick={e=>getCategory(e)} type="radio" id="highPrice" name="category" value="highPrice"/>높은 가격 순
          </label>

         <label>
          <input onClick={e=>getCategory(e)} type="radio" id="lowPrice" name="category" value="lowPrice"/>낮은 가격 순
          </label>

          <label>
          <input onClick={e=>getCategory(e)} type="radio" id="rating" name="category" value="rating"/>평점 순
          </label>

          <label>
          <input onClick={e=>getCategory(e)} type="radio" id="review" name="category" value="review"/>리뷰 순
          </label> 
        </div>
          <br/>
          {
            genreList.map((item,index)=>(
              <label key={index} >
               <input onClick={()=>{checkedGenre(item.ge_num)}} type="radio" id={item.ge_num} name="genre" value={item.ge_num}/>{item.ge_name}
             </label> 
            ))
          }
        <input onClick={()=>changePage(1)} type="submit" value="제출"></input>
        {
          bookList.map((item,index)=>{
            return (<div key={index}>{item.bk_name} : {item.bk_price}</div>)
          })
        }
        
        <button onClick={()=>changePage(page.currentPage-1)} disabled= {!page.prev}>이전</button>

      {page.pageList.map((item,index)=>{
          return(<button  onClick={()=>changePage({index})} disabled={page.currentPage==(index+1)} key={index}>{item}</button>)
      })}

      <button onClick={()=>changePage(page.currentPage+1)} disabled = {!page.next}>다음</button>

    </div>
  );
}

export default BookSearch;
