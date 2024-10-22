package kr.kh.ebook.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
public class ReviewVO {
	private int re_num = 0;
    private String re_content;
    private int re_bk_num = 0;
    private int re_star;
    private Date re_date; 
    private String re_me_id;
}
