package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.NaverUserVO;
import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.NaverService;
import kr.kh.ebook.service.MemberService;
import kr.kh.ebook.util.JwtUtil;

@RestController
@RequestMapping("/ebook/naver")
public class NaverLoginController {

    private static final Logger logger = LoggerFactory.getLogger(NaverLoginController.class);

    @Autowired
    private NaverService naverService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, Object> naverLogin(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        String state = request.get("state");
        Map<String, Object> response = new HashMap<>();

        try {
            // 네이버 API로부터 Access Token 가져오기
            String accessToken = naverService.getAccessToken(code, state);
            logger.info("Access Token: {}", accessToken);

            // Access Token으로 사용자 정보 가져오기
            NaverUserVO naverUser = naverService.getUserInfo(accessToken);
            logger.info("Naver User: {}", naverUser);

            // 네이버 사용자 정보를 이용해 DB에서 해당 사용자 조회
            MemberVO member = memberService.getMemberByNaverId(naverUser.getId());

            if (member != null) {
                // 로그인 성공 시 JWT 토큰 생성
                String jwtToken = jwtUtil.generateToken(member.getMe_id());
                logger.info("JWT Token 생성 완료: {}", jwtToken);

                // 사용자에게 JWT 토큰 반환
                response.put("success", true);
                response.put("token", jwtToken); // 발급된 JWT 토큰
            } else {
                // 사용자 없음: 로그인 실패 처리
                logger.warn("로그인 실패: 사용자 정보를 찾을 수 없음");
                response.put("success", false);
                response.put("message", "사용자가 존재하지 않습니다.");
            }
        } catch (Exception e) {
            logger.error("로그인 처리 중 오류 발생", e);
            response.put("success", false);
            response.put("message", "로그인 처리 중 오류가 발생했습니다.");
        }

        return response;
    }
}
