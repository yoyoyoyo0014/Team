package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.dto.LoginDTO;
import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.MemberService;

@RestController
@RequestMapping("/ebook")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/login")
    public Map<String, Object> loginPost(@RequestBody MemberVO memberVO) {
        MemberVO member = memberService.login(memberVO.getMe_id(), memberVO.getMe_pw());
        Map<String, Object> response = new HashMap<>();
        if (member != null) {
            // 로그인 성공 시 JWT 토큰 생성 및 반환
            String token = memberService.generateToken(memberVO.getMe_id());
            LoginDTO dto = new LoginDTO(token, member);
            response.put("success", true);
            response.put("loginDTO", dto);
            // 로그인 성공 로그
            System.out.println("로그인 성공: 사용자 ID = " + memberVO.getMe_id());
        } else {
        	 // 로그인 실패 로그
            System.out.println("로그인 실패: 사용자 ID = " + memberVO.getMe_id());
        	
            response.put("success", false);
            response.put("message", "로그인 실패");
        }
        return response;
    }
    
    @GetMapping("/login")
    public Map<String, Object> loginGet(@RequestBody MemberVO memberVO) {
        MemberVO member = memberService.login(memberVO.getMe_id(), memberVO.getMe_pw());
        Map<String, Object> response = new HashMap<>();
        if (member != null) {
            // 로그인 성공 시 JWT 토큰 생성 및 반환
            String token = memberService.generateToken(memberVO.getMe_id());
            LoginDTO dto = new LoginDTO(token, member);
            response.put("success", true);
            response.put("loginDTO", dto);
            // 로그인 성공 로그
            System.out.println("로그인 성공: 사용자 ID = " + memberVO.getMe_id());
        } else {
        	 // 로그인 실패 로그
            System.out.println("로그인 실패: 사용자 ID = " + memberVO.getMe_id());
        	
            response.put("success", false);
            response.put("message", "로그인 실패");
        }
        return response;
    }
}
