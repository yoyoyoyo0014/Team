package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AchievenentListVO {
	private int acl_ac_num;
	private String acl_me_id;
	private Date acl_date;
	private String acl_check;
}