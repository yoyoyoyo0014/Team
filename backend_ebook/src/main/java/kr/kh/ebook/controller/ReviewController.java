package kr.kh.ebook.controller;

<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/controller/ReviewController.java
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
=======
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/controller/ReviewController.java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/controller/ReviewController.java
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
=======
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.pagination.Criteria;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.service.BookService;

@RequestMapping("/review")
@RestController
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/controller/ReviewController.java
public class ReviewController {
	
	@Autowired
	BookService bookService;
	
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/controller/ReviewController.java
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
=======
	// 내 리뷰 보기 - 없음 null
	@GetMapping("/myReviewCount/{bookNum}/{userId}")
	@ResponseBody
	public ReviewVO selectMyReview(@PathVariable("bookNum") int bookNum, @PathVariable("userId") String userId) {
		return bookService.selectMyReview(userId, bookNum);
	}
	
	// 내 리뷰 리스트 보기 - 없음 null
	@PostMapping("/myReview/{userId}/{pageNum}")
	@ResponseBody
	public HashMap<String, Object> selectAllMyReview(@PathVariable("userId") String userId, @PathVariable("pageNum") int pageNum) {
		Criteria cri = new Criteria(pageNum, 1);
		List<ReviewVO> list = bookService.selectAllMyReview(cri, userId);
		int cnt = bookService.selectMyReviewCount(userId);
		PageMaker pm = new PageMaker(2, cri, cnt);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("reviewList", list);
		map.put("reviewPm", pm);
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
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/controller/ReviewController.java
	@ResponseBody
	public boolean updateReview(@RequestBody ReviewVO writeUserReview) {
		boolean res = bookService.updateReview(writeUserReview);
		return res;
	}
	
	//리뷰 삭제
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/controller/ReviewController.java
	@GetMapping("*/deleteReview/{bookNum}/{id}")
	@ResponseBody
	public boolean deleteReview(@PathVariable("bookNum") int bookNum, @PathVariable("id") String id) {
		return bookService.deleteReview(bookNum,id);
=======
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
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/controller/ReviewController.java
	}
	
}