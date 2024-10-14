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
	
}
