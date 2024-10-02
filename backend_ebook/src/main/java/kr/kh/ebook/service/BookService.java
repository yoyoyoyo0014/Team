package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.BookDAO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.PageMaker;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class BookService {
	private BookDAO bookDao;
	
	public int count() {
		return bookDao.count();
	}
	
	public int searchBookCount(BookCriteria bookCri) {
		return bookDao.searchBookCount(bookCri);
	}//검색할 책 개수
	
	public List<BookVO> searchBookList(PageMaker pm){
		return bookDao.searchBookList(pm);
	}//검색 책
	
	public ReviewVO selectMyReview(String userId, int bookNum) {
		
		ReviewVO res = bookDao.selectMyReview(userId,bookNum);
		
		return res;
	}

	public int reviewCount(int bookNum) {
		return bookDao.reviewCount(bookNum);
	}

	public List<ReviewVO> selectReviewList(PageMaker pm,int bookNum) {
		return bookDao.selectReviewList(pm,bookNum);
	}

	public boolean insertReview(ReviewVO review) {
		return bookDao.insertReview(review);
	}

	public BookListVO selectReadBook(int bookNum, String userId) {
		return bookDao.selectReadBook(bookNum,userId);
	}

	public boolean updateReadBook(BookListVO readBook) {
		return bookDao.updateReadBook(readBook);
	}

	public BookVO selectBook(int bookNum) {
		return bookDao.selectBook(bookNum);
	}
}
