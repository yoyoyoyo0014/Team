package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.GenreVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.BookPageMaker;
import kr.kh.ebook.service.BookService;

@RequestMapping("/ebook")
@RestController
public class BookContoller {
	
	@Autowired
	BookService bookService;
	
	//책 번호를 통해 책 정보 가져오기
	@GetMapping("/selectBook/{bookNum}")
	@ResponseBody
	public HashMap<String, Object> selectBookPost(@PathVariable("bookNum") int bookNum) {
		BookVO book = bookService.selectBook(bookNum);
		List<WriterVO> writer = bookService.selectWriter(bookNum);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("book", book);
		map.put("writer", writer);
		return map;
	}//책 번호를 통해 책 정보 가져오기
	
	//책 검색
	@GetMapping("/searchBook")
	@ResponseBody
	public HashMap<String, Object> searchBookList(@PathVariable int category,
			@PathVariable String country, @PathVariable int genre,
			@PathVariable String search, @PathVariable int page) {
		//https://github.com/st8324/java_240528/blob/main/spring%20projects/spring3/src/main/java/kr/kh/spring3/controller/ReactController.java
		System.out.println(search);
		
		BookCriteria bookCri = new BookCriteria(page, category, country, genre);
		
		System.out.println(country + genre +"search" + search);

		BookPageMaker pm = new BookPageMaker(5, bookCri);
		HashMap<String, Object> map = new HashMap<String, Object>();
		List<BookVO> list = bookService.searchBookList(pm);
		map.put("bookList", list);
		System.out.println(list);
		return map;
	}
	
	//책 검색 개수만
	@PostMapping("/searchBookCount/{country}/{genre}/{search}")
	@ResponseBody
	public int selectBookCount(@PathVariable String country,
			@PathVariable int genre,
			@PathVariable String search) {
		
		if(search.equals("do not exist"))
			search = "";
		int searchBookCount = bookService.searchBookCount(country,genre,search);
		return searchBookCount;
	}
	
	//리뷰 개수
	@PostMapping("/reviewCount/{bookNum}")
	@ResponseBody
	public int reviewCount(@PathVariable("bookNum")int bookNum){
		int res = bookService.reviewCount(bookNum);
		return res;
	}//리뷰 보기
		
	//리뷰 리스트
	@PostMapping("/reviewList/{bookNum}/{pageNum}")
	@ResponseBody
	public HashMap<String, Object> reviewList(@PathVariable("bookNum")int bookNum, @PathVariable("pageNum") int pageNum){
		List<ReviewVO> list = bookService.selectReviewList(bookNum,pageNum);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("reviewList", list);
		return map;
	}//리뷰 보기
	
	//해당 책 리뷰에 내 리뷰가 있는지 확인
	@PostMapping("/selectMyReview/{userId}/{bookNum}")
	@ResponseBody
	public ReviewVO selectMyReview(@PathVariable("userId") String userId, @PathVariable("bookNum") int bookNum) {
		return bookService.selectMyReview(userId, bookNum);
	}// 내 리뷰 보기 - 없음 null
	
	//리뷰 작성
	@PostMapping("/insertReview")
	@ResponseBody
	public boolean insertReview(@RequestBody ReviewVO writeUserReview) {
		ReviewVO Myreview = bookService.selectMyReview(writeUserReview.getRe_me_id(), writeUserReview.getRe_bk_num());
		
		if(Myreview != null)//리뷰가 존재 할 시 반환
			return false;
		boolean res = bookService.insertReview(writeUserReview);
		return res;
	}//리뷰 쓰기
	
	//리뷰 수정
	@PostMapping("/updateReview")
	@ResponseBody
	public boolean updateReview(@RequestBody ReviewVO writeUserReview) {
		boolean res = bookService.updateReview(writeUserReview);
		return res;
	}
	
	//리뷰 삭제
	@PostMapping("/deleteReview/{bookNum}/{id}")
	@ResponseBody
	public boolean deleteReview(@PathVariable("bookNum") int bookNum, @PathVariable("id") String id) {
		return bookService.deleteReview(bookNum,id);
	}
	
	//읽고 있는책 현재 페이지    구매하지 않았다면 -1
	@PostMapping("/currentBookPage")
	public int selectReadBook(@RequestParam int bookNum,@RequestParam String userId) {
		try {
			 BookListVO readBook = bookService.selectReadBook(bookNum,userId);
			 if(readBook==null)
				 return -1;//구매하지 않은 책
			return readBook.getBl_nowPage();
		}catch(Exception e) {
			return 1;
		}//혹시 여러개 있음을 방지
	}
	
	//읽고 있는 책 완독률 저장
	@PostMapping("/updateBookPage")
	public boolean updateBookPage(@RequestParam BookListVO readBook) {
		return bookService.updateReadBook(readBook);
	}

	//장르 리스트 가져오기
	@PostMapping("/selectGenreList")
	@ResponseBody
	public List<GenreVO> selectGenreList(){
		return bookService.selectGenreList();
	}//리뷰 보기
}