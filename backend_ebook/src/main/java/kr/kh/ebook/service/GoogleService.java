package kr.kh.ebook.service;

import java.util.Collections;

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
	private static String clientId;
	
    @Autowired
    private MemberDAO memberDao;

    private static final String CLIENT_ID = clientId;  // 구글 클라이언트 ID

    public MemberVO findOrRegisterUser(String idTokenString) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // 구글 사용자 정보 추출
                GoogleUserVO googleUser = new GoogleUserVO();
                googleUser.setGoogleId(payload.getSubject());
                googleUser.setEmail(payload.getEmail());
                googleUser.setName((String) payload.get("name"));
                googleUser.setPicture((String) payload.get("picture"));

                // 데이터베이스에서 이메일로 회원 정보 찾기
                MemberVO member = memberDao.findMemberByEmail(googleUser.getEmail());
                if (member == null) {
                    // 회원 정보가 없으면 신규 등록
                    member = new MemberVO();
                    member.setMe_id(googleUser.getGoogleId());
                    member.setMe_email(googleUser.getEmail());
                    member.setMe_name(googleUser.getName());
                    member.setMe_nickname(googleUser.getName());
                    memberDao.saveMember(member);
                }
                return member;
            } else {
                throw new RuntimeException("Invalid ID token.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Token verification failed.", e);
        }
    }
}
