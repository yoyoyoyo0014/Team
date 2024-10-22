package kr.kh.ebook.pagination;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookCriteria extends Criteria  {
	 String category;
	
	 String country;
	
	 int genre;

	public BookCriteria(int page, String category, String country, int genre,String search) {
		super(page);
		this.category = category;
		this.country = country;
		this.genre = genre;
		this.search = search;
	}
}