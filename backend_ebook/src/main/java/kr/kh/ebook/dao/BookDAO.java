package kr.kh.ebook.dao;

import java.util.List;

import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.pagination.PageMaker;

//https://github.com/st8324/java_240528/blob/main/servlet/servlet2/src/main/java/kr/kh/app/dao/PostMapper.xml
public interface BookDAO {

	int count();
	
	List<BookVO> searchBookList(PageMaker pm);
	
}
