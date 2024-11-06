package kr.kh.ebook.controller;

import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.service.GoogleService;

@RestController
@RequestMapping("/ebook/auth")
public class GoogleController {

    @Autowired
    private GoogleService googleService;

    @PostMapping("/google")
    public ResponseEntity<Map<String, Object>> googleLogin(@RequestBody Map<String, String> body) {
        String idToken = body.get("idToken");

        // GoogleService에서 사용자 등록 또는 검색 후 응답 받기
        Map<String, Object> response = googleService.findOrRegisterUser(idToken);

        if (response.get("success") != null && (boolean) response.get("success")) {
            // 로그인 성공: 사용자 정보 및 토큰 반환
            return ResponseEntity.ok(response);
        } else {
            // 로그인 실패: 에러 메시지 반환
            Map<String, Object> errorResponse = new HashMap<>();  // Object 타입으로 변경
            errorResponse.put("message", "Google 로그인 실패");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}
