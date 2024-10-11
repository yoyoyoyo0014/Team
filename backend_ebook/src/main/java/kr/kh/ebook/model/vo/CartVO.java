package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CartVO {
	private int ca_num;
	private int ca_bk_num;
	private String ca_me_id;
}
