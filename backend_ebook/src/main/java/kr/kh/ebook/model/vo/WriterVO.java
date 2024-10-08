package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WriterVO {
	public int wr_num;
	public String wr_name;
	public String wr_profile;
}
