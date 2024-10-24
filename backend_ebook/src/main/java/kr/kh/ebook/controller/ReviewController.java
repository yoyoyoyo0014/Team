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
import kr.kh.ebook.pagination.Criteria;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.service.BookService;

@RequestMapping("/review")
@RestController
public class ReviewController {
	
	@Autowired
	BookService bookService;
	
	// 내 리뷰 보기 - 없음 null
	@GetMapping("/myReviewCount/{bookNum}/{userId}")
	@ResponseBody
	public ReviewVO selectMyReview(@PathVariable("bookNum") int bookNum, @PathVariable("userId") String userId) {
		return bookService.selectMyReview(userId, bookNum);
	}
	
	// 내 리뷰 리스트 보기 - 없음 null
	@GetMapping("/myReview/{userId}/{pageNo}")
	@ResponseBody
	public HashMap<String, Object> selectAllMyReview(@PathVariable("userId") String userId, @PathVariable("pageNo") int pageNo) {
		Criteria cri = new Criteria(pageNo, 5);
		List<ReviewVO> list = bookService.selectAllMyReview(cri, userId);
		int cnt = bookService.selectMyReviewCount(userId);
		PageMaker pm = new PageMaker(5, cri, cnt);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pm", pm);
		return map;
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
		System.out.println("hi");
		List<ReviewVO> list = bookService.selectReviewList(bookNum, pageNum);
		HashMap<String, Object> map = new HashMap<String, Object>();
		System.out.println("review : " + list);
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
			bookService.updateReviewCount(writeUserReview.getRe_bk_num(), '+');
			bookService.updateReviewScore(writeUserReview.getRe_bk_num(), writeUserReview.getRe_star(), '+');
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
	@PostMapping("/deleteReview/{bookNum}/{userId}")
	@ResponseBody
	public boolean deleteReview(@PathVariable("bookNum") int bookNum, @PathVariable("userId") String userId) {
		ReviewVO myReview = bookService.selectMyReview(userId, bookNum);
		
		boolean res = false;
		//boolean res = 
		if (myReview != null) {
			bookService.updateReviewCount(myReview.getRe_bk_num(), '-');
			bookService.updateReviewScore(myReview.getRe_bk_num(), myReview.getRe_star(), '-');
			bookService.deleteReview(bookNum, userId);
			return true;
		} else return false;
	}
	
}