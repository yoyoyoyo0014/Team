package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookSecondGenreVO {
	private int sg_num;
	private String sg_name;
	private int sg_parent;
}
