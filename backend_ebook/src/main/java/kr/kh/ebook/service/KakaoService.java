package kr.kh.ebook.service;

import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.kh.ebook.model.vo.KakaoUserVO;

@Service
public class KakaoService {

    private static final String KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";
    private static final String KAKAO_TOKEN_INFO_URL = "https://kapi.kakao.com/v1/user/access_token_info";

    private static final Logger logger = LoggerFactory.getLogger(KakaoService.class);
    
    // 토큰 유효성 검사 메서드 추가
    public boolean validateAccessToken(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                KAKAO_TOKEN_INFO_URL, HttpMethod.GET, entity, String.class);
            return response.getStatusCode().is2xxSuccessful();  // 응답 코드가 200번대면 유효한 토큰
        } catch (Exception e) {
            return false;  // 유효하지 않은 토큰일 경우 false 반환
        }
    }

    // 사용자 정보를 가져오는 메서드
    public KakaoUserVO getUserInfo(String accessToken) {
        // 먼저 토큰 유효성 확인
        if (!validateAccessToken(accessToken)) {
            throw new RuntimeException("Invalid or expired access token");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        
        try {
        	
        	ResponseEntity<String> response = restTemplate.exchange(
        			KAKAO_USER_INFO_URL,
        			HttpMethod.GET,
        			entity,
        			String.class
        			);
        	
        	logger.info("Kakao API response: {}", response);
        	
        	if (!response.getStatusCode().is2xxSuccessful()) {
                logger.error("Failed to fetch user info. Status code: {}", response.getStatusCode());
                throw new RuntimeException("Failed to fetch Kakao user info");
            }
        	
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> result = objectMapper.readValue(response.getBody(), Map.class);

            KakaoUserVO user = new KakaoUserVO();
            user.setId(result.get("id").toString()); // 카카오 사용자 ID (String으로 설정)

            
            
            // 임의의 닉네임 생성
            String randomNickname = generateRandomNickname();
            user.setNickname(randomNickname);  // 임의의 닉네임 설정
            
         // 이메일, 성별 등 추가 정보 설정
            Map<String, Object> kakaoAccount = (Map<String, Object>) result.get("kakao_account");
            
            String name = kakaoAccount != null ? (String) kakaoAccount.get("name") : null;
            logger.info("카카오에서 받은 이름: {}", name);  // 이름 확인을 위한 로그
            user.setName(name);  // KakaoUserVO에 이름 설정
            
            if (kakaoAccount != null) {
                if (kakaoAccount.get("email") != null) {
                    user.setEmail(kakaoAccount.get("email").toString());
                }
                if (kakaoAccount.get("gender") != null) {
                    user.setGender(kakaoAccount.get("gender").toString());
                }
                if (kakaoAccount.get("birthyear") != null && kakaoAccount.get("birthday") != null) {
                    user.setBirthyear(kakaoAccount.get("birthyear").toString());
                    user.setBirthday(kakaoAccount.get("birthday").toString());
                }
                if (kakaoAccount.get("phone_number") != null) {
                    user.setPhoneNumber(kakaoAccount.get("phone_number").toString());
                }
            }

            return user;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch Kakao user info", e);
        }
    }
    
 // 임의의 닉네임 생성 메서드
    private String generateRandomNickname() {
        Random random = new Random();
        int randomNumber = 10000 + random.nextInt(90000);  // 10000부터 99999 사이의 숫자 생성
        return "BG_" + randomNumber;
    }
    
}
