package kr.kh.ebook.pagination;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookCriteria extends Criteria  {
	 String category;
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/pagination/BookCriteria.java
	
	 String country;
	
	 int genre;

	public BookCriteria(int page, String category, String country, int genre,String search) {
=======
	 String country;
	 int genre;

	public BookCriteria(int page, String category, String country, int genre, String search) {
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/pagination/BookCriteria.java
		super(page);
		this.category = category;
		this.country = country;
		this.genre = genre;
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/pagination/BookCriteria.java
		this.search = search;
	}
=======
	}
	
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/pagination/BookCriteria.java
}