package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BuyListVO {
	private int bl_num;
	private int bl_bk_num;
	private String bl_me_id;
	private int bl_ca_num;
}