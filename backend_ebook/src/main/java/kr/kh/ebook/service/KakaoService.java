package kr.kh.ebook.service;

import java.util.Map;

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

    public KakaoUserVO getUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
            KAKAO_USER_INFO_URL,
            HttpMethod.GET,
            entity,
            String.class
        );

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> result = objectMapper.readValue(response.getBody(), Map.class);

            KakaoUserVO user = new KakaoUserVO();
            user.setId(Long.valueOf(result.get("id").toString()));  // 카카오 사용자 ID
            Map<String, Object> kakaoAccount = (Map<String, Object>) result.get("kakao_account");
            Map<String, String> profile = (Map<String, String>) kakaoAccount.get("profile");
            user.setNickname(profile.get("nickname"));  // 닉네임

            return user;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch Kakao user info", e);
        }
    }
}

