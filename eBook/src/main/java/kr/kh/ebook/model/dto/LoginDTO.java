package kr.kh.ebook.model.dto;

import kr.kh.ebook.model.vo.MemberVO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
	String token;
	MemberVO member;
}
