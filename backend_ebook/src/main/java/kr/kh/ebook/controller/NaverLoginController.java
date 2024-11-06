package kr.kh.ebook.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.model.vo.NaverUserVO;
import kr.kh.ebook.service.MemberService;
import kr.kh.ebook.service.NaverService;
import kr.kh.ebook.util.JwtUtil;

@RestController
@RequestMapping("/ebook/naver")
public class NaverLoginController {

    private static final Logger logger = LoggerFactory.getLogger(NaverLoginController.class);

    @Autowired
    private NaverService naverService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private JwtUtil jwtUtil;

    // 생년월일 문자열을 Date로 변환하는 메서드
    private Date convertToDate(String dateString, String pattern) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern); // 변환할 문자열 형식 설정
        try {
            return dateFormat.parse(dateString); // 문자열을 Date로 변환
        } catch (ParseException e) {
            logger.error("날짜 변환 중 오류 발생", e);
            throw new RuntimeException("날짜 변환 중 오류가 발생했습니다.", e);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> naverLogin(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        String state = request.get("state");
        Map<String, Object> response = new HashMap<>();

        try {
            // 네이버 API를 통해 Access Token 가져오기
            String accessToken = naverService.getAccessToken(code, state);
            logger.info("Access Token: {}", accessToken);

            // Access Token으로 사용자 정보 가져오기
            NaverUserVO naverUser = naverService.getUserInfo(accessToken);
            logger.info("Naver User: {}", naverUser);

            // 네이버 사용자 정보를 이용해 DB에서 회원 조회
            MemberVO member = memberService.getMemberByNaverId(naverUser.getId());

            if (member == null) {
                // 회원이 없을 경우, 새 회원 등록 처리
                member = registerNewMember(naverUser);
            }

            // 로그인 성공 시 JWT 토큰 생성
            String jwtToken = jwtUtil.generateToken(member.getMe_id());
            logger.info("JWT Token 생성 완료: {}", jwtToken);

            // 성공 시 JWT 토큰과 사용자 정보 반환
            response.put("success", true);
            response.put("token", jwtToken);
            response.put("user", member); // 사용자 정보를 함께 반환
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("로그인 처리 중 오류 발생", e);
            response.put("success", false);
            response.put("message", "로그인 처리 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 새로운 회원 등록 메서드
    private MemberVO registerNewMember(NaverUserVO naverUser) {
        MemberVO newMember = new MemberVO();
        newMember.setMe_naverId(naverUser.getId());  // naverId 설정
        newMember.setMe_id(naverUser.getId());       // me_id에도 동일한 값 설정
        newMember.setMe_email(naverUser.getEmail());
        newMember.setMe_nickname(naverUser.getNickname());

        // 전화번호에서 하이픈(-) 제거 후 저장
        String cleanedPhone = naverUser.getPhone().replace("-", "");
        newMember.setMe_phone(cleanedPhone); // 전화번호 저장

        // 생년월일을 문자열에서 Date로 변환하여 저장
        Date birthDate = convertToDate(naverUser.getBirthyear() + "-" + naverUser.getBirthday(), "yyyy-MM-dd");
        newMember.setMe_birth(birthDate); // Date로 변환한 생년월일 저장

        newMember.setMe_gender(naverUser.getGender()); // 성별 정보 저장
        newMember.setMe_name(naverUser.getName());

        // 기타 필요한 기본값 설정
        newMember.setMe_authority("USER");

        // 회원가입 진행
        memberService.registerMember(newMember);
        logger.info("새로운 네이버 회원 가입 완료: {}", newMember);

        return newMember;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerNaverUser(@RequestBody NaverUserVO naverUser) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 회원가입 처리 및 JWT 토큰 생성
            String jwtToken = naverService.registerNaverUser(naverUser);

            // 성공 응답
            response.put("success", true);
            response.put("token", jwtToken); // 생성된 JWT 토큰 반환
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            // 이미 가입된 회원일 경우
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);  // 중복된 회원 응답
        } catch (Exception e) {
            // 기타 오류 처리
            logger.error("회원가입 처리 중 오류 발생", e);
            response.put("success", false);
            response.put("message", "회원가입 처리 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);  // 오류 응답
        }
    }
}
