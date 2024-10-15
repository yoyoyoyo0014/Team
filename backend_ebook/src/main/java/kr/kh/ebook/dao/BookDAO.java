package kr.kh.ebook.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.pagination.PageMaker;

@Repository
@Mapper
public interface BookDAO {

	int count();
	
	List<BookVO> searchBookList(PageMaker pm);
	
}
