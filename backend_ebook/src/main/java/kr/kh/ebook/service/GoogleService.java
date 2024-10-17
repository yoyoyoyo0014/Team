package kr.kh.ebook.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import kr.kh.ebook.dao.MemberDAO;
import kr.kh.ebook.model.vo.GoogleUserVO;
import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.util.JwtUtil;

@Service
@SuppressWarnings("deprecation")
public class GoogleService {

    @Value("${google.client.id}")
    private String clientId;
    
    @Autowired
    private MemberDAO memberDao;

    @Autowired
    private JwtUtil jwtUtil;  // JwtUtil 주입
    
    private static final Logger logger = LoggerFactory.getLogger(GoogleService.class);
    
    // 반환형을 Map<String, Object>로 수정
    public Map<String, Object> findOrRegisterUser(String idTokenString) {
        
        Map<String, Object> response = new HashMap<>();  // 응답 데이터 담을 Map 객체
        
        // GoogleIdTokenVerifier 설정
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(clientId))
                .build();
        
        logger.info("Client ID: " + clientId);

        try {
            // ID 토큰 검증
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Google 사용자 정보 추출
                GoogleUserVO googleUser = new GoogleUserVO();
                googleUser.setGoogleId(payload.getSubject());  // 구글 ID 설정
                googleUser.setEmail(payload.getEmail());  // 이메일 설정
                googleUser.setName((String) payload.get("name"));  // 이름 설정

                // DB에서 사용자 정보 조회
                MemberVO member = memberDao.findMemberByEmail(googleUser.getEmail());
                if (member == null) {
                    // DB에 사용자 정보가 없으면 새로 생성
                    member = new MemberVO();
                    member.setMe_id(googleUser.getGoogleId());  // 구글 ID
                    member.setMe_email(googleUser.getEmail());  // 이메일
                    member.setMe_name(googleUser.getName());  // 이름
                    member.setMe_authority("USER");  // 권한 설정
                    
                    // 임의의 닉네임 설정 (bg_ + 5자리 숫자)
                    String randomNickname = generateRandomNickname();
                    member.setMe_nickname(randomNickname);

                    // 새로운 회원을 DB에 저장
                    memberDao.insertGoogleMember(member);
                }

                // JWT 토큰 생성
                String token = jwtUtil.generateToken(member.getMe_id());

                // 응답 데이터 구성
                response.put("success", true);
                response.put("token", token);  // JWT 토큰 반환
                response.put("member", member);  // 회원 정보 반환
            } else {
                // 유효하지 않은 ID 토큰인 경우 처리
                throw new RuntimeException("유효하지 않은 ID 토큰입니다.");
            }
        } catch (Exception e) {
            // 예외 처리: 서버 오류 발생 시
            response.put("success", false);
            response.put("message", "서버 오류 발생: " + e.getMessage());
        }

        return response;  // Map 객체로 응답 반환
    }

    // 임의의 5자리 숫자로 구성된 닉네임 생성
    private String generateRandomNickname() {
        Random random = new Random();
        int randomNumber = random.nextInt(90000) + 10000; // 10000 ~ 99999 범위의 숫자 생성
        return "bg_" + randomNumber;
    }
}
