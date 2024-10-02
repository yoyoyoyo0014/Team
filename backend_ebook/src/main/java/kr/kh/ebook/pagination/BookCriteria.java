package kr.kh.ebook.pagination;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookCriteria extends Criteria  {
	
	//type : 책 제목, 작가

	private int category;// 0 : 최신 ▲, 1 : 최신 ▼, 2 : 구매순 ▲, 3 : 구매순 ▼
	
	private String country;
	
	private int genre; //장르
	

	public BookCriteria(int page, int category, String country, int genre) {
		super(page);
		this.category = category;
		this.country = country;
		this.genre = genre;
	}

	
}