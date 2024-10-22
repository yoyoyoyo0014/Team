import {useEffect, useState} from 'react';
import SelectGenreList, { SelectSecondGenreList } from './BookGenreList';
import SearchWriterList, { selectWriterType } from './WriterList';
import MakePage, { PageButton } from '../pageButton';
import { SearchWriterListCount } from './WriterList';
import ePub, { Book } from 'epubjs';
import Modal from 'react-modal';
import IsbnSearch from './IsbnSearch';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root'); // 접근성 관련 설정 (필수)

function BookInsert() {

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  let[bookImgFile,setBookImgFile] = useState(null)//책표지 파일
  
  let[bookEqubFile,setBookEqubFile] = useState(null)//책 equb 파일

  let [book,setBook] = useState({
    bk_num : 0, //도서 번호
    bk_name : '', //도서 이름
    bk_state : '국내도서', // 국내도서, 해외도서
    bk_date : '', //출간일
    bk_sg_num : 0,  //도서 분류
    bk_plot : '', //줄거리
    bk_price : 0, //가격
    bk_amount : 0, //재고
    bk_index : '',  //목차
    bk_isbn : '', //isbn
    bk_score : 0, //평점
    bk_reviewCount : 0, //총 리뷰 수
    bk_totalPage : 0,  //총 페이지
    bk_agelimit : 0, //연령제한
    bk_publisher : '',//출판사

    bk_totalPurchase: 0,  //총 구매 수
    bk_age_60_male: 0,  //60대 남자
    bk_age_60_female: 0,  //60대 여자
    bk_age_50_male: 0,  //50대 남자
	  bk_age_50_female: 0,  //50대 여자
  	bk_age_40_male: 0,  //40대 남자
  	bk_age_40_female: 0,  //40대 여자
    bk_age_30_male: 0,  //30대 남자
	  bk_age_30_female: 0,  //30대 여자
	  bk_age_20_male: 0,  //20대 남자
  	bk_age_20_female: 0,  //20대 여자
	  bk_age_10_male: 0,  //10대 남자
	  bk_age_10_female: 0  //10대 여자
  })//책 데이터

  let [selectedGenreNum,setSelectedGenreNum] = useState(0);  //클릭한 장르 번호
  let [genreList,setGenreList] = useState([]);//가져온 장르 리스트
  let [secondGenreList,setSecondGenreList] = useState([])//가져온 2장르 리스트

  let[searchWriterList,setSearchWriterList] = useState([]);//검색한 작가 리스트
  let[currentWriterSearch,SetCurrentWriterSearch] = useState('')//현재 작가 검색 단어
  let[currentWriterPage,setCurrentWriterPage] = useState(0);//현재 작가 검색 페이지
  
  let[writerPage,setWriterPage] = useState({
    contentsCount : 0,
    currentPage : 0,
    startPage : 0,
    endPage : 0,
    prev : false,
    next : false,
    pageList : []
  })//작가 서치 페이지

  let[addWriterList,setAddWriterList] = useState([])//추가할 작가

  let[writerTypeList,setWriterTypeList] = useState([])//작가 유형종류 리스트

  function checkInsertBook(book){
    if(book.bk_name.length == 0){
      var elm = document.querySelector('#bk_name');
      elm.focus();
      alert('이름을 입력해 주세요.')
      return false;
    }
  
    if(!book.bk_date ){
      var elm = document.querySelector('#bk_date')
      elm.focus();
      alert('출판일을 추가해주세요')
      return false;
    }
    if(book.bk_sg_num == 0){
      
      var elm = document.querySelector('#book_sg')
      elm.focus();
      alert('장르를 선택해주세요')
      return false;
    }
    if(book.bk_price == 0){
      var free = window.confirm("무료입니까?")
      if(!free) {
        var elm = document.querySelector('#bk_price')
      elm.focus();
      alert('가격을 적어주세요')
        return;
      }
    }
    if(!book.bk_isbn){
      var elm = document.querySelector('#bk_isbn')
      elm.focus();
      alert('isbn을 추가해주세요')
      return false;
    }
    if(!bookEqubFile){
      var elm = document.querySelector('#bk_epub')
      elm.focus();
      alert('EPUB 파일을 넣어주세요')
      return false;
    }
    if(book.bk_totalPage==0){
      var elm = document.querySelector('#bk_totalpage')
      elm.focus();
      alert('총 페이지를 적어주세요.')
      return false;
    }
   
    if(!bookImgFile){
      var elm = document.querySelector('#bk_img')
      elm.focus();
      alert('책 표지 파일을 넣어주세요')
      return false;
    }
    return true
  }

  function submitFile(){
    if(!checkInsertBook(book)){
      return
    }
      

    for(var i = 0; i<addWriterList.length;i++)
      delete addWriterList[i].wr_name;

    var formData = new FormData();
    formData.append('bK_img',bookImgFile);
    formData.append('bK_epub',bookEqubFile);

    
    formData.append('bk_data',JSON.stringify(book));
    formData.append('writerList',JSON.stringify(addWriterList));
    //book,addWriterList, bookImgFile,bookEqubFile); // 'file'은 서버에서 기대하는 파라미터 이름과 동일해야 함

    
    fetch('insertBook',{
      method: 'POST',
      body: formData,
    })
    .then(res=>res.text())
    .then(success=>{
      if(success){
        alert("책 추가에 성공했습니다.")
        navigate("/");
      }else{
        alert("책 추가에 실패하였습니다.")
      }
    }
    ).catch(e=>console.error(e))

  }//파일 보내기

  async function searchWriter(num){
    currentWriterPage = num;
    var listCount =await SearchWriterListCount(currentWriterSearch);
    console.log(currentWriterSearch)
    writerPage = MakePage(listCount,currentWriterPage);

    searchWriterList = await SearchWriterList(currentWriterSearch,currentWriterPage)
    console.log(searchWriterList);
    setSearchWriterList(searchWriterList);
  }//작가 검색하기

  function addWriterLists(writer){
    var addWriter = {
      wr_name :'',
      wl_num : 0,
      wl_wr_num : 0,
      wl_bk_num : 0,
      wl_wt_num : 1,
    }
    addWriter.wr_name = writer.wr_name;
    addWriter.wl_wr_num = writer.wr_num;
    addWriterList.unshift(addWriter);
    setAddWriterList([...addWriterList]) 
  }//작가 리스트에 추가하기

  function isbnAddBookData(data){
    book.bk_isbn = data.isbn;
    book.bk_name = data.titleInfo;
    setBook(book);
  }

  useEffect(()=>{
    (async () => {
      genreList = await SelectGenreList();
      secondGenreList = await SelectSecondGenreList();
      writerTypeList = await selectWriterType();
      
      setWriterTypeList([...writerTypeList]);
      setGenreList([...genreList]);
      setSecondGenreList([...secondGenreList]);
    })();
  },[]);
  return (
    <div>
      <label>
        책 이름
        <input id = 'bk_name' value={book.bk_name} onChange={e=>{
          book.bk_name = e.target.value
          setBook({...book});}} type='text' maxLength="50" placeholder="최대 50자 입력 가능" />
      </label>
      <br/>
      <br/>

      <label>
        국내도서
        <input id = 'bk_state' onClick={e=>{
          book.bk_state = e.target.value
          setBook({...book});}}  defaultChecked type='radio' name='country' value={"국내도서"}/>
      </label>

      <label>
        해외도서
        <input onClick={e=>{
          book.bk_state = e.target.value
          setBook({...book});}} type='radio' name='country' value={"해외도서"}/>
      </label>
      <br/>
      <br/>

      <label> 책 표지
        <input id = 'bk_img' onChange={e=>setBookImgFile(e.target.files[0])}type = "file" accept="image/*"></input>
      </label>
      <br/>
      <br/>
      
      <label> 책.epub
        <input id = 'bk_epub' onChange={e=>{setBookEqubFile(e.target.files[0]);
         var books= new ePub(e.target.files[0])//.items//.length; // 챕터(섹션) 수
          books.loaded.navigation.then((nav) => {
           const chapterList = nav.toc.map((chapter) => chapter.label);
           book.bk_totalPage = chapterList.length;
            setBook({...book});
            console.log(book) 
          })
        }}type = "file" accept=".epub" ></input>
      </label>
      <br/>
      <br/>

      <label> 총페이지
        <input id='bk_totalpage' disabled value={book.bk_totalPage} ></input>
      </label>
      <br/>
      <br/>

      <label id = 'bk_pub'>
        출판사 이름
        <input onChange={e=>{
          book.bk_publisher = e.target.value;
          setBook({...book});
        }} type='text' maxLength="50" placeholder="출판사 이름 50글자 내외" />
      </label>
      <br/>
      <br/>

      <label id = 'bk_log'> 
        줄거리
        <input  onChange={e=>{
          book.bk_plot = e.target.value;
          setBook({...book});
        }} type='text' maxLength="50" placeholder="줄거리" />
      </label>
      <br/>
      <br/>

      <label id = 'bk_price'>
        가격
        <input  onChange={e=>{
          book.bk_price = e.target.value;
          setBook({...book});
        }} type='number' placeholder="원" />
      </label>
      <br/>
      <br/>

      <label id = 'bk_amount'>
        개수
        <input  onChange={e=>{
          book.bk_amount = e.target.value;
          setBook({...book});
        }} type='number' placeholder="개" />
      </label>
      <br/>
      <br/>

      <label id = 'bk_amount'>
        연령제한
        <select onChange={(e)=>
            {
              book.bk_agelimit = Number(e.target.value);
              setBook(book)
            }}>
          <option value={0}>전체이용가</option>
          <option value={15}>15세이용가</option>
          <option value={19}>19세 이용가</option>
        </select>
      </label>
      <br/>
      <br/>
      

      <label>목차
        <input  onChange={e=>{
          book.bk_index = e.target.value;
          setBook({...book});
        }} type='text' />
      </label>
      <br/>
      <br/>

      <label>isbn
        <input  value = {book.bk_isbn || ''} disabled type='text' />
      </label>
      <button id = "bk_isbn" onClick={()=>setModalIsOpen(true)}>책 검색하기</button>
      <br/>
      <br/>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: 'rgba(1, 1, 1, 0.5)', zIndex:100 },
          content: { color: 'black', padding: '20px', borderRadius: '8px'},
        }}>
        <IsbnSearch exit={()=>setModalIsOpen(false)} onClose={isbnAddBookData} />
      </Modal>

      <label> 출판일
        <input id ="bk_date" onChange={e=>{
          book.bk_date= e.target.value;
          setBook({...book});
        }} type = "date"></input>
      </label>
      <br/>
      <br/>

     

      <label id = "book_sg">모두
             <input onClick={()=>setSelectedGenreNum(0)} defaultChecked type='radio' name='genre'/>
      </label>
      {
        Array.isArray(genreList) && genreList.length > 0 && genreList.map((item, index) => {
          return (
            <label  key={index}>{item.ge_name}
             <input onClick={()=>setSelectedGenreNum(item.ge_num)} checked={selectedGenreNum == item.ge_num}
              onChange={()=>setSelectedGenreNum(item.ge_num)} type='radio' name='genre'/>
            </label>
          );
        })
      }
      <br/>
      <br/>
      
      {
        Array.isArray(secondGenreList) && secondGenreList.length > 0 && secondGenreList.map((item, index) => {
          if(selectedGenreNum===0|| item.sg_parent==selectedGenreNum){
            return (
              <label key={index}>{item.sg_name}
               <input onClick={()=>{
                setSelectedGenreNum(item.sg_parent);
                book.bk_sg_num = item.sg_parent;
                setBook({...book});
                }} type='radio' name='secondGenre'/>
              </label>
            );
          }
        })
      }
       <br/>
       <br/>
      <label>작가 검색
        <input onChange={e=>{setCurrentWriterPage(1);
           SetCurrentWriterSearch(e.target.value); 
           searchWriter(1);}} placeholder='작가 검색'/>
      </label>

      <br/>
      <table>
        <thead>
            <tr>
                <th>이름</th>
                <th>프로필</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          {
            Array.isArray(searchWriterList) && searchWriterList.length > 0 && searchWriterList.map((item, index) => {
            return(
              <tr key={index}>
                <td>{item.wr_name}</td>
                <td>{item.wr_profile}</td>
                <td><button onClick={()=>{addWriterLists(item)}}>추가하기</button></td>
              </tr>
            )
            })
          }
        </tbody>
    </table>
    <PageButton getPage={writerPage}/>
    <br/>
    <br/>
    <table>
        <thead>
            <tr>
                <th>이름</th>
                <th>작가유형</th>
            </tr>
        </thead>
        <tbody>
          {
             Array.isArray(addWriterList) && addWriterList.length > 0 && addWriterList.map((item, index) => {
              {
                return (
                 <tr key={index}>
                  <td>{item.wr_name}</td>
                  <td>
                    <select onChange={(e)=>
                    {
                      addWriterList[index].wl_wt_num = Number(e.target.value);
                      setAddWriterList([...addWriterList]);
                    }}>
                      {
                       Array.isArray(writerTypeList) && writerTypeList.length > 0 && writerTypeList.map((item, index) =>{
                          return (
                          <option key={index+1} id={item.wt_num} value={item.wt_num}>{item.wt_name}</option>
                         )
                        })
                      }
                    </select>
                  </td>
                 </tr>
                );
              }
            })
          }
        </tbody>
    </table>

    <button onClick={submitFile}>보내기</button>
    </div>
  )
}

export async function InsertBook(book,imgFile,equbFile,writerList){
  fetch('insertBook',{
    method : "post",
    body : JSON.stringify(book,imgFile,equbFile,writerList),
    headers: {
      'Content-Type': 'application/json',  // Content-Type 헤더 설정
    },
  })
}



export default BookInsert;
