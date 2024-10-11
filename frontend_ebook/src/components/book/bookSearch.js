import {useState} from 'react';

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

  
  let [search,setSearch] = useState('');
  let [country,setCountry] = useState("all");
  let [genre,setGenre] = useState(0);
  let [category,setCategory] = useState('');
  let [page,setPage] = useState(0);

  let[genreList,setGenreList] = useState({
  })

  function checkedCountry(e){
    setCountry(e.target.value);
  }

  function checkedGenre(e){
    setGenre(e.target.value);
  }

  function getCategory(e){
    setCategory(e.target.value);
  }

  function getSearch(e){
    setSearch(e.target.value);
  }

  function getGenreList(){

  }//장르리스트 가져오는 함수
  
  function dataSubmit(){
    data.search = search;
    data.country = country;
    data.genre = genre;
    data.category = category;
    data.page = page;

    setData(data);
    
    console.log(data);

		fetch("/ebook/test/searchBook",{
			method : "post",
			body : JSON.stringify(data),
			headers : {
				"Content-type" : "application/json"
			}
		})
			.then(res=>res.text())
			.then(dataList=>{
				setBookList([...dataList]);
        console.log(dataList);
			})
			.catch(e=>console.error(e));
	}//데이터 보내기

  return (
    <div >
      <input onChange={e=>getSearch(e)} placeholder="검색칸"></input>
        <br/>
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

        <br/>
          {
            genreList.map((item,index)=>{
              return(
                <label>
                  <input onClick={e=>checkedGenre(e)} type="radio" id={item.sg_num} name = 'genre' value = {item.sg_num}>{item.sg_name}</input>
                </label>
              )
            })
          }
          
        <br/>

        <input onClick={dataSubmit}type="submit" value="제출"></input>

    </div>
  );
}

export default BookSearch;
