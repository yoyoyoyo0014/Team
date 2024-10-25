package kr.kh.ebook.pagination;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Criteria {
	protected int page = 1;//현재 페이지 : 기본값 - 1
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/pagination/Criteria.java
	protected int perPageNum = 5;//한 페이지에서 컨텐츠 개수 : 기본값 - 10
=======
	protected int perPageNum = 10;//한 페이지에서 컨텐츠 개수 : 기본값 - 10
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/pagination/Criteria.java
	
	protected String search = ""; //검색어 : 기본값 - 빈문자열=> 전체 검색
	protected String type=""; //검색 타입
	
	public Criteria(int page, int perPageNum) {
		this.page = page;
		this.perPageNum = perPageNum;
	}
	
	public Criteria(int page) {
		this.page = page;
	}
	public int getPageStart() {
		return (page - 1) * perPageNum;
	}
}
