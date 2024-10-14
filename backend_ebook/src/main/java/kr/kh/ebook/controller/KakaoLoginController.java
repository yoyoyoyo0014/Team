package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.KakaoUserVO;
import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.KakaoService;
import kr.kh.ebook.service.MemberService;

@RestController
@RequestMapping("/api/kakao")
public class KakaoLoginController {

    @Autowired
    private KakaoService kakaoService;

    @Autowired
    private MemberService memberService;

    @PostMapping("/login")
    public Map<String, Object> kakaoLogin(@RequestBody Map<String, String> request) {
        String kakaoAccessToken = request.get("token");
        Map<String, Object> response = new HashMap<>();

        try {
            // 카카오 API로부터 사용자 정보를 가져옴
            KakaoUserVO kakaoUser = kakaoService.getUserInfo(kakaoAccessToken);

            // 카카오 ID를 이용해 데이터베이스에서 사용자 정보 조회
            MemberVO member = memberService.getMemberById(kakaoUser.getId().toString());

            if (member != null) {
                // 사용자 존재: 로그인 성공 처리
                response.put("success", true);
            } else {
                // 사용자 없음: 로그인 실패 처리
                response.put("success", false);
                response.put("message", "사용자가 존재하지 않습니다.");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "로그인 처리 중 오류가 발생했습니다.");
        }

        return response;
    }
}

