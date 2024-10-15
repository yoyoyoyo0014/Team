package kr.kh.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
}
