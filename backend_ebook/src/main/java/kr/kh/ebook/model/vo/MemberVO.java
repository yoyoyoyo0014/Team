package kr.kh.ebook.model.vo;

import java.util.Date;

<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/model/vo/MemberVO.java
=======
import lombok.AllArgsConstructor;
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/model/vo/MemberVO.java
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/model/vo/MemberVO.java
@NoArgsConstructor
public class MemberVO {
	private String me_id;
	private String me_nickname;
	private String me_pw;
	private String me_email;
	private String me_phone;
	private String me_address;
	private String me_postalCode;
	private String me_gender;
	private Date me_birth; 
	private int me_adult;
	private String me_authority;
	private int me_fail;
	private String me_cookie; 
	private int me_report;
	private String me_ms_name;
	private Date me_stop;
	private String me_cm;
	private int me_entercount;
	private Date me_last;
=======
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
    private Date me_birth;           // 생년월일
    private boolean me_adult;        // 성인 여부
    private String me_authority;     // 권한
    private String me_fail;          // 로그인 실패 횟수
    private String me_cookie;        // 자동 로그인 쿠키
    private String me_report;        // 신고 여부
    private String me_ms_name;		 // 회원 상태 ( 사용, 기간 정지, 영구 정지 )
    private String me_stop;          // 정지 여부
    private String me_cm;			 // 사업자 번호
    private String me_enterCount;	 // 로그인 횟수
    private String me_last;          // 마지막 접속일
    private String me_naverId;       // 네이버 사용자 고유 ID (네이버 로그인 시 사용)
    
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/model/vo/MemberVO.java
}
