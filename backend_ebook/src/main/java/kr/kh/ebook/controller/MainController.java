package kr.kh.ebook.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.pagination.PostCriteria;
import kr.kh.ebook.service.BookService;
import kr.kh.ebook.service.PostService;

@RequestMapping("/")
@RestController
public class MainController {
	
	@Autowired
	BookService bookService;
	
	@Autowired
	PostService postService;

	@GetMapping("/main")
	@ResponseBody
	public HashMap<String, Object> main(
		@RequestParam(value = "co_num", required = false, defaultValue = "1") int co_num, PostCriteria cri) {
			// 장르 목록 가져오기
			List<BookGenreVO> dbList = bookService.getAllGenre();
			
			List<List<BookGenreVO>> list = new ArrayList<>();
			
			for (int i = 0; i < dbList.size(); i++) {
			    List<BookGenreVO> secondGenreList = bookService.getSecondGenre(dbList.get(i).getGe_num());
			    List<BookGenreVO> tmpList = new ArrayList<>();
			    for (int j = 0; j < secondGenreList.size(); j++) {
			        tmpList.add(secondGenreList.get(j));
			    }
			    list.add(tmpList);
			}
	
		    // 게시글 목록 가져오기
		    cri.setCo_num(co_num);
		    cri.setPerPageNum(5);
		    List<PostVO> postList = postService.getPostList(cri);
	
		    // 커뮤니티 목록 가져오기
		    List<CommunityVO> communities = postService.getCommunityList();
	
		    // 페이지 메이커 설정
		    PageMaker pm = postService.getPageMaker(cri);
	
		    // 응답 데이터 준비
		    HashMap<String, Object> map = new HashMap<>();
		    map.put("majorGenreList", dbList);
		    map.put("genreList", list);
		    map.put("postList", postList);	
		    map.put("communities", communities);
		    map.put("pm", pm);
	
		    return map;
	}
}