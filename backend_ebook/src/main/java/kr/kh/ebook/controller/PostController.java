package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;
import kr.kh.ebook.pagination.Criteria;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.pagination.PostCriteria;
import kr.kh.ebook.service.PostService;

@Controller
@RequestMapping("/post")
public class PostController {
	
	@Autowired
	PostService postService;
	
	@GetMapping("/list")
	public String postList(Model model, @PathVariable int co_num, PostCriteria cri) {
		List<PostVO> list = postService.getPostList(cri);
		model.addAttribute("list", list);
		
		List<CommunityVO> communities = postService.getCommunityList();
		model.addAttribute("communities", communities);
		
		cri.setCo_num(co_num);
		cri.setPerPageNum(10);
		PageMaker pm = postService.getPageMaker(cri);
		model.addAttribute("cri", cri);
		model.addAttribute("pm", pm);
		return "post/list";
	}
	
	@GetMapping("/list/{co_num}/{userId}/{pageNum}")
	public HashMap<String, Object> myPostList(@PathVariable int co_num, @PathVariable String userId, @PathVariable int pageNum) {
		System.out.println("co_num : " + co_num);
		System.out.println("userId : " + userId);
		System.out.println("page num : " + pageNum);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		int lookPage = 2;//한 페이지에 보이는 컨텐츠 개수
		
		PostCriteria cri = new PostCriteria((pageNum - 1)*lookPage, lookPage, co_num);
		
		List<PostVO> list = postService.getMyPostList(cri, userId);
		map.put("list", list);
		
		List<CommunityVO> communities = postService.getCommunityList();
		map.put("communities", communities);
		
		PageMaker pm = postService.getPageMaker(cri);
		map.put("cri", cri);
		map.put("pm", pm);
		return map;
	}
	
	@GetMapping("/insert/{co_num}")
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
	
	@GetMapping("/update/{po_num}")
	public String postUpdate(Model model, @PathVariable int po_num) {
		PostVO post = postService.getPost(po_num);
		model.addAttribute("post", post);
		return "post/update";
	}
	
	@PostMapping("/update/{po_num}")
	public String postUpdatePost(Model model, @PathVariable int po_num, PostVO post) {
		post.setPo_num(po_num);
		boolean res= postService.updatePost(post);
		if(res) {
			return "/post/detail/"+po_num;
		}
		return "/post/update"+po_num;
	}
	
	@GetMapping("/delete/{co_num}/{po_num}")
	public String postDeletePost(Model model, @PathVariable int co_num, @PathVariable int po_num) {
		boolean res= postService.deletePost(po_num);
		if(res) {
			return "redirect:/post/list/"+co_num;
		}
		return "redirect:/post/detail"+po_num;
	}
	
}
