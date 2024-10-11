package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReportTypeVO {
	private int rt_num;
	private String rt_name;
	private String rt_category;
}
