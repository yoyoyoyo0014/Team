import {useEffect, useState} from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MakePage from '../pageButton';
import SelectGenreList from './BookGenreList';
import BookList from './bookList';

let bannedSearchTerms =["#","%",";"]
const helpSearch = "SearchWord="

function BookSearch() {

  const navigate = useNavigate();
  

  const { bo_country } = useParams(0);
  const { bo_genre } = useParams();
  const { bo_categori } = useParams();
  const { bo_page } = useParams();
  const { bo_search } = useParams();

  

  let [bookList,setBookList] = useState([])
  
  let [search,setSearch] = useState('');
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

    if(page.currentPage>page.endPage){
      page.currentPage = page.endPage;
      page = MakePage(page.contentsCount,page.currentPage);
    }
     
   if(page.currentPage<=0)
      page.currentPage = 1;

   window.location.href =("/searchBook/"+country+"/"+genre+"/"+category+"/"+page.currentPage+"/"+helpSearch+search);
  }//페이지 바꾸기

  async function submitSearch(country,genre,inputSerch = ''){
    inputSerch =inputSerch.replace(helpSearch, "");

    var searchCount = await getSearchCount(country,genre,inputSerch);

    if(!searchCount)
      return;
    
    page.contentsCount = searchCount;
    page = MakePage(page.contentsCount,page.currentPage);
    var searchDataList = await selectSearch(country,genre,category,inputSerch,page);
    setBookList(searchDataList);
    setPage({...page});
  }//책 검색

  function urlSetting(){
    setCountry(bo_country)
    setGenre(bo_genre)
    setCategory(bo_categori)

    page.currentPage = bo_page;

    if(page.currentPage<=0)
      page.currentPage = 1;

    setPage({...page})
  }//url 세팅에 맞게 세팅
  

  useEffect(()=>{
    (async () => {
      urlSetting();//url 세팅
      var genreList = await SelectGenreList();
      setGenreList([...genreList]);
      submitSearch(bo_country,bo_genre,bo_search); //그냥 검색
    })();
  },[]);
  //console.log('렌더링 횟수')
  return (
    <div>
      <input onChange={e=>getSearch(e)} placeholder="검색칸"></input>
        <br/>
        <div>
          <label>
              <input onClick={e=>checkedCountry(e)} type="radio" id="all" name="country" value="all" defaultChecked ={bo_country=='all'}/>전체
            </label>

            <label>
              <input onClick={e=>checkedCountry(e)} type="radio" id="domestic" name="country" value="domestic" defaultChecked ={bo_country=='domestic'}/>국내
            </label>

            <label>
              <input onClick={e=>checkedCountry(e)} type="radio" id="foreign" name="country" value="foreign" defaultChecked ={bo_country=='foreign'}/>해외도서
            </label>
          <br/>
        </div>
        <div>
        <label>
           <input onClick={e=>getCategory(e)} type="radio" id="popularity" name="category" value="popularity" defaultChecked ={bo_categori=='popularity'}/>인기순
          </label>
          
          <label>
            <input onClick={e=>getCategory(e)}  type="radio" id="latest" name="category" value="latest" defaultChecked ={bo_categori=='latest'}/>최신순
          </label>

          <label>
          <input onClick={e=>getCategory(e)} type="radio" id="orderPurchase" name="category" value="orderPurchase" defaultChecked ={bo_categori=='orderPurchase'}/> 구매 순
          </label>

          <label>
            <input onClick={e=>getCategory(e)} type="radio" id="highPrice" name="category" value="highPrice" defaultChecked ={bo_categori=='highPrice'}/>높은 가격 순
          </label>

         <label>
          <input onClick={e=>getCategory(e)} type="radio" id="lowPrice" name="category" value="lowPrice" defaultChecked ={bo_categori=='lowPrice'}/>낮은 가격 순
          </label>

          <label>
          <input onClick={e=>getCategory(e)} type="radio" id="rating" name="category" value="rating" defaultChecked ={bo_categori=='rating'}/>평점 순
          </label>

          <label>
          <input onClick={e=>getCategory(e)} type="radio" id="review" name="category" value="review" defaultChecked ={bo_categori=='review'}/>리뷰 순
          </label> 
        </div>
          <br/>
          <label>
               <input defaultChecked={bo_genre==0} onClick={()=>{checkedGenre(0)}} type="radio" id={0} name="genre" value="전체"/>전체
          </label>
          {
            genreList.map((item,index)=>(
              <label key={index} >
               <input defaultChecked={bo_genre==index+1} onClick={()=>{checkedGenre(item.ge_num)}} type="radio" id={item.ge_num} name="genre" value={item.ge_num}/>{item.ge_name}
             </label> 
            ))
          }
            <input onClick={()=>{changePage(1)}} type="submit" value="제출"></input>

      <BookList bookList={bookList}/>
        
      <button onClick={()=>changePage(page.currentPage-1)} disabled= {!page.prev}>이전</button>

      {page.pageList.map((item,index)=>{
          return(<button  onClick={()=>changePage({index})} disabled={page.currentPage==(index+1)} key={index}>{item}</button>)
      })}

      <button onClick={()=>changePage(page.currentPage+1)} disabled = {!page.next}>다음</button>

    </div>
  );
}
async function getSearchCount(country,genre,inputSerch = ''){
  inputSerch =inputSerch.replace("SearchWord=", "");
  for(var i = 0;i<bannedSearchTerms.length;i++){
    if(inputSerch.indexOf(bannedSearchTerms[i]) !==-1){
      alert('금지된 검색이 포함되어있습니다.')
      return false;
    }
  }
  try {
    // fetch 요청이 완료될 때까지 대기
    const response = await fetch('/searchBookCount/'+country+"/"+genre+"/"+'/SearchWord='+inputSerch,{
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

async function selectSearch(country,genre,category,inputSerch = '',page){
  inputSerch =inputSerch.replace("SearchWord=", "");


  for(var i = 0;i<bannedSearchTerms.length;i++){
    if(inputSerch.indexOf(bannedSearchTerms[i]) !==-1){
      alert('금지된 검색이 포함되어있습니다.')
      return false;
    }
  }
  
  try {
    const response = await fetch('/searchBook/'+category+"/"+country+'/'+
      genre+'/'+page.currentPage+'/SearchWord='+inputSerch,{
      //body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    const bookListData = await response.json();
    if(bookListData ==null)
      return false;
    return bookListData;
  } catch (e) {
    console.error(e);
    return false;
  }

}//검색하기


export default BookSearch;
