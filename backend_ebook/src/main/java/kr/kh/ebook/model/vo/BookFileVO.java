package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookFileVO {
	private int bf_num;
	private String bf_name;
	private int bf_bk_num;
	private String bf_type;
}
