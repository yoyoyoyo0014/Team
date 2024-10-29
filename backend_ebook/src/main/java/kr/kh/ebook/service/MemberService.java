package kr.kh.ebook.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.kh.ebook.controller.MemberContorller;
import kr.kh.ebook.dao.MemberDAO;
import kr.kh.ebook.model.vo.MemberVO;

@Service
public class MemberService {
	
	@Autowired
	private MemberDAO memberDao;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	private static final Logger logger = LoggerFactory.getLogger(MemberService.class);
	
	/* 카카오 로그인 관련 */
	
	// 회원 ID로 사용자 조회 (일반 로그인, 소셜 로그인 통합)
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
	
    // MemberService의 login 메서드에 추가
    public MemberVO login(String me_id, String rawPassword) {
        logger.debug("Checking credentials for user ID: {}", me_id);

        MemberVO member = memberDao.getMemberById(me_id);
        if (member != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            boolean matches = passwordEncoder.matches(rawPassword, member.getMe_pw());
            logger.debug("Password matches: {}", matches); // 비밀번호 비교 결과 로그

            if (matches) {
                logger.info("Login successful for user ID: {}", me_id);
                return member;
            }
            logger.warn("Password mismatch for user ID: {}", me_id);
        } else {
            logger.warn("User not found with ID: {}", me_id);
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
    
    // 닉네임 업데이트
    public boolean updateNickname(String memberId, String newNickname) {
        try {
            memberDao.updateNickname(memberId, newNickname);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /* 공통 */
    
    // 사용자 정보 가져오기
    public MemberVO getMemberProfile(String memberId) {
        return memberDao.findById(memberId);
    }
    
}
