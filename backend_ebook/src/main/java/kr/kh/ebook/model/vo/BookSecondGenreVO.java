package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookSecondGenreVO extends BookGenreVO {
	private int sg_parent;
}
