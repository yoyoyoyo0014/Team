package kr.kh.ebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.pagination.PostCriteria;
import kr.kh.ebook.service.PostService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class PostController {
	
	@Autowired
	PostService postService;
	
	@GetMapping("/post/list")
	public String postList(Model model, @PathVariable int co_num, PostCriteria cri) {
		List<PostVO> list = postService.getPostList(cri);
		model.addAttribute("list", list);
		
		List<CommunityVO> communities = postService.getCommunityList();
		model.addAttribute("communities", communities);
		
		cri.setCo_num(co_num);
		cri.setPerPageNum(10);
		PageMaker pm = postService.getPageMaker(cri);
		model.addAttribute("cri", cri);
		return "post/list";
	}
	
}