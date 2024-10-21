package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostVO {
	private int po_num;
	private String po_title;
	private String po_content;
	private String po_me_id;
	private Date po_date;
	private int po_co_num;
	private int po_view;
	private int po_like;
}
