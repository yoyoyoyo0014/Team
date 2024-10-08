package kr.kh.ebook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.MemberDAO;
import kr.kh.ebook.model.vo.MemberVO;

@Service
public class MemberService {
	
	@Autowired
	private MemberDAO memberDao;
	
	// 회원 ID 로 사용자 조회
	public MemberVO getMemberById(String me_id) {
		return memberDao.findMemberById(me_id);
	}
	
}
