package kr.kh.ebook.model.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberVO {
	
    private String me_id;            // 애플리케이션 내에서의 사용자 ID
    private String me_nickname;      // 닉네임
    private String me_name;			 // 실명
    private String me_pw;            // 비밀번호
    private String me_email;         // 이메일
    private String me_phone;         // 전화번호
    private String me_address;       // 주소
    private String me_postalCode;    // 우편번호
    private String me_gender;		 // 성별
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date me_birth;           // 생년월일
    
    private boolean me_adult;        // 성인 여부
    private String me_authority;     // 권한
    private String me_fail;          // 로그인 실패 횟수
    private String me_cookie;        // 자동 로그인 쿠키
    private String me_report;        // 신고 여부
    private String me_ms_name;		 // 회원 상태 ( 사용, 기간 정지, 영구 정지 )
    private Date me_stop;          // 정지 여부
    private String me_cm;			 // 사업자 번호
    private String me_enterCount;	 // 로그인 횟수
    private String me_last;          // 마지막 접속일
    private String me_naverId;       // 네이버 사용자 고유 ID (네이버 로그인 시 사용)
    private int me_point;
    
}
