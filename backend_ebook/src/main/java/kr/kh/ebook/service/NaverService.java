package kr.kh.ebook.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import kr.kh.ebook.model.vo.NaverUserVO;

@Service
public class NaverService {
	
    // application.properties에서 설정된 값을 가져옴
    @Value("${naver.client-id}")
    private String clientId;

    @Value("${naver.client-secret}")
    private String clientSecret;

    @Value("${naver.redirect-uri}")
    private String redirectUri;
	
    // 네이버 API로부터 Access Token을 받아오는 메서드
    public String getAccessToken(String code, String state) {
        String tokenUrl = "https://nid.naver.com/oauth2.0/token";
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> params = new HashMap<>();

        params.put("grant_type", "authorization_code");
        params.put("client_id", clientId);   // 네이버에서 발급받은 Client ID
        params.put("client_secret", clientSecret);  // 네이버에서 발급받은 Client Secret
        params.put("code", code);
        params.put("state", state);
        params.put("redirect_uri", redirectUri);  // 네이버 API 설정에서 지정한 리디렉트 URI

        // 네이버 API에 POST 요청을 보내서 액세스 토큰 받아옴
        Map<String, Object> response = restTemplate.postForObject(tokenUrl, params, Map.class);
        if (response != null && response.get("access_token") != null) {
            return (String) response.get("access_token");
        } else {
            throw new RuntimeException("액세스 토큰을 받아오는 중 오류가 발생했습니다.");
        }
    }

    // 액세스 토큰을 이용해 네이버 사용자 정보를 가져오는 메서드
    public NaverUserVO getUserInfo(String accessToken) {
        String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
        RestTemplate restTemplate = new RestTemplate();
        
        // Authorization 헤더에 액세스 토큰 추가
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> request = new HttpEntity<>(headers);
        Map<String, Object> response = restTemplate.postForObject(userInfoUrl, request, Map.class);

        if (response != null && response.containsKey("response")) {
            Map<String, Object> userData = (Map<String, Object>) response.get("response");

            // 사용자 정보를 NaverUserVO로 변환하여 반환
            NaverUserVO naverUser = new NaverUserVO();
            naverUser.setId((String) userData.get("id"));
            naverUser.setEmail((String) userData.get("email"));
            naverUser.setNickname((String) userData.get("nickname"));
            return naverUser;
        } else {
            throw new RuntimeException("네이버 사용자 정보를 가져오는 중 오류가 발생했습니다.");
        }
    }
}
