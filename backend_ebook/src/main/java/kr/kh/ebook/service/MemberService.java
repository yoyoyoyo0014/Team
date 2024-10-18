package kr.kh.ebook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.MemberDAO;
import kr.kh.ebook.model.vo.MemberVO;

@Service
public class MemberService {
	
	@Autowired
	private MemberDAO memberDao;
	
	/* 카카오 로그인 관련 */
	
	// 회원 ID로 사용자 조회 ( 일반 로그인, 카카오 로그인에 사용 )
	public MemberVO getMemberById(String me_id) {
		return memberDao.findMemberById(me_id);
	}
	
	// 카카오 회원 등록
    public void registerKakaoMember(MemberVO member) {
        memberDao.insertKakaoMember(member);  // 새로운 회원을 DB에 삽입
    }
	
	/* 네이버 로그인 관련 */
	
	// 네이버 사용자 ID로 회원 조회
	public MemberVO getMemberByNaverId(String naverId) {
		return memberDao.selectMemberByNaverId(naverId);
	}
	
	 // 신규 회원 등록
    public void registerMember(MemberVO member) {
        memberDao.insertMember(member); // 신규 회원을 DB에 삽입
    }

	
	/* 일반 로그인 관련 */
	
	  public MemberVO login(String me_id, String me_pw) {
	        // ID와 비밀번호로 회원 정보 검색
	        MemberVO member = memberDao.getMemberById(me_id);
	        
	        if (member != null && member.getMe_pw().equals(me_pw)) {
	            return member;  // 로그인 성공
	        }
	        return null;  // 로그인 실패
	    }

	
}
