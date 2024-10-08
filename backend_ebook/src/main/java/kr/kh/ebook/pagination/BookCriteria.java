package kr.kh.ebook.pagination;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookCriteria extends Criteria  {
	private String category;
	
	private String country;
	
	private int genre;

	public BookCriteria(int page, String category, String country, int genre) {
		super(page);
		this.category = category;
		this.country = country;
		this.genre = genre;
	}
}