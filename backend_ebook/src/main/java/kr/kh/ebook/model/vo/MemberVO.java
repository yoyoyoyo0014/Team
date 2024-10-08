package kr.kh.ebook.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberVO {
	
	private String me_id;            // 아이디
    private String me_nickname;      // 닉네임
    private String me_pw;            // 비밀번호
    private String me_email;         // 이메일
    private String me_address;       // 주소
    private String me_postalCode;    // 우편번호
    private String me_phone;         // 전화번호
    private String me_birth;         // 생년월일
    private boolean me_adult;        // 성인 여부
    private String me_authority;     // 권한
    private String me_fail;          // 로그인 실패 횟수
    private String me_cookie;        // 자동 로그인 쿠키
    private String me_report;        // 신고 여부
    private String me_stop;          // 정지 여부
    private String me_name;          // 이름
    private String me_on;            // 가입일
    private String me_last;          // 마지막 접속일
	
}
