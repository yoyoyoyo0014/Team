package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.exception.SuspensionException;
import kr.kh.ebook.model.vo.MemberVO;
import kr.kh.ebook.service.AchievenentService;
import kr.kh.ebook.service.MemberService;
import kr.kh.ebook.util.JwtUtil;

@RestController
@RequestMapping("/ebook/member")
public class MemberContorller {
	
	private static final Logger logger = LoggerFactory.getLogger(MemberContorller.class);
	
    @Autowired
    private MemberService memberService;
    
    @Autowired
    private JwtUtil jwtUtil;

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
        Map<String, Object> response = new HashMap<>();

        try {
            MemberVO member = memberService.login(memberVO.getMe_id(), memberVO.getMe_pw());
            
            if (member != null) {
                String token = jwtUtil.generateToken(member.getMe_id());
                response.put("user", member);
                response.put("token", token);
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "아이디 또는 비밀번호가 잘못되었습니다.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (SuspensionException e) {
            // SuspensionException이 발생하면 예외 메시지를 응답에 포함
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
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
            achService.insertAch(1, memberVO.getMe_id());
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
    
    @GetMapping("/profile")
    public MemberVO getProfile(@RequestHeader("Authorization") String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            logger.warn("Invalid Authorization header format."); // **System.out.println 대신 logger 사용**
            return null; // 토큰이 없거나 형식이 잘못된 경우 null 반환
        }

        // "Bearer " 접두사를 제거하여 실제 토큰 값 추출
        String jwtToken = token.replace("Bearer ", "");
        logger.info("JWT Token: " + jwtToken); // **토큰 값 로그로 확인**

        String memberId;
        try {
            memberId = jwtUtil.extractUserId(jwtToken); // JwtUtil을 사용하여 사용자 ID 추출
        } catch (Exception e) {
            logger.warn("JWT parsing error: " + e.getMessage()); // **예외 발생 시 경고 로그**
            return null; // 토큰이 유효하지 않을 때 null 반환
        }

        MemberVO member = memberService.getMemberProfile(memberId);
        if (member == null) {
            logger.warn("No member found for ID: " + memberId);
        } else {
            logger.info("Successfully retrieved member profile for ID: " + memberId);
        }
         return member; // **VO 반환 (ResponseEntity 사용하지 않음)**
    }
    
    @PostMapping("/changePassword")
    public ResponseEntity<Map<String, String>> changePassword(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody Map<String, String> passwords) {

        String token = authorizationHeader.replace("Bearer ", "");
        
        // 토큰에서 userId 추출
        String userId = jwtUtil.extractUserId(token);
        
     // 토큰 검증
        if (!jwtUtil.validateToken(token, userId)) { // 추출한 userId를 validateToken에 전달
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "유효하지 않은 토큰입니다."));
        }

        String newPassword = passwords.get("newPassword");
        Map<String, String> response = new HashMap<>();

        // 비밀번호 변경 로직
        boolean isPasswordChanged = memberService.changePassword(userId, newPassword);
        if (isPasswordChanged) {
            response.put("message", "비밀번호 변경 성공");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "비밀번호 변경 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /* 제재 적용을 위한 메서드 */
    
    @PostMapping("/applySuspension")
    public ResponseEntity<?> applySuspension(@RequestBody Map<String, Object> params) {
        String userId = (String) params.get("userId");
        int suspensionDays = (int) params.get("suspensionDays");
        memberService.applySuspension(userId, suspensionDays);
        return ResponseEntity.ok("제재가 적용되었습니다.");
    }

    @PostMapping("/cancelSuspension")
    public ResponseEntity<?> cancelSuspension(@RequestBody Map<String, Object> params) {
        String userId = (String) params.get("userId");

        try {
            // 서비스에서 제재 취소 메서드 호출
            memberService.cancelSuspension(userId);
            // 성공 메시지 반환
            return ResponseEntity.ok("제재가 취소되었습니다.");

        } catch (IllegalStateException e) {
            // 제재가 없는 사용자에 대한 오류 처리
            return ResponseEntity.badRequest().body("제재가 적용되지 않은 사용자입니다.");
        } catch (Exception e) {
            // 예상치 못한 오류에 대한 일반 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }

    @GetMapping("/checkSuspensionStatus")
    public ResponseEntity<?> checkSuspensionStatus(@RequestParam String userId) {
        MemberVO member = memberService.getMemberById(userId);
        boolean isSuspended = memberService.isSuspended(member);
        return ResponseEntity.ok(Map.of("isSuspended", isSuspended));
    }
    
}
