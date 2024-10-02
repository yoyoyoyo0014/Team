package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookVO {
	private int bk_num;
	private String bk_name;
	private String bk_state;
	private Date bk_date;
	private int bk_bg_num;
	private String bk_plot;
	private int bk_price;
	private int bk_amount;
	private String bk_index;
	private String bk_isbn;
	private float bk_score;
	private int bk_reviewCount;
	private int bk_totalPage;
}
