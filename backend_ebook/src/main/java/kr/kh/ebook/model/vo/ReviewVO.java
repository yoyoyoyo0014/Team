package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewVO {
	private int re_num;
	private String re_content;
	private int re_bk_num;
	private double re_star;
	private Date re_date;
	private String re_me_id;
}
