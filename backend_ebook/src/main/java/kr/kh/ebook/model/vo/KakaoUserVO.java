package kr.kh.ebook.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KakaoUserVO {
	
    private Long id;           // 카카오 사용자 고유 ID
    private String nickname;   // 사용자 닉네임
    
}