package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.GoogleService;

@RestController
@RequestMapping("/ebook/auth")
public class GoogleController {

    @Autowired
    private GoogleService googleService;

    @PostMapping("/google")
    public Map<String, Object> googleLogin(@RequestBody Map<String, String> body) {
        String idToken = body.get("idToken");
        Map<String, Object> response = new HashMap<>();

        try {
            // GoogleService에서 사용자 등록 또는 검색
            MemberVO member = googleService.findOrRegisterUser(idToken);

            // 성공 시 응답 데이터 구성
            response.put("success", true);
            response.put("member", member);
        } catch (RuntimeException e) {
            // 유효성 검증 실패 시
            response.put("success", false);
            response.put("message", "유효성 검사 실패: " + e.getMessage());
        } catch (Exception e) {
            // 기타 서버 오류 발생 시
            response.put("success", false);
            response.put("message", "서버 오류 발생: " + e.getMessage());
        }

        return response;
    }
}
