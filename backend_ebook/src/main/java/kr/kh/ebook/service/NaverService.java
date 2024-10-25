package kr.kh.ebook.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

import kr.kh.ebook.dao.MemberDAO;
import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.model.vo.NaverUserVO;
import kr.kh.ebook.util.JwtUtil;

@Service
public class NaverService {

    @Value("${naver.client-id}")
    private String clientId;

    @Value("${naver.client-secret}")
    private String clientSecret;

    @Value("${naver.redirect-uri}")
    private String redirectUri;

    private static final Logger logger = LoggerFactory.getLogger(NaverService.class);
    
    @Autowired
    private MemberDAO memberDao; // 회원정보 DAO

    @Autowired
    private JwtUtil jwtUtil; // JWT 유틸리티
    
    @Autowired
    private MemberService memberService;
    
    public String getAccessToken(String code, String state) {
        String tokenUrl = "https://nid.naver.com/oauth2.0/token";
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("code", code);
        params.add("state", state);
        params.add("redirect_uri", redirectUri);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<Map> responseEntity = restTemplate.exchange(tokenUrl, HttpMethod.POST, requestEntity, Map.class);
            Map<String, Object> response = responseEntity.getBody();
            logger.info("네이버로부터 받은 Access Token 응답: {}", response);

            if (response != null && response.get("access_token") != null) {
                String accessToken = (String) response.get("access_token");
                logger.info("Access Token: {}", accessToken); // Access Token 출력
                return accessToken;
            } else {
                throw new RuntimeException("액세스 토큰을 받아오지 못함.");
            }
        } catch (Exception e) {
            logger.error("Access Token 요청 실패: {}", e.getMessage());
            throw new RuntimeException("Access Token 요청 중 오류가 발생했습니다.", e);
        }
    }

    
    // 액세스 토큰을 이용해 네이버 사용자 정보를 가져오는 메서드
    public NaverUserVO getUserInfo(String accessToken) {
        String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
        RestTemplate restTemplate = new RestTemplate();

        // 요청에 필요한 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        logger.info("Access Token 사용하여 사용자 정보 요청: {}", accessToken);

        HttpEntity<String> request = new HttpEntity<>(headers);

        try {
            // API 호출 전 로그
            logger.info("네이버 사용자 정보 API 호출: {}", userInfoUrl);

            // 네이버 API 호출
            ResponseEntity<Map> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, request, Map.class);
            logger.info("네이버로부터 받은 사용자 정보 응답: {}", response);

            if (response.getBody().containsKey("response")) {
                Map<String, Object> userData = (Map<String, Object>) response.getBody().get("response");

                NaverUserVO naverUser = new NaverUserVO();
                naverUser.setId((String) userData.get("id"));
                naverUser.setEmail((String) userData.get("email"));
                naverUser.setNickname((String) userData.get("nickname"));
                naverUser.setPhone((String) userData.get("mobile"));
                naverUser.setBirthyear((String) userData.get("birthyear"));
                naverUser.setBirthday((String) userData.get("birthday"));
                naverUser.setName((String) userData.get("name"));
                naverUser.setGender(convertGender((String) userData.get("gender")));
                
                return naverUser;
            } else {
                throw new RuntimeException("네이버 사용자 정보 요청 실패.");
            }
        } catch (Exception e) {
            logger.error("네이버 사용자 정보 요청 중 오류 발생: {}", e.getMessage());
            throw new RuntimeException("네이버 사용자 정보 요청 중 오류가 발생했습니다.", e);
        }
    }


    
    public String registerNaverUser(NaverUserVO naverUser) {
        // 1. 네이버 ID로 회원 조회 (이미 있는 회원인지 확인)
        MemberVO existingMember = memberDao.selectMemberByNaverId(naverUser.getId());

        if (existingMember != null) {
            throw new IllegalStateException("이미 가입된 회원입니다.");
        }

        // 2. 새로운 회원 등록
        MemberVO newMember = new MemberVO();
        newMember.setMe_naverId(naverUser.getId());
        newMember.setMe_email(naverUser.getEmail());
        newMember.setMe_nickname(naverUser.getNickname());
        newMember.setMe_phone(naverUser.getPhone());
        newMember.setMe_gender(naverUser.getGender());
        newMember.setMe_name(naverUser.getName());
        newMember.setMe_authority("USER");

        memberDao.insertMember(newMember); // 회원 정보 DB에 삽입

        // 3. JWT 토큰 생성 후 반환
        return jwtUtil.generateToken(newMember.getMe_id());
    }
    
    // 생일을 yyyy-MM-dd 형식으로 변환하는 메서드
    public Date combineBirth(String birthyear, String birthday) {
        String combinedBirth = birthyear + "-" + birthday;  // 예: 1990-05-12
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        
        try {
            return dateFormat.parse(combinedBirth);  // 문자열을 Date 타입으로 변환
        } catch (ParseException e) {
            throw new RuntimeException("생년월일 변환 중 오류가 발생했습니다.", e);
        }
    }

    public void saveNaverUserInfo(NaverUserVO naverUser) {
        // 네이버 API로 받은 데이터를 합쳐서 me_birth로 저장
        Date meBirth = combineBirth(naverUser.getBirthyear(), naverUser.getBirthday());
        
        // MemberVO에 설정
        MemberVO member = new MemberVO();
        member.setMe_birth(meBirth);
        
        // DB 저장 로직 호출
        memberService.registerMember(member);
    }
    
    // 성별 변환 메서드
    private String convertGender(String gender) {
        if ("M".equals(gender)) {
            return "Male";
        } else if ("F".equals(gender)) {
            return "Female";
        }
        return null;
    }
    
}
