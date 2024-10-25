package kr.kh.ebook.contoller;

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
public class ReviewController {
	
	@Autowired
	BookService bookService;
	
	@GetMapping("selectBook/selectMyReview/{userId}/{bookNum}")
	@ResponseBody
	public ReviewVO selectMyReview(@PathVariable("userId") String userId,@PathVariable("bookNum") int bookNum) {
		return bookService.selectMyReview(userId, bookNum);
	}// 내 리뷰 보기   -없음 null
	
	//리뷰 작성
	@PostMapping("*/insertReview")
	@ResponseBody
	public boolean insertReview(@RequestBody ReviewVO writeUserReview) {
		System.out.println(writeUserReview);
		ReviewVO Myreview = bookService.selectMyReview(writeUserReview.getRe_me_id(), writeUserReview.getRe_bk_num());
		System.out.println(Myreview);
		if(Myreview != null)//리뷰가 존재 할 시 반환
			return false;
		boolean res = bookService.insertReview(writeUserReview);
		
		
		return res;
	}//리뷰 쓰기
	
	//리뷰 수정
	@PostMapping("*/updateReview")
	@ResponseBody
	public boolean updateReview(@RequestBody ReviewVO writeUserReview) {
		boolean res = bookService.updateReview(writeUserReview);
		return res;
	}
	
	//리뷰 삭제
	@GetMapping("*/deleteReview/{bookNum}/{id}")
	@ResponseBody
	public boolean deleteReview(@PathVariable("bookNum") int bookNum, @PathVariable("id") String id) {
		return bookService.deleteReview(bookNum,id);
	}
	
}