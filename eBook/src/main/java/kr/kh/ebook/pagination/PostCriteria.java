package kr.kh.ebook.pagination;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostCriteria extends Criteria{
	private int co_num;

	public PostCriteria(int page, int perPageNum, int co_num) {
		super(page, perPageNum);
		this.co_num = co_num;
	}
}
