package kr.kh.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.GoogleService;

@RestController
@RequestMapping("/api/auth")
public class GoogleController {

    @Autowired
    private GoogleService googleService;

    @PostMapping("/google")
    public MemberVO googleLogin(@RequestBody String idToken) {
        return googleService.findOrRegisterUser(idToken);
    }
}
