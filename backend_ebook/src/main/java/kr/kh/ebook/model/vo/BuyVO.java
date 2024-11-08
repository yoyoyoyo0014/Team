package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BuyVO {
	private int bu_num;
	private String bu_uid;
	private String bu_me_id;
	private String bu_state;
	private String bu_payment;
	private int bu_total;
	private int bu_ori_total;
	private Date bu_date;
}