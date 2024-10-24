package kr.kh.ebook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.MemberDAO;
import kr.kh.ebook.model.vo.MemberVO;

@Service
public class MemberService {
	
	@Autowired
	private MemberDAO memberDao;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
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
	
    public MemberVO login(String me_id, String rawPassword) {
        MemberVO member = memberDao.getMemberById(me_id);
        
        if (member != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            // 비밀번호 비교 (DB에 저장된 암호화된 비밀번호와 사용자가 입력한 비밀번호 비교)
            if (passwordEncoder.matches(rawPassword, member.getMe_pw())) {
                return member; // 비밀번호가 맞으면 로그인 성공
            }
        }
        return null; // 로그인 실패
    }

	public boolean registerNormalMember(MemberVO memberVO) {
		
		// 비밀번호 암호화
		String encryptedPassword = passwordEncoder.encode(memberVO.getMe_pw());
		memberVO.setMe_pw(encryptedPassword);
		
		try {
			memberDao.insertNormalMember(memberVO);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/* 일반 회원가입 관련 */
	
	// 아이디 중복 체크
    public boolean isIdDuplicate(String meId) {
        return memberDao.getMemberById(meId) != null;
    }

    // 닉네임 중복 체크
    public boolean isNicknameDuplicate(String meNickname) {
        return memberDao.getMemberByNickname(meNickname) != null;
    }
	
}
