package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookVO {
	private int bk_num;
	private String bk_name;
	private String bk_publisher;
	private String bk_state;
	private Date bk_date;
	private int bk_sg_num;
	private String bk_plot;
	private int bk_price;
	private int bk_amount;
	private String bk_index;
	private String bk_isbn;
	private float bk_score;
	private int bk_reviewCount;
	private int bk_totalPage;
	private int bk_agelimit;
	private String bk_writer;
	
	private int bk_totalPurchase;
	private int bk_age_60_male; 
	private int bk_age_60_female;
	private int bk_age_50_male;
	private int bk_age_50_female;
	private int bk_age_40_male;
	private int bk_age_40_female;
	private int bk_age_30_male;
	private int bk_age_30_female;
	private int bk_age_20_male;
	private int bk_age_20_female;
	private int bk_age_10_male;
	private int bk_age_10_female;
	
	//private String bk_me_id;
	private String bk_publisher;
}
