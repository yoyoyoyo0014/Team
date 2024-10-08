package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookGenreVO {
	private int ge_num;
	private String ge_name;
	private int ge_parent;
}