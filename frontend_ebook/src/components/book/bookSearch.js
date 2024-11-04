import {useContext, useEffect, useState} from 'react';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MakePage from '../pageButton';
import BookList from './booklist';
import { GenreContext } from '../../context/GenreContext';
import { Input } from '../form/input';
import Button from '../form/button';

let bannedSearchTerms =["#","%",";"]
const helpSearch = "SearchWord="

function BookSearch() {
  const { bo_country } = useParams(0);
  const { bo_genre } = useParams();
  const { bo_category } = useParams();
  const { bo_page } = useParams();
  const { bo_search } = useParams();
  const {genreList} = useContext(GenreContext);

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

  function checkedCountry(e){
    setCountry(e.target.value);
  }//국내, 국외인지 

  function checkedGenre(num){
    setGenre(num);
  }//장르 설정

  function getCategory(e){
    setCategory(e.target.value);
  }//카테고리 설정

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

   window.location.href =("/ebook/search/"+country+"/"+genre+"/"+category+"/"+page.currentPage+"/"+helpSearch+search);
  }//페이지 바꾸기

  async function submitSearch(country,genre,inputSerch = ''){
    inputSerch =inputSerch.replace(helpSearch, "");

    var searchCount = await getSearchCount(country,genre,inputSerch);

    if(!searchCount) return;
    
    page.contentsCount = searchCount;
    page = MakePage(page.contentsCount,page.currentPage);
    var searchDataList = await selectSearch(country,genre,category,inputSerch,page);
    setBookList(searchDataList);
    setPage({...page});
  }//책 검색

  function urlSetting(){
    setCountry(bo_country)
    setGenre(bo_genre)
    setCategory(bo_category)

    page.currentPage = bo_page;

    if(page.currentPage<=0)
      page.currentPage = 1;

    setPage({...page})
  }//url 세팅에 맞게 세팅
  

  useEffect(()=>{
    (async () => {
      urlSetting();//url 세팅
      submitSearch(bo_country,bo_genre,bo_search); //그냥 검색
    })();
  },[]);
  //console.log('렌더링 횟수')
  return (
    <div>
      <Input type="text" change={setSearch} placeholder="검색칸"/>

      <div>
        <div>
          <input type="radio" name="country" id="all" value="all" defaultChecked={bo_country==='all'} onClick={e=>checkedCountry(e)} />
          <label htmlFor="all">전체</label>
        </div>
        <div>
          <input type="radio" name="country" id="domestic" value="domestic" defaultChecked={bo_country==='domestic'} onClick={e=>checkedCountry(e)} />
          <label htmlFor="domestic">국내도서</label>
        </div>
        <div>
          <input type="radio" name="country" id="foreign" value="foreign" defaultChecked={bo_country==='foreign'} onClick={e=>checkedCountry(e)} />
          <label htmlFor="foreign">해외도서</label>
        </div>
        <div>
          <input type="radio" name="category" id="popularity" value="popularity" defaultChecked={bo_category==='popularity'} onClick={e=>getCategory(e)} />
          <label htmlFor="popularity">인기순</label>
        </div>
        <div>
          <input type="radio" name="category" id="latest" value="latest" defaultChecked={bo_category==='latest'} onClick={e=>getCategory(e)} />
          <label htmlFor="latest">최신순</label>
        </div>
        <div>
          <input type="radio" name="category" id="orderPurchase" value="orderPurchase" defaultChecked={bo_category==='orderPurchase'} onClick={e=>getCategory(e)} />
          <label htmlFor="orderPurchase">구매순</label>
        </div>
        <div>
          <input type="radio" name="category" id="highPrice" value="highPrice" defaultChecked={bo_category==='highPrice'} onClick={e=>getCategory(e)} />
          <label htmlFor="highPrice">높은 가격순</label>
        </div>
        <div>
          <input type="radio" name="category" id="lowPrice" value="lowPrice" defaultChecked={bo_category==='lowPrice'} onClick={e=>getCategory(e)} />
          <label htmlFor="lowPrice">낮은 가격순</label>
        </div>
        <div>
          <input type="radio" name="category" id="rating" value="rating" defaultChecked={bo_category==='rating'} onClick={e=>getCategory(e)} />
          <label htmlFor="rating">평점순</label>
        </div>
        <div>
          <input type="radio" name="category" id="review" value="review" defaultChecked={bo_category==='review'} onClick={e=>getCategory(e)} />
          <label htmlFor="review">리뷰순</label>
        </div>

      </div>

      {genreList.map((item,index)=>(
          <label key={index} >
            <input defaultChecked={bo_genre===index+1} onClick={()=>{checkedGenre(item.ge_num)}} type="radio" id={item.ge_num} name="genre" value={item.ge_num}/>{item.ge_name}
          </label> 
        ))
      }
      <input onClick={()=>{changePage(1)}} type="submit" value="제출"></input>

      <BookList bookList={bookList}/>
        
      <Button click={()=>changePage(page.currentPage-1)} disabled= {!page.prev} text="이전"/>
      {page.pageList.map((item,index)=>{
          return(<button  onClick={()=>changePage({index})} disabled={page.currentPage==(index+1)} key={index}>{item}</button>)
      })}

      <Button click={()=>changePage(page.currentPage+1)} disabled= {!page.next} text="다음"/>
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
    const response = await fetch('/ebook/count/'+country+"/"+genre+"/"+'/SearchWord='+inputSerch,{
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
    const response = await fetch('/ebook/search/'+category+"/"+country+'/'+
      genre+'/'+page.currentPage+'/SearchWord='+inputSerch,{
      //body : JSON.stringify(writeUserReview),
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    })
    const bookListData = await response.json();
    console.log(bookListData)
    if(bookListData ==null)
      return false;
    return bookListData;
  } catch (e) {
    console.error(e);
    return false;
  }

}//검색하기


export default BookSearch;
