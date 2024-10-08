package kr.kh.ebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.Criteria;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.service.BookService;

@Controller
@RequestMapping("/ebook")
public class BookContoller {
	
	@Autowired
	BookService bookService;
	
	@PostMapping("/selectBook/{bookNum}")
	@ResponseBody
	public BookVO selectBook(@PathVariable("bookNum") int bookNum) {
		return bookService.selectBook(bookNum);
	}//책 번호를 통해 책 정보 가져오기
	
	
	@PostMapping("/search")
	public List<BookVO> searchBookList(@RequestParam String category,@RequestParam String country,@RequestParam int genre,@RequestParam String search,@RequestParam int page) {
		//https://github.com/st8324/java_240528/blob/main/spring%20projects/spring3/src/main/java/kr/kh/spring3/controller/ReactController.java
		BookCriteria bookCri = new BookCriteria(page,category,country,genre);
		
		int searchBookCount = bookService.searchBookCount(bookCri);
		
		PageMaker pm = new PageMaker(5, bookCri, searchBookCount);
		
		return bookService.searchBookList(pm);
	}//책 검색
	
	@PostMapping("/reviewList")
	public List<ReviewVO> reviewList(@RequestParam int bookNum, @RequestParam int page){
		Criteria cri = new Criteria(page);
		
		int reviewCount = bookService.reviewCount(bookNum);
		
		PageMaker pm = new PageMaker(5,cri,reviewCount);
		return bookService.selectReviewList(pm,bookNum);
	}//리뷰 보기
	
	@PostMapping("/selectMyReview")
	public ReviewVO selectMyReview(@RequestParam String userId,@RequestParam int bookNum) {
		return bookService.selectMyReview(userId, bookNum);
	}// 내 리뷰 보기   -없음 null
	
	@PostMapping("/insertReview")
	public boolean insertReview(@RequestParam ReviewVO review) {
		ReviewVO Myreview = bookService.selectMyReview(review.getRe_me_id(), review.getRe_bk_num());
		
		if(Myreview != null)//리뷰가 존재 할 시 반환
			return false;
		
		return bookService.insertReview(review);
	}//리뷰 쓰기
	
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
		
	}//읽고 있는책 현재 페이지    구매하지 않았다면 -1
	
	@PostMapping("/updateBookPage")
	public boolean updateBookPage(@RequestParam BookListVO readBook) {
		return bookService.updateReadBook(readBook);
	}//읽고 있는 책 완독률 저장
	
}