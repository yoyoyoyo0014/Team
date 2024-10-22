package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.pagination.PostCriteria;
import kr.kh.ebook.service.PostService;
import lombok.AllArgsConstructor;

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

    @GetMapping("/post/detail/{co_num}/{po_num}")
    public HashMap<String, Object> postDetail(@PathVariable int po_num, @PathVariable int co_num) {
        HashMap<String, Object> map = new HashMap<>();
        PostVO post = postService.getPost(po_num);
        map.put("post", post);
        return map;
    }

    @DeleteMapping("/post/delete/{co_num}/{po_num}")
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
}
