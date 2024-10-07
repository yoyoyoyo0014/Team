package kr.kh.ebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

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
	
	@GetMapping("/post/insert/{co_num}")
	public String postInsert(@PathVariable int co_num) {
		return "post/insert";
	}
	@PostMapping("/post/insert")
	public String postInsertPost(PostVO post) {
		boolean res = postService.addPost(post);
		if(res) {
			return "/post/list/"+post.getPo_co_num();
		}
		return "/post/insert/"+post.getPo_co_num();
	}
	
	@GetMapping("/post/update/{po_num}")
	public String postUpdate(Model model, @PathVariable int po_num) {
		PostVO post = postService.getPost(po_num);
		model.addAttribute("post", post);
		return "post/update";
	}
	
	@PostMapping("/post/update/{po_num}")
	public String postUpdatePost(Model model, @PathVariable int po_num, PostVO post) {
		post.setPo_num(po_num);
		boolean res= postService.updatePost(post);
		if(res) {
			return "/post/detail/"+po_num;
		}
		return "/post/update"+po_num;
	}
	
	@GetMapping("/post/delete/{co_num}/{po_num}")
	public String postDeletePost(Model model, @PathVariable int co_num, @PathVariable int po_num) {
		boolean res= postService.deletePost(po_num);
		if(res) {
			return "redirect:/post/list/"+co_num;
		}
		return "redirect:/post/detail"+po_num;
	}
	
}