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
	private String rt_name;
	
	public ReportVO(String meId, String targetId, int rp_rt_num,String rpId,String reportContent) {
		this.rp_me_id = meId;
		this.rp_target = targetId;
		this.rp_rt_num = rp_rt_num;
		this.rp_id = rpId;
		this.rp_content = reportContent;
	}

}