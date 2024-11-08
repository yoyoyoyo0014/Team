package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KakaoUserVO {
    
    private String id;              // 카카오 사용자 고유 ID
    private String nickname;        // 사용자 닉네임
    private String email;           // 카카오 계정(이메일)
    private String name;            // 사용자 이름
    private String gender;          // 성별
    private String phoneNumber;     // 카카오 계정(전화번호)
    private String address;         // 배송지 주소
    
    private Date me_birthDate;       // 출생일 (Date 형식으로 저장)
    private String birthyear;        // 출생년도
    private String birthday;         // 생일 (MMDD 형식)
    
}