package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReportVO {
	private int rp_num;
	private String rp_me_id;
	private String rp_target;
	private String rp_content;
	private int rp_rt_num;
	private Date rp_date;
	private String rp_id;
}
