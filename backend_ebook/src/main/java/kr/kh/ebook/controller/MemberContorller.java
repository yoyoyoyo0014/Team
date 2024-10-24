package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.MemberService;

@RestController
@RequestMapping("/ebook/member")
public class MemberContorller {

	@Autowired
	private MemberService memberService;
	
	// 회원 아이디로 사용자 정보 조회 ( 카카오 )
	@GetMapping("/{me_id}")
	public MemberVO getMember(@PathVariable String me_id) {
		return memberService.getMemberById(me_id);
	}
	// 일반 회원의 사용자 정보 등록
	 @PostMapping("/register")
	    public Map<String, String> registerNormalMember(@RequestBody MemberVO memberVO) {
	        boolean isRegistered = memberService.registerNormalMember(memberVO);
	
	        // JSON 형식으로 응답 반환
	        Map<String, String> response = new HashMap<>();
	        response.put("message", isRegistered ? "회원 등록 완료" : "회원 등록 실패");
	
	        return response;  // Map 객체를 반환하면 Spring이 이를 JSON으로 변환
	    }
	
	// 아이디 중복 체크
	    @GetMapping("/check-duplicate-id")
	    public ResponseEntity<Map<String, Boolean>> checkDuplicateId(@RequestParam("me_id") String meId) {
	        boolean isDuplicate = memberService.isIdDuplicate(meId);
	        Map<String, Boolean> response = new HashMap<>();
	        response.put("exists", isDuplicate);
	        return ResponseEntity.ok(response);
	    }

	    // 닉네임 중복 체크
	    @GetMapping("/check-duplicate-nickname")
	    public ResponseEntity<Map<String, Boolean>> checkDuplicateNickname(@RequestParam("me_nickname") String meNickname) {
	        boolean isDuplicate = memberService.isNicknameDuplicate(meNickname);
	        Map<String, Boolean> response = new HashMap<>();
	        response.put("exists", isDuplicate);
	        return ResponseEntity.ok(response);
	    }
	 
}
