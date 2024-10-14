package kr.kh.ebook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.MemberDAO;
import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.util.JwtUtil;

@Service
public class MemberService {
	
	@Autowired
	private MemberDAO memberDao;
	
    @Autowired
    private JwtUtil jwtUtil;  // JWT 유틸리티 클래스 주입
	
	// 회원 ID로 사용자 조회 ( 일반 로그인, 카카오 로그인에 사용 )
	public MemberVO getMemberById(String me_id) {
		return memberDao.findMemberById(me_id);
	}
	
	// 네이버 사용자 ID로 회원 조회
	public MemberVO getMemberByNaverId(String naverId) {
		return memberDao.selectMemberByNaverId(naverId);
	}
	
	// 일반 로그인 (ID와 비밀번호 검증)
    public MemberVO login(String me_id, String me_pw) {
    	
        MemberVO member = memberDao.findMemberById(me_id);  // 사용자 조회
        System.out.println("사용자 조회 결과: " + member);
        
        if (validateUser(member, me_pw)) {  // 검증 로직 호출
            return member;
        }
        return null; // 로그인 실패 시 null 반환
    }

    // 사용자 검증 (ID와 비밀번호 확인)
    public boolean validateUser(MemberVO member, String inputPassword) {
        // 비밀번호 검증 로그
        System.out.println("비밀번호 검증 대상 사용자: " + member);
        System.out.println("입력된 비밀번호: " + inputPassword);
        System.out.println("DB 저장된 비밀번호: " + (member != null ? member.getMe_pw() : "null"));

        if (member != null && member.getMe_pw().equals(inputPassword)) {
            System.out.println("비밀번호 일치");
            return true;
        }
        System.out.println("비밀번호 불일치");
        return false;
    }

    // JWT 토큰 생성
    public String generateToken(String me_id) {
        return jwtUtil.generateToken(me_id);  // JWT 토큰 생성
    }
	
}
