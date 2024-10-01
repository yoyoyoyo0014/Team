package kr.kh.ebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;
import kr.kh.ebook.service.PostService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class PostController {
	
	@Autowired
	PostService postService;
	
	@GetMapping("/post/list")
	public String getMethodName(Model model, @PathVariable int co_num) {
		List<PostVO> list = postService.getPostList(co_num);
		model.addAttribute("list", list);
		
		List<CommunityVO> communities = postService.getCommunityList();
		model.addAttribute("communities", communities);
		return "post/list";
	}
	
}