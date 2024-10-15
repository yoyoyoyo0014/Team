import {useEffect, useState, useContext} from 'react';
import { useSearchParams } from 'react-router-dom';
import { GenreContext } from '../../context/GenreContext';
import axios from 'axios';

function BookSearch() {
  //https://github.com/st8324/java_240528/blob/main/react/react3/src/Signup.js
  //let {country, genre, search, category, page} = useParams();
  const {genreList} = useContext(GenreContext);
  let [query, setQuery] = useSearchParams();

  let [data, setData] = useState({
    search : '',
    country : 'all',
    genre : 0,
    category : '',
    page : 0
  })//검색 시 필요한 목록


  let [bookList,setBookList] = useState([])
  let [bookCount,setBookCount] = useState(0); //책 숫자
  
  //let [search,setSearch] = useState('do not exist');
  // let [country,setCountry] = useState("all");
  // let [genre,setGenre] = useState(0);
  // let [category,setCategory] = useState('popularity');
  // let [page,setPage] = useState({
  //   contentsCount : 5,
  //   currentPage : 1,
  //   startPage : 1,
  //   endPage : 5,
  //   prev : false,
  //   next : false,
  //   pageList : []
  // })//페이지 이동버튼

  // function checkedCountry(e){
  //   setCountry(e.target.value);
  // }//국내, 국외인지 

  // function checkedGenre(num){
  //   setGenre(num);
  // }//장르 설정

  // function getCategory(e){
  //   setCategory(e.target.value);
  // }//카테고리 설정

  // function getSearch(e){
  //   setSearch(e.target.value);
  // }//검색 설정

  const options = {
    url: '/searchBook',
		method:'GET',
		header: {
			'Accept': 'application/json',
			'Content-Type': "'application/json';charset=UTP-8'"
		},
    data: {
      search: query.get('search')
    }
  }

  const submitSearch = async() => {
    console.log('axios called before');
    await axios(options)
    .then(res => {
      
      setBookList(res.data.bookList)
      console.log('axios called');
    })
    .catch((error) => {
      if (error.response) {
        // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
        console.log(error.response.status);
      } else if (error.request) {
        // 요청이 전송되었지만, 응답이 수신되지 않았습니다. 
        // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
        // node.js에서는 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      } else {
        // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
        console.log('Error', error.message);
      }
    })
  }

  useEffect(() => submitSearch, []);

  function changePage(index){
    console.log(index)
  }

  // function selectBookCount(){
  //   fetch("/ebook/searchBookCount/"+country+"/"+genre+"/"+search,{
  //     method : "post",
  //     //body : JSON.stringify(writeUserReview),
  //     headers: {
  //       'Content-Type': 'application/json',  // Content-Type 헤더 설정
  //     },
  //   })
  //   .then(res=>res.json())
  //   .then(reviewListData=>{
     
  //   })
  //   .catch(e=>console.error(e));
  // }

  return (
    <div >
      {/* <input onChange={e=>getSearch(e)} placeholder="검색칸"></input> */}
        <br/>
        <div>
          <label>
              <input type="radio" id="all" name="country" value="all" defaultChecked/>전체
            </label>

            <label>
              <input type="radio" id="domestic" name="country" value="domestic"/>국내
            </label>

            <label>
              <input type="radio" id="foreign" name="country" value="foreign"/>해외도서
            </label>
          <br/>
        </div>
        <div>
        <label>
           <input type="radio" id="popularity" name="category" value="popularity" defaultChecked/>인기순
          </label>
          
          <label>
            <input type="radio" id="latest" name="category" value="latest"/>최신순
          </label>

          <label>
          <input type="radio" id="orderPurchase" name="category" value="orderPurchase"/> 구매 순
          </label>

          <label>
            <input type="radio" id="highPrice" name="category" value="highPrice"/>높은 가격 순
          </label>

         <label>
          <input type="radio" id="lowPrice" name="category" value="lowPrice"/>낮은 가격 순
          </label>

          <label>
          <input type="radio" id="rating" name="category" value="rating"/>평점 순
          </label>

          <label>
          <input type="radio" id="review" name="category" value="review"/>리뷰 순
          </label> 
        </div>
          <br/>
          {genreList.map((item,index)=>(
              <label key={index} >
               <input type="radio" id={item.ge_num} name="genre" value={item.ge_num}/>{item.ge_name}
             </label> 
          ))}
        <input onClick={submitSearch} type="submit" value="제출"></input>
        {
          bookList.map((item,index)=>{
            return (<div key={index}>{item.bk_name} : {item.bk_price}</div>)
          })
        }
        
        {/* <button onClick={()=>changePage(page.currentPage-1)} disabled= {!page.prev}>이전</button> */}

      {/* {page.pageList.map((item,index)=>{
          return(<button  onClick={()=>changePage({index})} disabled={page.currentPage==(index+1)} key={index}>{item}</button>)
      })} */}

      {/* <button onClick={()=>changePage(page.currentPage+1)} disabled = {!page.next}>다음</button> */}

    </div>
  );
}

export default BookSearch;
