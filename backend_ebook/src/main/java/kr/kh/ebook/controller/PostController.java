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
        if(co_num == 3 || co_num == 4) {
        	cri.setPerPageNum(12);
        }
        else {
            cri.setPerPageNum(10);
        }
        
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
    public ResponseEntity<?> updatePost(@PathVariable("po_num") int po_num,
                                        @RequestParam("po_title") String po_title,
                                        @RequestParam("po_content") String po_content,
                                        @RequestParam(value = "po_me_nickname", required = false) String po_me_nickname,
                                        @RequestParam(value = "po_start", required = false) String po_start,
                                        @RequestParam(value = "po_end", required = false) String po_end,
                                        @RequestParam(value = "po_link", required = false) MultipartFile po_link,
                                        @RequestParam(value = "po_image", required = false) MultipartFile po_image) {
        try {
            // 파일 저장 경로 설정
            String savePath = "D:/git/Team/static/event_image/";
            String poLinkPath = null;
            String poImagePath = null;

            // 게시물 조회 (기존 정보 가져오기)
            PostVO existingPost = postService.getPost(po_num);
            if (existingPost == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 게시글을 찾을 수 없습니다.");
            }

            // po_link가 null이면 기존 파일 경로 유지, 아니면 새로운 파일로 교체
            if (po_link != null && !po_link.isEmpty()) {
                if (existingPost.getPo_link() != null) {
                    File existingFile = new File("D:/git/Team/static" + existingPost.getPo_link());
                    if (existingFile.exists()) existingFile.delete();
                }
                String fileName = System.currentTimeMillis() + "_" + po_link.getOriginalFilename();
                File saveFile = new File(savePath + fileName);
                po_link.transferTo(saveFile);
                poLinkPath = "/event_image/" + fileName;
            } else {
                poLinkPath = existingPost.getPo_link(); // po_link가 null이면 기존 경로 유지
            }

            // po_image가 null이면 기존 파일 경로 유지, 아니면 새로운 파일로 교체
            if (po_image != null && !po_image.isEmpty()) {
                if (existingPost.getPo_image() != null) {
                    File existingFile = new File("D:/git/Team/static" + existingPost.getPo_image());
                    if (existingFile.exists()) existingFile.delete();
                }
                String fileName = System.currentTimeMillis() + "_" + po_image.getOriginalFilename();
                File saveFile = new File(savePath + fileName);
                po_image.transferTo(saveFile);
                poImagePath = "/event_image/" + fileName;
            } else {
                poImagePath = existingPost.getPo_image(); // po_image가 null이면 기존 경로 유지
            }

            po_start = (po_start == null || po_start.length() == 0) ? null : po_start;
            po_end = (po_end == null || po_end.length() == 0) ? null : po_end;

            // 데이터베이스 업데이트
            PostVO post = new PostVO();
            post.setPo_num(po_num);
            post.setPo_title(po_title);
            post.setPo_content(po_content);
            post.setPo_me_nickname(po_me_nickname);
            post.setPo_start(po_start);
            post.setPo_end(po_end);
            post.setPo_link(poLinkPath);
            post.setPo_image(poImagePath);

            postService.updatePost(post);

            return ResponseEntity.ok("게시글이 수정되었습니다.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 저장 오류");
        }
    }






    @GetMapping("/post/detail/{co_num}/{po_num}")
    public HashMap<String, Object> postDetail(@PathVariable int po_num, @PathVariable int co_num) {
        HashMap<String, Object> map = new HashMap<>();
        postService.updatePostView(po_num);
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
