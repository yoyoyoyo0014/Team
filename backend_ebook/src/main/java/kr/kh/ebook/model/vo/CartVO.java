package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CartVO extends BookVO {
	private int ca_num;
	private String ca_me_id;
}
