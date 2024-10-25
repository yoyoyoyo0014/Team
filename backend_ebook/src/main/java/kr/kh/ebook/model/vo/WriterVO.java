package kr.kh.ebook.model.vo;

<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/model/vo/WriterVO.java
import java.util.Date;

=======
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/model/vo/WriterVO.java
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WriterVO {
	public int wr_num = 0;
	public String wr_name;
	public String wr_profile;
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/model/vo/WriterVO.java
=======
	public String wt_name;
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/model/vo/WriterVO.java
	
	public WriterVO(String name, String profile) {
		this.wr_name = name;
		this.wr_profile = profile;
	}
}
