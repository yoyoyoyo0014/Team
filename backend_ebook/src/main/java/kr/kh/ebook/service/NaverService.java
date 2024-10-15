package kr.kh.ebook.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import kr.kh.ebook.model.vo.NaverUserVO;

@Service
public class NaverService {

    @Value("${naver.client-id}")
    private String clientId;

    @Value("${naver.client-secret}")
    private String clientSecret;

    @Value("${naver.redirect-uri}")
    private String redirectUri;

    private static final Logger logger = LoggerFactory.getLogger(NaverService.class);
    
 // 네이버 API로부터 Access Token을 받아오는 메서드
    public String getAccessToken(String code, String state) {
        String tokenUrl = "https://nid.naver.com/oauth2.0/token";
        RestTemplate restTemplate = new RestTemplate();
        
        // 파라미터를 MultiValueMap으로 설정
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("code", code);
        params.add("state", state);
        params.add("redirect_uri", redirectUri);

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // HttpEntity 객체로 헤더와 파라미터 설정
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        // POST 요청을 보냄
        ResponseEntity<Map> responseEntity = restTemplate.exchange(tokenUrl, HttpMethod.POST, requestEntity, Map.class);
        Map<String, Object> response = responseEntity.getBody();
        
        // 응답 로그 출력
        logger.info("네이버로부터 받은 응답: {}", response);

        if (response != null && response.get("access_token") != null) {
            return (String) response.get("access_token");
        } else {
            logger.error("액세스 토큰을 받아오지 못함. 응답 내용: {}", response);
            throw new RuntimeException("액세스 토큰을 받아오는 중 오류가 발생했습니다.");
        }
    }
    // 액세스 토큰을 이용해 네이버 사용자 정보를 가져오는 메서드
    public NaverUserVO getUserInfo(String accessToken) {
        String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
        RestTemplate restTemplate = new RestTemplate();
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> responseEntity = restTemplate.postForEntity(userInfoUrl, request, Map.class);
            Map<String, Object> response = responseEntity.getBody();
            System.out.println("User Info Response: " + response); // 응답을 로그로 출력

            if (response != null && response.containsKey("response")) {
                Map<String, Object> userData = (Map<String, Object>) response.get("response");

                NaverUserVO naverUser = new NaverUserVO();
                naverUser.setId((String) userData.get("id"));
                naverUser.setEmail((String) userData.get("email"));
                naverUser.setNickname((String) userData.get("nickname"));
                return naverUser;
            } else {
                throw new RuntimeException("네이버 사용자 정보를 가져오는 중 오류가 발생했습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("네이버 사용자 정보 요청 중 오류가 발생했습니다.", e);
        }
    }
}
