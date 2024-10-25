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
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/model/vo/ReviewVO.java
    private int re_star;
    private Date re_date; 
    private String re_me_id;
=======
    private double re_star;
    private Date re_date; 
    private String re_me_id;
    private String me_nickname; 
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/model/vo/ReviewVO.java
}
