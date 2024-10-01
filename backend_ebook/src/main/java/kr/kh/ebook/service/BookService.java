package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.BookDAO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.pagination.PageMaker;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class BookService {
	private BookDAO bookDao;
	
	private int count() {
		return bookDao.count();
	}
	
	private List<BookVO> searchBookList(PageMaker pm){
		return bookDao.searchBookList(pm);
	}
	
	
}
