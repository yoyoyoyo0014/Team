package kr.kh.ebook.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.dto.MemberBookDTO;
import kr.kh.ebook.service.MypageService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/mypage")
@AllArgsConstructor
public class MypageController {

    private final MypageService mypageService;

    @GetMapping("/mybooks/{bl_me_id}")
    public List<MemberBookDTO> getMyBooks(@PathVariable("bl_me_id") String me_id) {
        return mypageService.getMyBooks(me_id);
    }
}