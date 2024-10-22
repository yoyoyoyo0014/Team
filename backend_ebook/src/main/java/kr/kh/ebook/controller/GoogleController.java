package kr.kh.ebook.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
    public Map<String, Object> googleLogin(@RequestBody Map<String, String> body) {
        String idToken = body.get("idToken");

        // GoogleService에서 사용자 등록 또는 검색 후 응답 받기
        Map<String, Object> response = googleService.findOrRegisterUser(idToken);

        // 그대로 response 반환
        return response;  
    }
}
