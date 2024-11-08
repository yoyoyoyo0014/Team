package kr.kh.ebook.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.MemberDAO;
import kr.kh.ebook.exception.SuspensionException;
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
	
    // MemberService의 login 메서드
    public MemberVO login(String me_id, String rawPassword) {
        MemberVO member = memberDao.getMemberById(me_id);
        if (member != null) {
            // 제재 상태 및 정지 종료 시간 확인
            if ("기간 정지".equals(member.getMe_ms_name())) {
                Date stopDate = member.getMe_stop();
                if (stopDate != null && stopDate.after(new Date())) {
                    long remainingTime = stopDate.getTime() - System.currentTimeMillis();
                    long daysRemaining = remainingTime / (1000 * 60 * 60 * 24);
                    String formattedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(stopDate);
                    throw new SuspensionException(
                        "관리자에 의해 정지되어 " + formattedDate + " 까지\n로그인을 할 수 없습니다.  (" + " 잔여기간 : " + daysRemaining  + "일 )"
                    );
                } else {
                    // 제재 종료 시간이 지났다면, 상태를 "사용"으로 변경
                    member.setMe_ms_name("사용");
                    member.setMe_stop(null);
                    memberDao.updateMember(member);
                }
            }

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            boolean matches = passwordEncoder.matches(rawPassword, member.getMe_pw());

            if (matches) {
                return member; // 로그인 성공
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

	public void earnPoint(String bu_me_id, int bu_total) {
		memberDao.earnPoint(bu_me_id, bu_total);
	}
    
    // 비밀번호 변경 메서드
    public boolean changePassword(String userId, String newPassword) {
        String encryptedPassword = passwordEncoder.encode(newPassword);
        try {
            memberDao.updatePassword(userId, encryptedPassword);
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
    
    public void applySuspension(String userId, int suspensionDays) {
        MemberVO member = memberDao.getMemberById(userId);
        
        if (member == null) {
            throw new IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다.");
        }

        if ("기간 정지".equals(member.getMe_ms_name())) {
            throw new IllegalStateException("이미 제재가 적용된 사용자입니다.");
        }

        member.setMe_ms_name("기간 정지");

        // 현재 시간 + suspensionDays 계산하여 me_stop에 설정
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, suspensionDays);
        member.setMe_stop(calendar.getTime());

        memberDao.updateMember(member);
    }


    public void cancelSuspension(String userId) {
        // 회원 정보를 데이터베이스에서 가져옴
        MemberVO member = memberDao.getMemberById(userId);

        // 사용자가 "기간 정지" 상태인지 확인
        if (!"기간 정지".equals(member.getMe_ms_name())) {
            throw new IllegalStateException("제재가 적용되지 않은 사용자입니다.");
        }

        // 제재 상태를 "사용"으로 변경
        member.setMe_ms_name("사용");

        // 제재 종료 시간을 초기화
        member.setMe_stop(null);

        // 변경 사항을 데이터베이스에 업데이트
        memberDao.updateMember(member);
    }


    // 로그인 차단 로직
    public boolean isSuspended(MemberVO member) {
        return "기간 정지".equals(member.getMe_ms_name()) && 
               member.getMe_stop() != null && 
               member.getMe_stop().after(new Date());
    }

    
}
