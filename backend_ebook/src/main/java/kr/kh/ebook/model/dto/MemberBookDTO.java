package kr.kh.ebook.model.dto;

import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.BuyListVO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberBookDTO {
	private BuyListVO buylistVO;
	private BookVO bookVO;
}
