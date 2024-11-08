import {useContext, useEffect, useState} from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import MakePage, { PageButton } from '../pageButton';
import BookList from './booklist';
import { GenreContext } from '../../context/GenreContext';
import { Input } from '../form/input';
import Button from '../form/button';
import { FormProvider } from 'react-hook-form';
import { KeywordContext } from '../../context/KeywordContext';
import GenreNavBar from '../../components/genrenavbar';

let bannedSearchTerms =["#","%",";"];
const helpSearch = "SearchWord=";

function BookSearch() {
  const navigate = useNavigate();
  
  const { bo_country } = useParams(0);
  const { bo_genre } = useParams();
  const { bo_category } = useParams();
  const { bo_page } = useParams();
  let { bo_search } = useParams();
  const {genreList} = useContext(GenreContext);
  let { keyword, setKeyword } = useContext(KeywordContext);

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

  function getCategory(e){
    setCategory(e.target.value);
  }//카테고리 설정

  async function changePage(index=null){
    if(index ===null)
      index = 1;
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
   console.log("검색")
   window.location.href =("/ebook/search/"+country+"/"+genre+"/"+category+"/"+page.currentPage+"/"+helpSearch+search);
  }//페이지 바꾸기

  async function submitSearch(){
    navigate("/ebook/search/"+country+"/"+genre+"/"+category+"/"+0+"/SearchWord="+keyword);

    var searchCount = await getSearchCount(country,genre,keyword);
    console.log("검색개수"+searchCount)
    if(!searchCount) return;
    
    page.contentsCount = searchCount;
    page = MakePage(page.contentsCount,page.currentPage);
    var searchDataList = await selectSearch(country,genre,category,keyword,page);
    setBookList(searchDataList);
    setPage({...page});
  }//책 검색

  useEffect(()=>{
    (async () => {
      await submitSearch(); //그냥 검색
    })();
  },[]);

  function clickSearchBtn(e){
		e.preventDefault();
    submitSearch(); //그냥 검색
	}

  return (
  <form name="serach_book" onSubmit={(e)=>{clickSearchBtn(e)}}>
    <nav id="category-navbar" className="theme-box horizontal">
			<div className="category-navbar-wrapper scrollbar-no-padding">
			{genreList && genreList.map(genre => {
					return(<ul>
						{genre.length !== undefined && genre.map((secondGenre, i) => {
								return(<li>
                  <input type="radio" name="ge_num" id={"ge_num" + secondGenre.ge_num} value={secondGenre.ge_num} onChange={e => setGenre(e.target.value)}  defaultChecked={genre===secondGenre.ge_num}/>
                  <label htmlFor={"ge_num" + secondGenre.ge_num}>{secondGenre.ge_name}</label>
                </li>)
							})
						}
					</ul>)
				}
			)}
			</div>
		</nav>

    <div>
      <div className="search-form" style={{display: 'flex', gap: '2em'}}>
        <Input cls="frm-input" value={keyword} type="text" change={e=>setKeyword(e)} placeholder="검색칸"/>
        <Button text={'제출'} cls="btn btn-point" type={"submit"} onClick = {()=>{changePage(1)}}/>
      </div>
      <div>
        <div className="theme-box genre-wrapper">
          <div>
            <input type="radio" name="country" id="both" value="both" defaultChecked={bo_country==='both'} onChange={e=>setCountry(e.target.value)} />
            <label htmlFor="both">전체</label>
          </div>
          <div>
            <input type="radio" name="country" id="domestic" value="domestic" defaultChecked={bo_country==='domestic'} onChange={e=>setCountry(e.target.value)} />
            <label htmlFor="domestic">국내도서</label>
          </div>
          <div>
            <input type="radio" name="country" id="foreign" value="foreign" defaultChecked={bo_country==='foreign'} onChange={e=>setCountry(e.target.value)} />
            <label htmlFor="foreign">해외도서</label>
          </div>
        </div>
        <div className="theme-box genre-wrapper">
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
      </div>

      <BookList bookList={bookList}/>
      <PageButton getPage={page} pageEvent={changePage} prevPageEvent={()=>changePage(page.currentPage-1)} 
      nextPageEvent={()=>changePage(page.currentPage+1)}></PageButton>
    </div>
    </form>
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
    const response = await fetch('/ebook/count/'+country+"/"+genre+'/SearchWord='+inputSerch,{
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
    if(bookListData ==null)
      return false;
    return bookListData;
  } catch (e) {
    console.error(e);
    return false;
  }

}//검색하기


export default BookSearch;
