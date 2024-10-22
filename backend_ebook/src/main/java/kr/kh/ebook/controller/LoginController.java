package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.MemberService;

@RestController
@RequestMapping("/ebook")
public class LoginController {

    @Autowired
    MemberService memberService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody MemberVO member) {
        Map<String, Object> response = new HashMap<>();
        MemberVO loginUser = memberService.login(member.getMe_id(), member.getMe_pw());

        if (loginUser != null) {
            // 로그인 성공 시 사용자 정보와 성공 메시지 반환
            response.put("success", true);
            response.put("me_id", loginUser.getMe_id());
            response.put("token", "generated_jwt_token"); // 실제 토큰 생성 로직 필요
        } else {
            // 로그인 실패 시 메시지 반환
            response.put("success", false);
            response.put("message", "로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
        }

        return response;
    }
}

