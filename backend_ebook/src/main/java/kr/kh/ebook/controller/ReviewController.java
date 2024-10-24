package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.service.BookService;

@RequestMapping("/review")
@RestController
public class ReviewController {
	
	@Autowired
	BookService bookService;
	
	// 내 리뷰 보기 - 없음 null
	//@GetMapping("selectBook/selectMyReview/{userId}/{bookNum}")
	@GetMapping("/myReviewCount/{bookNum}/{userId}")
	@ResponseBody
	public ReviewVO selectMyReview(@PathVariable("bookNum") int bookNum, @PathVariable("userId") String userId) {
		return bookService.selectMyReview(userId, bookNum);
	}
	
	//리뷰 보기
	@PostMapping("/reviewCount/{bookNum}")
	@ResponseBody
	public int reviewCount(@PathVariable("bookNum")int bookNum){
		int res = bookService.reviewCount(bookNum);
		return res;
	}
	
	//리뷰 보기
	@PostMapping("/selectReview/{bookNum}/{pageNum}")
	@ResponseBody
	public HashMap<String, Object> selectReview(@PathVariable("bookNum") int bookNum, @PathVariable("pageNum") int pageNum) {
		List<ReviewVO> list = bookService.selectReviewList(bookNum, pageNum);
		System.out.println(list);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("reviewList", list);
		return map;
	}
	
	//리뷰 작성
	@PostMapping("/insertReview")
	@ResponseBody
	public boolean insertReview(@RequestBody ReviewVO writeUserReview) {
		ReviewVO Myreview = bookService.selectMyReview(writeUserReview.getRe_me_id(), writeUserReview.getRe_bk_num());
		if(Myreview != null) return false;
		
		boolean res = bookService.insertReview(writeUserReview);
		if (res) {
			bookService.updateReviewCount(writeUserReview.getRe_bk_num());
			bookService.updateReviewScore(writeUserReview.getRe_bk_num(), writeUserReview.getRe_star());
			return true;
		} else return false;
	}
	
	//리뷰 수정
	@PostMapping("/updateReview")
	@ResponseBody
	public boolean updateReview(@RequestBody ReviewVO writeUserReview) {
		boolean res = bookService.updateReview(writeUserReview);
		return res;
	}
	
	//리뷰 삭제
	@PostMapping("/deleteReview")
	@ResponseBody
	public boolean deleteReview(@PathVariable("bookNum") int bookNum, @PathVariable("userId") String id) {
		System.out.println(bookNum + " " + id);
		//return bookService.deleteReview(bookNum, id);
		return false;
	}
	
}