package kr.kh.ebook.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@Data
@NoArgsConstructor
public class WriterListVO {
	 	private int wl_num;  // 이 필드를 추가합니다
	    private int wl_wr_num;
	    private int wl_bk_num;
	    private int wl_wt_num;
	   
	
	public WriterListVO(int wr_num, int bk_num,int wt_num) {
		this.wl_wr_num = wr_num;
		this.wl_bk_num = bk_num;
		this.wl_wt_num = wt_num;
	}
	public WriterListVO(int wl_num,int wr_num, int bk_num,int wt_num) {
		this.wl_num=wl_num;
		this.wl_wr_num = wr_num;
		this.wl_bk_num = bk_num;
		this.wl_wt_num = wt_num;
	}
}
