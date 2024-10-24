package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WriterVO {
	public int wr_num = 0;
	public String wr_name;
	public String wr_profile;
	public String wt_name;
	
	public WriterVO(String name, String profile) {
		this.wr_name = name;
		this.wr_profile = profile;
	}
}
