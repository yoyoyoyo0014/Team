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
    public Map<String, Object> kakaoLogin(@RequestBody Map<String, String> request) {
        String kakaoAccessToken = request.get("token");
        Map<String, Object> response = new HashMap<>();

        try {
            // 카카오 API로부터 사용자 정보를 가져옴
            logger.info("카카오 액세스 토큰: {}", kakaoAccessToken);
            KakaoUserVO kakaoUser = kakaoService.getUserInfo(kakaoAccessToken);
            
            logger.info("카카오 사용자 이름: {}", kakaoUser.getName());  // KakaoUserVO에서 이름 확인

            // 카카오 사용자 정보 출력
            logger.info("카카오 사용자 ID: {}", kakaoUser.getId());

            // 카카오 ID로 회원 정보 조회
            MemberVO member = memberService.getMemberById(kakaoUser.getId());

            if (member != null) {
                // 사용자 존재: 로그인 성공 처리
                String token = jwtUtil.generateToken(member.getMe_id());  // JWT 토큰 생성
                response.put("token", token);
                response.put("success", true);
                response.put("message", "로그인 성공");
                logger.info("기존 회원 로그인 성공: {}", member.getMe_id());
            } else {
                // 사용자 없음: 카카오 간편 회원가입 처리
                logger.info("카카오 사용자 {}의 회원정보를 찾을 수 없습니다. 회원가입을 진행합니다.", kakaoUser.getId());
                MemberVO newMember = new MemberVO();

                // 생년과 생일 처리: null 값 체크
                String birthyear = kakaoUser.getBirthyear();
                String birthday = kakaoUser.getBirthday();
                Date birthDate = null;

                if (birthyear != null && birthday != null && !birthday.isEmpty()) {
                    String birthString = birthyear + "-" + birthday;
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MMdd");
                    try {
                        birthDate = dateFormat.parse(birthString);
                        newMember.setMe_birth(birthDate);
                    } catch (ParseException e) {
                        logger.error("생년월일 파싱 중 오류 발생: {}", e.getMessage());
                    }
                } else {
                    logger.warn("생년 또는 생일 정보가 없거나 부정확합니다.");
                }

                // 새로운 회원 객체 생성
                newMember.setMe_id(kakaoUser.getId());                // 카카오 ID
                newMember.setMe_nickname(generateRandomNickname());   // 임의의 닉네임 생성
                newMember.setMe_email(kakaoUser.getEmail());          // 이메일
                newMember.setMe_name(kakaoUser.getName());            // 이름
                newMember.setMe_gender(kakaoUser.getGender());        // 성별
                newMember.setMe_birth(birthDate);                     // 출생일 (Date 형식)
                newMember.setMe_phone(kakaoUser.getPhoneNumber());    // 전화번호
                newMember.setMe_address(kakaoUser.getAddress());      // 배송지 주소

                // 회원 정보 저장
                memberService.registerKakaoMember(newMember);  // 새로운 카카오 회원 등록
                response.put("success", true);
                response.put("message", "카카오 간편 회원가입이 완료되었습니다.");
                logger.info("신규 회원 가입 완료: {}", newMember.getMe_id());

                // 회원가입 후 JWT 토큰 생성
                String token = jwtUtil.generateToken(newMember.getMe_id());
                response.put("token", token);
            }
        } catch (Exception e) {
            logger.error("로그인 처리 중 오류 발생", e);
            response.put("success", false);
            response.put("status", "fail");
            response.put("message", "로그인 처리 중 오류가 발생했습니다.");
        }

        return response;
    }

    // 임의의 닉네임 생성 메서드
    private String generateRandomNickname() {
        Random random = new Random();
        int randomNumber = 10000 + random.nextInt(90000);  // 10000부터 99999 사이의 숫자 생성
        return "BG_" + randomNumber;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody MemberVO member) {
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
            } else {
                response.put("success", false);
                response.put("message", "이미 존재하는 회원입니다.");
                logger.warn("회원가입 실패 - 이미 존재하는 회원: {}", member.getMe_id());
            }
        } catch (Exception e) {
            logger.error("회원가입 처리 중 오류 발생", e);
            response.put("success", false);
            response.put("message", "회원가입 처리 중 오류가 발생했습니다.");
        }
        return response;
    }
}
