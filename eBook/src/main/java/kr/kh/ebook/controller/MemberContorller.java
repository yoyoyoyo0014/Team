package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.controller.AchievenentEvent.AchievenentListController;
import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.MemberService;

@RestController
@RequestMapping("/ebook/member")
public class MemberContorller {

    @Autowired
    private MemberService memberService;

    // 회원 아이디로 사용자 정보 조회 (일반 로그인, 소셜 로그인 통합)
    @GetMapping("/{me_id}")
    public ResponseEntity<MemberVO> getMember(@PathVariable String me_id) {
        MemberVO member = memberService.getMemberById(me_id);
        if (member != null) {
            return ResponseEntity.ok(member);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 일반 회원 로그인 처리
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberVO memberVO) {
        MemberVO member = memberService.login(memberVO.getMe_id(), memberVO.getMe_pw());

        Map<String, Object> response = new HashMap<>();
        if (member != null) {
            // 로그인 성공
            response.put("user", member);
            response.put("token", "JWT 토큰 예시"); // JWT 토큰을 여기서 발급
            return ResponseEntity.ok(response);
        } else {
            // 로그인 실패
            response.put("message", "아이디 또는 비밀번호가 잘못되었습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // 회원 가입 처리
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerNormalMember(@RequestBody MemberVO memberVO) {
        boolean isRegistered = memberService.registerNormalMember(memberVO);
        
        Map<String, String> response = new HashMap<>();
        if (isRegistered) {
            response.put("message", "회원 등록 완료");
            response.put("token", "JWT 토큰 예시"); // 회원가입 후 JWT 토큰 발급 가능
            AchievenentListController.instance.createAccount(memberVO.getMe_id());//도전과제 달성 추가
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "회원 등록 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // 아이디 중복 체크
    @GetMapping("/check-duplicate-id")
    public ResponseEntity<Map<String, Boolean>> checkDuplicateId(@RequestParam("me_id") String meId) {
        boolean isDuplicate = memberService.isIdDuplicate(meId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", isDuplicate);
        return ResponseEntity.ok(response);
    }

    // 닉네임 중복 체크
    @GetMapping("/check-duplicate-nickname")
    public ResponseEntity<Map<String, Boolean>> checkDuplicateNickname(@RequestParam("me_nickname") String meNickname) {
        boolean isDuplicate = memberService.isNicknameDuplicate(meNickname);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", isDuplicate);
        return ResponseEntity.ok(response);
    }

    // 닉네임 가져오기
    @GetMapping("/nickname/{me_id}")
    public ResponseEntity<Map<String, String>> getNickname(@PathVariable String me_id) {
        MemberVO member = memberService.getMemberById(me_id);
        Map<String, String> response = new HashMap<>();

        if (member != null) {
            response.put("nickname", member.getMe_nickname());
            return ResponseEntity.ok(response);
        } else {
            response.put("nickname", "닉네임 없음");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    
    /// 일반 회원 닉네임 수정
    @PostMapping("/update-nickname")
    public ResponseEntity<Map<String, Object>> updateNickname(@RequestBody Map<String, String> payload) {
        String memberId = payload.get("me_id");
        String newNickname = payload.get("nickname");

        boolean isUpdated = memberService.updateNickname(memberId, newNickname);

        Map<String, Object> response = new HashMap<>();
        if (isUpdated) {
            response.put("success", true); // success 필드를 추가
            response.put("message", "닉네임이 성공적으로 변경되었습니다.");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false); // 실패 시 success 필드 추가
            response.put("message", "닉네임 변경에 실패하였습니다.");
            return ResponseEntity.ok(response);
        }
    }
}
