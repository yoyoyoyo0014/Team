package kr.kh.ebook.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.KakaoUserVO;
import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.KakaoService;
import kr.kh.ebook.service.MemberService;
import kr.kh.ebook.util.JwtUtil;

@RestController
@RequestMapping("/ebook/kakao")
public class KakaoLoginController {

    private static final Logger logger = LoggerFactory.getLogger(KakaoLoginController.class);

    @Autowired
    private KakaoService kakaoService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private JwtUtil jwtUtil;  // JWT 토큰 유틸리티 클래스

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestBody Map<String, String> request) {
        String kakaoAccessToken = request.get("token");
        Map<String, Object> response = new HashMap<>();
        
        try {
            // 카카오 API에서 사용자 정보 가져옴
            KakaoUserVO kakaoUser = kakaoService.getUserInfo(kakaoAccessToken);

            // 사용자 정보가 이미 존재하는지 확인
            MemberVO member = memberService.getMemberById(kakaoUser.getId());

            if (member != null) {
                // 로그인 성공 처리
                String token = jwtUtil.generateToken(member.getMe_id());
                response.put("jwtToken", token); // **jwtToken으로 키명 변경**
                response.put("user", member);
                response.put("success", true);
                response.put("message", "로그인 성공");
                return ResponseEntity.ok(response);
            } else {
                // 회원가입 처리
                member = registerNewKakaoMember(kakaoUser);
                String token = jwtUtil.generateToken(member.getMe_id());
                response.put("jwtToken", token); // **jwtToken으로 키명 변경**
                response.put("success", true);
                response.put("message", "회원가입 및 로그인 성공");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "로그인 처리 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    // 카카오 간편 회원가입 처리 메서드
    private MemberVO registerNewKakaoMember(KakaoUserVO kakaoUser) {
        MemberVO newMember = new MemberVO();

        // 생년과 생일 처리
        String birthyear = kakaoUser.getBirthyear();
        String birthday = kakaoUser.getBirthday();
        Date birthDate = null;

        if (birthyear != null && birthday != null && !birthday.isEmpty()) {
            String birthString = birthyear + "-" + birthday;
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MMdd");
            try {
                birthDate = dateFormat.parse(birthString);
            } catch (ParseException e) {
                logger.error("생년월일 파싱 중 오류 발생: {}", e.getMessage());
            }
        }

        // 새로운 회원 객체 생성 및 정보 설정
        newMember.setMe_id(kakaoUser.getId());
        newMember.setMe_nickname(generateRandomNickname());
        newMember.setMe_email(kakaoUser.getEmail());
        newMember.setMe_name(kakaoUser.getName());
        newMember.setMe_gender(kakaoUser.getGender());
        newMember.setMe_birth(birthDate);
        newMember.setMe_phone(kakaoUser.getPhoneNumber());
        newMember.setMe_address(kakaoUser.getAddress());
        newMember.setMe_authority("USER");

        // 회원 정보 저장
        memberService.registerKakaoMember(newMember);
        return newMember;
    }

    // 임의의 닉네임 생성 메서드
    private String generateRandomNickname() {
        Random random = new Random();
        int randomNumber = 10000 + random.nextInt(90000);  // 10000부터 99999 사이의 숫자 생성
        return "BG_" + randomNumber;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody MemberVO member) {
        Map<String, Object> response = new HashMap<>();
        try {
            // 이미 존재하는 회원인지 확인
            MemberVO existingMember = memberService.getMemberById(member.getMe_id());
            if (existingMember == null) {
                // 새로운 회원을 등록
                memberService.registerMember(member);
                response.put("success", true);
                response.put("message", "회원가입이 완료되었습니다.");
                logger.info("신규 회원 가입 완료: {}", member.getMe_id());
                return ResponseEntity.ok(response);  // 200 OK 응답
            } else {
                response.put("success", false);
                response.put("message", "이미 존재하는 회원입니다.");
                logger.warn("회원가입 실패 - 이미 존재하는 회원: {}", member.getMe_id());
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);  // 409 중복 회원 응답
            }
        } catch (Exception e) {
            logger.error("회원가입 처리 중 오류 발생", e);
            response.put("success", false);
            response.put("message", "회원가입 처리 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);  // 500 오류 응답
        }
    }
}
