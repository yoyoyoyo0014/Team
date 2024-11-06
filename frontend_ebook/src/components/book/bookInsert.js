import {useEffect, useState, Fragment, useContext} from 'react';
import SearchWriterList, { selectWriterType } from './WriterList';
import MakePage, { PageButton } from '../pageButton';
import { SearchWriterListCount } from './WriterList';
import ePub, { Book } from 'epubjs';
import Modal from 'react-modal';
import IsbnSearch from './IsbnSearch';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Input, InputItem } from '../form/input';
import {GenreContext} from '../../context/GenreContext';
import Button from '../form/button';
import '../../css/bookinsert.css';

Modal.setAppElement('#root'); // 접근성 관련 설정 (필수)

function BookInsert() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const {majorGenreList, genreList} = useContext(GenreContext);
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
    bk_me_id : '',//출판사

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
      let elm = document.querySelector('#bk_name');
      elm.focus();
      alert('이름을 입력해 주세요.')
      return false;
    }
  
    if(!book.bk_date ){
      let elm = document.querySelector('#bk_date')
      elm.focus();
      alert('출판일을 추가해주세요')
      return false;
    }
    if(book.bk_sg_num == 0){
      let elm = document.querySelector('#book_sg')
      elm.focus();
      alert('장르를 선택해주세요')
      return false;
    }
    if(book.bk_price == 0){
      var free = window.confirm("무료입니까?")
      if(!free) {
        let elm = document.querySelector('#bk_price')
      elm.focus();
      alert('가격을 적어주세요')
        return;
      }
    }
    if(!book.bk_isbn){
      let elm = document.querySelector('#bk_isbn')
      elm.focus();
      alert('isbn을 추가해주세요')
      return false;
    }
    if(!bookEqubFile){
      let elm = document.querySelector('#bk_epub')
      elm.focus();
      alert('EPUB 파일을 넣어주세요')
      return false;
    }
    if(book.bk_totalPage==0){
      let elm = document.querySelector('#bk_totalpage')
      elm.focus();
      alert('총 페이지를 적어주세요.')
      return false;
    }

    if(!book.bk_publisher){
      let elm = document.querySelector('#bk_publisher')
      elm.focus();
      alert('출판사를 적어주세요.');
      return false;
    }

    if(!bookImgFile){
      let elm = document.querySelector('#bk_img')
      elm.focus();
      alert('책 표지 파일을 넣어주세요')
      return false;
    }
    return true;
  }//빈 칸 확인

  function submitFile(e){
    e.preventDefault();
    if(!checkInsertBook(book))
      return;

    for(var i = 0; i<addWriterList.length;i++)
      delete addWriterList[i].wr_name;

    var formData = new FormData();
    formData.append('bk_img', bookImgFile);
    formData.append('bk_epub', bookEqubFile);

    console.log( book)
    formData.append('bk_data',JSON.stringify(book));
    formData.append('writerList',JSON.stringify(addWriterList));

    fetch('/ebook/insertBook',{
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

  const [isBkNameDuplicate, setIsBkNameDuplicate] = useState(false);
  const checkDuplicateBkName = async (bk_name) => {
    try {
      const response = await fetch(`/ebook/member/check-duplicate-nickname?me_nickname=${bk_name}`);
      const result = await response.json();
      setIsBkNameDuplicate(result.exists); // 중복일 경우 true, 그렇지 않으면 false
    } catch (error) {
      console.error("Error checking nickname:", error);
    }
  };

  useEffect(()=>{
    (async () => {
      writerTypeList = await selectWriterType();
      setWriterTypeList([...writerTypeList]);
    })();
    console.log(genreList);
    console.log(majorGenreList);
  },[]);

  return (
    <Fragment>
      <h2 className="page-title txt-center">책 정보 입력</h2>
      <form name="insert_book" onSubmit={e => submitFile(e)}>
        <fieldset className="form-wrapper">
          <div className="input-item">
            <input id="bk_name"
              name="bk_name"
              value={book.bk_name}
              onChange={e => {setBook(prev => {
                return {...prev, bk_name: e.target.value}
              })}}
              type="text"
              placeholder="최대 50자 입력 가능"
              registerProps={register("bk_name", {
                required: "책 제목을 입력해주세요",
                pattern: {
                  value: /^[a-zA-Z0-9]{1,50}$/,
                  message: "책 제목은 최대 50자입니다",
                },
                onBlur: (e) => checkDuplicateBkName(e.target.value), // 중복 체크
              })}/>
              <label htmlFor="bk_name">책 제목</label>
          </div>

          <div className="input-item" style={{display: 'flex'}}>
            <input
              type="radio"
              id="bk_state_1"
              name="bk_state"
              onClick={() => {
                setBook(prev => {return {...prev, bk_state: '국내도서'}});
              }}/>
            <label htmlFor="bk_state_1">국내도서</label>

            <input
              type="radio"
              id="bk_state_2"
              name="bk_state"
              onClick={() => {
                setBook(prev => {return {...prev, bk_state: '해외도서'}});
              }}/>
            <label htmlFor="bk_state_2">해외도서</label>
          </div>

          <div className="input-item">
            <input id="bk_img" name="bk_img" onChange={e=>setBookImgFile(e.target.files[0])} type = "file" accept="image/*"/>
            <label htmlFor="bk_img">책 표지</label>
          </div>

          <div className="input-item">
            <input id="bk_epub" onChange={e=>{
              setBookEqubFile(e.target.files[0]);
              let books= new ePub(e.target.files[0])//.items//.length; // 챕터(섹션) 수
              books.loaded.navigation.then((nav) => {
              const chapterList = nav.toc.map((chapter) => chapter.label);
              book.bk_totalPage = chapterList.length;
                setBook({...book});
                console.log(book) 
              })
            }} type="file" accept=".epub" />
            <label htmlFor="bk_epub">epub 파일</label>
          </div>
          
          <InputItem type="text" id="bk_totalpage" readOnly={true} value={book.bk_totalPage} label="전체 페이지 수"/>

          <div className="input-item">
            <input onChange={e=>{
              book.bk_publisher = e.target.value;
              setBook({...book});
            }} type="text" maxLength="50" placeholder="출판사 이름 50글자 내외" name="bk_publisher" id="bk_publisher" />
            <label htmlFor="bk_publisher">출판사 이름</label>
          </div>

          
          <div className="input-item">
            <textarea onChange={e=>{
              book.bk_plot = e.target.value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
              setBook({...book});
            }} placeholder="줄거리"></textarea>
            <label htmlFor="bk_log">줄거리</label>
          </div>
          
          <div className="input-item">
            <input name="bk_price" id="bk_price" onChange={e=>{
              book.bk_price = e.target.value;
              setBook({...book});
            }} type="text" placeholder="원" />
            <label htmlFor="bk_price">가격</label>
          </div>

          <div className="input-item">
            <label>연령 제한</label>
            <select name="bk_agelimit" id="bk_agelimit" onChange={(e)=>{
              book.bk_agelimit = Number(e.target.value);
              setBook(book)}}>
              <option value={0}>전체 이용가</option>
              <option value={15}>15세 이용가</option>
              <option value={19}>19세 이용가</option>
            </select>
          </div>

          <div className="input-item">
            <textarea name="bk_index" id="bk_index" onChange={e=>{
              book.bk_index = e.target.value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
              setBook({...book});
            }}></textarea>
            <label htmlFor="bk_index">목차</label>
          </div>

          <div className="input-item" style={{display: 'flex', gap: '1em'}}>
            <input value={book.bk_isbn || ''} type="text" id="bk_isbn" name="bk_isbn" style={{width: '300px'}} readOnly/>
            <label htmlFor="bk_isbn">isbn</label>
            <Button type="button" id="bk_isbn" click={()=>setModalIsOpen(true)} text={<i class="fa-solid fa-magnifying-glass"></i>} cls="btn btn-point" />
          </div>

          <div className="input-item">
            <input id="bk_date" name="bk_date" onChange={e=>{
              book.bk_date= e.target.value;
              setBook({...book});
            }} type="date" style={{width: '200px'}}/>
            <label htmlFor="bk_date">출판일</label>
          </div>

          <div className="input-item">
            <div div className="theme-box genre-wrapper">
              {genreList && genreList.map((genre, i) => {
                return(<div>
                  <strong>{majorGenreList[i].ge_name}</strong>
                  <ul>
                    {
                      genre.length !== undefined && genre.map(secondGenre => {
                        return(<li>
                          <input onClick={()=>{
                            book.bk_sg_num = genre.sg_parent;
                            setBook({...book, bk_sg_num: secondGenre.ge_num});
                            }} type='radio' name="secondGenre" id={"genre_" + secondGenre.ge_num} />  
                          <label htmlFor={"genre_" + secondGenre.ge_num}>{secondGenre.ge_name}</label>
                        </li>)
                      })
                    }
                  </ul>
                </div>)
              }
            )}
            </div>
            <label htmlFor="bk_sg_num">장르 선택</label>
          </div>

          <div className="input-item">
            <input type="text" id="bk_writer" name="bk_writer" onChange={e=>{setCurrentWriterPage(1);
              SetCurrentWriterSearch(e.target.value); 
              searchWriter(1);}} placeholder="작가 검색"/>
            <label htmlFor="bk_writer">작가 검색</label>

            <table className="theme-box" style={{width: '100%', marginTop: '1.5em'}}>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>프로필</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(searchWriterList) && searchWriterList.length > 0 && searchWriterList.map((item, index) => {
                  return(
                    <tr key={index}>
                      <td>{item.wr_name}</td>
                      <td>{item.wr_profile}</td>
                      <td><Button type="button" cls="btn-point btn" click={()=>{addWriterLists(item)}} text="추가" style={{width: '70px'}}/></td>
                    </tr>
                  )
                  })
                }
              </tbody>
          </table>
          <PageButton getPage={writerPage}/>

          <table className="theme-box" style={{width: '100%'}}>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>작가유형</th>
                </tr>
            </thead>
            <tbody>
              {Array.isArray(addWriterList) && addWriterList.length > 0 && addWriterList.map((item, index) => {
                  {return (
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
          </div>
        </fieldset>
        <Button text="보내기" type="submit" cls="btn btn-point"/>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: 'rgba(1, 1, 1, 0.5)', zIndex: 100 },
          content: {
              color: 'black',
              padding: '20px',
              borderRadius: '8px',
              width: '600px',       // 모달 창 너비 설정
              maxWidth: '90%',      // 작은 화면에서 최대 너비 설정
              margin: '0 auto',      // 화면 중앙에 모달을 정렬
              height : '600px'
          },
      }}>
        <IsbnSearch exit={()=>setModalIsOpen(false)} onClose={isbnAddBookData} />
      </Modal>
    </Fragment>
  )
}

export default BookInsert;