package kr.kh.ebook.controller;

<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/controller/PostController.java
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
=======
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/controller/PostController.java

import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.pagination.PostCriteria;
import kr.kh.ebook.service.PostService;
import lombok.AllArgsConstructor;

<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/controller/PostController.java
@RestController
@AllArgsConstructor
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("/post/list/{co_num}")
    public HashMap<String, Object> postList(@PathVariable int co_num, PostCriteria cri) {
        HashMap<String, Object> map = new HashMap<>();

        // 설정된 co_num과 페이지 설정
        cri.setCo_num(co_num);
        cri.setPerPageNum(10);

        // 게시글 목록 가져오기
        List<PostVO> list = postService.getPostList(cri);
        map.put("list", list);

        // 커뮤니티 목록 가져오기
        List<CommunityVO> communities = postService.getCommunityList();
        map.put("communities", communities);

        // 페이지 메이커 설정
        PageMaker pm = postService.getPageMaker(cri);
        map.put("pm", pm);

        return map;
    }

    @GetMapping("/post/insert/{co_num}")
    public HashMap<String, Object> postInsert(@PathVariable int co_num) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("co_num", co_num);
        return map;
    }

    @PostMapping("/post/insert/{co_num}")
    public HashMap<String, Object> postInsertPost(@RequestBody PostVO post) {
        HashMap<String, Object> map = new HashMap<>();
        boolean res = postService.addPost(post);
        map.put("result", res);
        if (res) {
            map.put("redirect", "/post/list/" + post.getPo_co_num());
        } else {
            map.put("redirect", "/post/insert/" + post.getPo_co_num());
        }
        return map;
    }

    @GetMapping("/post/update/{po_num}")
    public HashMap<String, Object> postUpdate(@PathVariable int po_num) {
        HashMap<String, Object> map = new HashMap<>();
        PostVO post = postService.getPost(po_num);
        map.put("post", post);
        return map;
    }

    @PostMapping("/post/update/{po_num}")
    public HashMap<String, Object> postUpdatePost(@PathVariable int po_num, @RequestBody PostVO post) {
        HashMap<String, Object> map = new HashMap<>();
        post.setPo_num(po_num);
        boolean res = postService.updatePost(post);
        map.put("result", res);
        if (res) {
            map.put("redirect", "/post/detail/" + po_num);
        } else {
            map.put("redirect", "/post/update/" + po_num);
        }
        return map;
    }

    @GetMapping("/post/detail/{po_num}")
    public HashMap<String, Object> postDetail(@PathVariable int po_num) {
        HashMap<String, Object> map = new HashMap<>();
        PostVO post = postService.getPost(po_num);
        map.put("post", post);
        return map;
    }

    @GetMapping("/post/delete/{co_num}/{po_num}")
    public HashMap<String, Object> postDeletePost(@PathVariable int co_num, @PathVariable int po_num) {
        HashMap<String, Object> map = new HashMap<>();
        boolean res = postService.deletePost(po_num);
        map.put("result", res);
        if (res) {
            map.put("redirect", "/post/list/" + co_num);
        } else {
            map.put("redirect", "/post/detail/" + po_num);
        }
        return map;
    }
=======
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
	
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/controller/PostController.java
}
