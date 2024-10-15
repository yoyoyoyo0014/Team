package kr.kh.ebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.ReportTypeVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.BookPageMaker;
import kr.kh.ebook.pagination.Criteria;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.service.BookService;
import kr.kh.ebook.service.PostService;
import kr.kh.ebook.service.ReportService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class SearchBookController {
	
	@Autowired
	BookService bookService;
	
	//책 번호를 통해 책 정보 가져오기
	@GetMapping("/selectBook/{bookNum}")
	public BookVO selectBook(@PathVariable("bookNum") int bookNum) {
		return bookService.selectBook(bookNum);
	}
	
	//책 검색
	@GetMapping("/searchBook/{category}/{country}/{genre}/{count}/SearchWord={search}")
	public List<BookVO> searchBookList(@PathVariable String category,
			@PathVariable String country,@PathVariable int genre,
			@PathVariable String search,
			@PathVariable int count) {
		//https://github.com/st8324/java_240528/blob/main/spring%20projects/spring3/src/main/java/kr/kh/spring3/controller/ReactController.java
		
		BookCriteria bookCri = new BookCriteria(count,category,country,genre,search);
		BookPageMaker pm = new BookPageMaker(5, bookCri, count);
		try {
			List<BookVO> res = bookService.searchBookList(pm);
			return res;
		} catch (Exception e) {
			return null;
		}
		
	}
	
	//책 검색 개수만
	@GetMapping("/searchBookCount/{country}/{genre}/SearchWord={search}")
	public int selectBookCount(@PathVariable String country,
			@PathVariable int genre,
			@PathVariable String search) {
		
		int searchBookCount = bookService.searchBookCount(country,genre,search);
		return searchBookCount;
	}
	
	//리뷰 개수
	@GetMapping("selectBook/reviewCount/{bookNum}")
	
	public int reviewCount(@PathVariable("bookNum")int bookNum){
		int res = bookService.reviewCount(bookNum);
		return res;
	}//리뷰 보기
		
	//리뷰 리스트
	@GetMapping("selectBook/reviewList/{bookNum}/{pageNum}")
	
	public List<ReviewVO> reviewList(@PathVariable("bookNum")int bookNum, @PathVariable("pageNum") int pageNum){
		List<ReviewVO> res = bookService.selectReviewList(bookNum,pageNum);
		return res;
	}//리뷰 보기
	
	//해당 책 리뷰에 내 리뷰가 있는지 확인
//	@GetMapping("selectBook/selectMyReview/{userId}/{bookNum}")
	
//	public ReviewVO selectMyReview(@PathVariable("userId") String userId,@PathVariable("bookNum") int bookNum) {
//		return bookService.selectMyReview(userId, bookNum);
//	}// 내 리뷰 보기   -없음 null
	
	//리뷰 작성
//	@GetMapping("/insertReview")
//	
//	public boolean insertReview(@RequestBody ReviewVO writeUserReview) {
//		ReviewVO Myreview = bookService.selectMyReview(writeUserReview.getRe_me_id(), writeUserReview.getRe_bk_num());
//		
//		if(Myreview != null)//리뷰가 존재 할 시 반환
//			return false;
//		boolean res = bookService.insertReview(writeUserReview);
//		return res;
//	}//리뷰 쓰기
//	
//	//리뷰 수정
//	@GetMapping("/updateReview")
//	
//	public boolean updateReview(@RequestBody ReviewVO writeUserReview) {
//		boolean res = bookService.updateReview(writeUserReview);
//		return res;
//	}
//	
//	//리뷰 삭제
//	@GetMapping("*/deleteReview/{bookNum}/{id}")
//	
//	public boolean deleteReview(@PathVariable("bookNum") int bookNum, @PathVariable("id") String id) {
//		return bookService.deleteReview(bookNum,id);
//	}
	
	//읽고 있는책 현재 페이지    구매하지 않았다면 -1
	@GetMapping("/currentBookPage")
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
	@GetMapping("/updateBookPage")
	public boolean updateBookPage(@RequestParam BookListVO readBook) {
		return bookService.updateReadBook(readBook);
	}

	//장르 리스트 가져오기
	@GetMapping("/selectGenreList")
	@ResponseBody
	public List<BookGenreVO> selectGenreList(){
		List<BookGenreVO> res = bookService.selectGenreList();
		return res;
	}//리뷰 보기
}