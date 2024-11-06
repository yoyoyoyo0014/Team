package kr.kh.ebook.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NaverUserVO {

	private String id;    // 네이버 사용자 고유 ID
    private String email; // 이메일 주소
    private String nickname; // 별명
    private String phone;      // 전화번호
    
    private String birthyear;  // 출생년도
    private String birthday;   // 생일 (MM-DD 형식)
    private String name;
    private String gender;
    
}
