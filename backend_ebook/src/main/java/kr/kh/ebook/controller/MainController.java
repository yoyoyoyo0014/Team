package kr.kh.ebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.Criteria;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.service.BookService;

@Controller
public class MainController {
	
	@Autowired
	BookService bookService;
	
	@GetMapping("/")
	public String main() {
		return "index";
	}
	
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
	}// 내 리뷰 보기 없음 null
	
	@PostMapping("/insertReview")
	public boolean insertReview(@RequestParam ReviewVO review) {
		ReviewVO Myreview = bookService.selectMyReview(review.getRe_me_id(), review.getRe_bk_num());
		
		if(Myreview != null)
			return false;
		
		return bookService.insertReview(review);
	}//리뷰 쓰기
}