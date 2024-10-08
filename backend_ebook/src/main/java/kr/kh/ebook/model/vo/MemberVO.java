package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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
}
