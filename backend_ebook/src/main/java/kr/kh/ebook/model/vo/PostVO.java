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
    private String po_date;
    private int po_co_num;
    private int po_view;
    private int po_like;
    private String po_start;  // 이벤트 시작일
    private String po_end;    // 이벤트 종료일
    private String po_me_id;
    private String po_me_nickname;
    private String po_link;   // 게시글 리스트에 띄워지는 이미지
    private String po_image;  // 이벤트 이미지

    // Getter와 Setter 추가
    public String getPo_start() {
        return po_start;
    }

    public void setPo_start(String po_start) {
        this.po_start = po_start;
    }

    public String getPo_end() {
        return po_end;
    }

    public void setPo_end(String po_end) {
        this.po_end = po_end;
    }
    
    public String getPo_link() {
        return po_link;
    }

    public void setPo_link(String po_link) {
        this.po_link = po_link;
    }

    public String getPo_image() {
        return po_image;
    }

    public void setPo_image(String po_image) {
        this.po_image = po_image;
    }

	public PostVO(String title, String writer, String nickname, String content, int coNum, String start, String end,
			String poLinkPath, String poImagePath) {
		this.po_title = title;
		this.po_me_id = writer;
		this.po_me_nickname = nickname;
		this.po_content = content;
		this.po_co_num = coNum;
		this.po_start = start;
		this.po_end = end;
		this.po_link = poLinkPath;
		this.po_image = poImagePath;
	}
}
