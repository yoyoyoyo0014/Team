import {useEffect, useState} from 'react';

function BookSearch() {
  //https://github.com/st8324/java_240528/blob/main/react/react3/src/Signup.js

  let [data, setData] = useState({
    search : '',
    country : 'all',
    genre : 0,
    category : '',
    page : 0
  })//검색 시 필요한 목록


  let [bookList,setBookList] = useState([])
  let [bookCount,setBookCount] = useState(0); //책 숫자
  
  let [search,setSearch] = useState('do not exist');
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
    ge_num : 0,
    ge_name : ''
  }])//장르 리스트

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

  function submitSearch(){
    fetch('/ebook/searchBook/'+category+"/"+country+'/'+
      genre+'/'+page.currentPage+'/'+search,{
      method : "post",
      //body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.json())
    .then(bookListData=>{
      
      setBookList([...bookListData])
      console.log(bookListData)
    })
    .catch(e=>console.error(e));
  }

  function changePage(index){
    console.log(index)
  }

  function selectBookCount(){
    fetch("/ebook/searchBookCount/"+country+"/"+genre+"/"+search,{
      method : "post",
      //body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    .then(res=>res.json())
    .then(reviewListData=>{
     
    })
    .catch(e=>console.error(e));
  }
  
  useEffect(()=>{
    getGenreList();
  },[]);

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
        <input onClick={submitSearch} type="submit" value="제출"></input>
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
