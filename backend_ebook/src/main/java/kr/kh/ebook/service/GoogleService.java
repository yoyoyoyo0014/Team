package kr.kh.ebook.service;

import java.util.Collections;

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

@Service
public class GoogleService {

    @Value("${google.client.id}")
    private String clientId; // clientId는 static이 필요 없습니다.
    
    @Autowired
    private MemberDAO memberDao;

    private static final Logger logger = LoggerFactory.getLogger(NaverService.class);
    
    public MemberVO findOrRegisterUser(String idTokenString) {
        // GoogleIdTokenVerifier 설정
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(clientId))
                .build();

        try {
            // ID 토큰 검증
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Google 사용자 정보 추출
                GoogleUserVO googleUser = new GoogleUserVO();
                googleUser.setGoogleId(payload.getSubject());
                googleUser.setEmail(payload.getEmail());
                googleUser.setName((String) payload.get("name"));
                googleUser.setPicture((String) payload.get("picture"));

                // DB에서 사용자 찾기
                MemberVO member = memberDao.findMemberByEmail(googleUser.getEmail());
                if (member == null) {
                    // 회원 정보가 없으면 등록
                    member = new MemberVO();
                    member.setMe_id(googleUser.getGoogleId());
                    member.setMe_email(googleUser.getEmail());
                    member.setMe_name(googleUser.getName());
                    member.setMe_nickname(googleUser.getName());
                }
                return member;
            } else {
                // 유효하지 않은 토큰 처리
                throw new RuntimeException("유효하지 않은 ID 토큰입니다.");
            }
        } catch (Exception e) {
            logger.error("ID 토큰 검증 중 오류가 발생했습니다.", e);  // 예외 로그 출력
            throw new RuntimeException("ID 토큰 검증 중 오류가 발생했습니다.", e);
        }

    }
}
