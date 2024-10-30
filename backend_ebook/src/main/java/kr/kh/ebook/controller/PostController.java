package kr.kh.ebook.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
        
        // 검색어 추가 설정
        if (cri.getSearch() != null && !cri.getSearch().isEmpty()) {
            cri.setSearch(cri.getSearch());
        }

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
    
    @Transactional
    @PostMapping("/post/insert/{co_num}")
    public ResponseEntity<?> insertPost(@PathVariable("co_num") int coNum,
                                        @RequestParam("po_title") String title,
                                        @RequestParam("po_me_id") String writer,
                                        @RequestParam("po_me_nickname") String nickname,
                                        @RequestParam("po_content") String content,
                                        @RequestParam(value = "po_start", required = false) String start,
                                        @RequestParam(value = "po_end", required = false) String end,
                                        @RequestParam(value = "po_link", required = false) MultipartFile poLink,
                                        @RequestParam(value = "po_image", required = false) MultipartFile poImage) {
        try {
            // 타임스탬프를 미리 생성하여 파일 이름에 동일하게 사용
            String timestamp = String.valueOf(System.currentTimeMillis());
            String poLinkPath = null;
            String poImagePath = null;

            if (poLink != null && !poLink.isEmpty()) {
                poLinkPath = saveFile(poLink, timestamp);
            }

            if (poImage != null && !poImage.isEmpty()) {
                poImagePath = saveFile(poImage, timestamp);
            }

            // 서비스 호출하여 게시글 저장
            PostVO post = new PostVO(title, writer, nickname, content, coNum, start, end, poLinkPath, poImagePath);
            postService.addPost(post);
            return ResponseEntity.ok().body(Map.of("result", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("result", false, "message", e.getMessage()));
        }
    }

    private String saveFile(MultipartFile file, String timestamp) throws IOException {
        // 파일을 저장할 위치 설정
        String uploadDir = "D:/git/Team/static/event_image/";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs(); // 폴더가 없으면 생성
        }

        // 파일 이름 설정
        String originalFilename = file.getOriginalFilename();
        String fileName = timestamp + "_" + originalFilename;
        String filePath = uploadDir + fileName;

        // 파일 저장
        File dest = new File(filePath);
        file.transferTo(dest); // 파일을 지정된 경로로 이동

        // 웹에서 접근 가능한 URL 경로 반환
        return "/event_image/" + fileName;
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
        
        // 게시글 정보 가져오기
        PostVO post = postService.getPost(po_num);
        if (post == null) {
            map.put("result", false);
            map.put("redirect", "/post/detail/" + po_num);
            return map;
        }

        // 파일 삭제 처리
        String[] filePaths = {post.getPo_link(), post.getPo_image()};
        for (String filePath : filePaths) {
            if (filePath != null && !filePath.isEmpty()) {
                File file = new File("D:/git/Team/static" + filePath);
                if (file.exists()) {
                    if (!file.delete()) {
                        System.err.println("파일 삭제에 실패했습니다: " + filePath);
                    }
                }
            }
        }
        // 게시글 삭제
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
