package kr.kh.ebook.controller;

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
	    public MemberVO login(@RequestBody MemberVO member) {
	        // 로그인 요청이 들어오면, ID와 PW를 이용해 서비스에서 검증
	        MemberVO loginUser = memberService.login(member.getMe_id(), member.getMe_pw());

	        if (loginUser != null) {
	            return loginUser;  // 로그인 성공 시 해당 사용자 정보 반환
	        } else {
	            throw new RuntimeException("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
	        }
	    }
	
}
