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
}
