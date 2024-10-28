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
import kr.kh.ebook.service.ReportService;

@Controller
@RequestMapping("/ebook")
public class BookContoller {
	
	@Autowired
	BookService bookService;
	
	//책 번호를 통해 책 정보 가져오기
	@PostMapping("/selectBook/{bookNum}")
	@ResponseBody
	public BookVO selectBook(@PathVariable("bookNum") int bookNum) {
		return bookService.selectBook(bookNum);
	}
	
	//책 검색
	@PostMapping("/searchBook/{category}/{country}/{genre}/{count}/SearchWord={search}")
	@ResponseBody
	public List<BookVO> searchBookList(@PathVariable String category,
			@PathVariable String country,@PathVariable int genre,
			@PathVariable String search,
			@PathVariable int count) {
		//https://github.com/st8324/java_240528/blob/main/spring%20projects/spring3/src/main/java/kr/kh/spring3/controller/ReactController.java
		
		BookCriteria bookCri = new BookCriteria(count,category,country,genre,search);
		BookPageMaker pm = new BookPageMaker(5, bookCri, count);
		
		List<BookVO> res = bookService.searchBookList(pm);
		return res;
	}
	
	//책 검색 개수만
	@PostMapping("/searchBookCount/{country}/{genre}/SearchWord={search}")
	@ResponseBody
	public int selectBookCount(@PathVariable String country,
			@PathVariable int genre,
			@PathVariable String search) {
		
		if(search.equals("doNotExist"))
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
	public List<ReviewVO> reviewList(@PathVariable("bookNum")int bookNum, @PathVariable("pageNum") int pageNum){
		List<ReviewVO> res = bookService.selectReviewList(bookNum,pageNum);
		return res;
	}//리뷰 보기
	
	//해당 책 리뷰에 내 리뷰가 있는지 확인
	@PostMapping("/selectMyReview/{userId}/{bookNum}")
	@ResponseBody
	public ReviewVO selectMyReview(@PathVariable("userId") String userId,@PathVariable("bookNum") int bookNum) {
		return bookService.selectMyReview(userId, bookNum);
	}// 내 리뷰 보기   -없음 null
	
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
	
	
	//읽고 있는 책 완독률 저장
	@PostMapping("/updateBookPage")
	public boolean updateBookPage(@RequestParam BookListVO readBook) {
		return bookService.updateReadBook(readBook);
	}

	//장르 리스트 가져오기
	@PostMapping("/selectGenreList")
	@ResponseBody
	public List<BookGenreVO> selectGenreList(){
		return bookService.selectGenreList();
	}//리뷰 보기
}