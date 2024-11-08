package kr.kh.ebook.pagination;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostCriteria extends Criteria{
	private int co_num;
	private String type;
	
	public PostCriteria(int co_num, String pageStr, String search, String type, int perPageNum) {
		int page = 0;
		try {
			page = Integer.parseInt(pageStr);
		} catch (Exception e) {
			page = 1;
		}
		this.co_num = co_num;
		this.page = page;
		this.search = search == null ? "" : search;
		this.type = type == null ? "all" : type;
		this.perPageNum = perPageNum;
	}
}
