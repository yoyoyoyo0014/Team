package kr.kh.ebook.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.BookGenreVO;
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
	public HashMap<String, Object> main(Model model, int co_num, PostCriteria cri) {
		List<BookGenreVO> dbList = bookService.getAllGenre();
		
		List<List<BookGenreVO>> list = new ArrayList<>();
		
		for (int i = 0; i < dbList.size(); i++) {
			List<BookGenreVO> secondGenreList = bookService.getSecondGenre(dbList.get(i).getGe_num());
			List<BookGenreVO> tmpList = new ArrayList<BookGenreVO>();
			for(int j = 0; j < secondGenreList.size(); j++) {
				tmpList.add(secondGenreList.get(j));
			}
			list.add(tmpList);
		}
		
		List<PostVO> postList = postService.getPostList(cri);
		model.addAttribute("postList", postList);
		
		List<CommunityVO> communities = postService.getCommunityList();
		model.addAttribute("communities", communities);
		
		cri.setCo_num(co_num);
		cri.setPerPageNum(5);
		PageMaker pm = postService.getPageMaker(cri);
		model.addAttribute("pm", pm);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("majorGenreList", dbList);
		map.put("genreList", list);
		map.put("pm", pm);
		return map;
	}
}