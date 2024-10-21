package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.BookDAO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookSecondGenreVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.BookPageMaker;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class BookService {
	private BookDAO bookDao;
	
	public int count() {
		return bookDao.count();
	}
	
	//검색할 책 개수
	public int searchBookCount(String country,int genre,String search) {
		return bookDao.searchBookCount(country,genre,search);
	}
	
	//검색 책
	public List<BookVO> searchBookList(BookPageMaker pm){
		return bookDao.searchBookList(pm);
	}
	
	//내 리뷰 찾기
	public ReviewVO selectMyReview(String userId, int bookNum) {
		ReviewVO res = bookDao.selectMyReview(userId,bookNum);
		
		return res;
	}

	//해당 책 리뷰 숫자 구하기
	public int reviewCount(int bookNum) {
		return bookDao.reviewCount(bookNum);
	}
	
	public List<ReviewVO> selectReviewList(int bookNum,int pageNum) {
		return bookDao.selectReviewList(bookNum,pageNum);
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
	//책 디테일
	public boolean updateReview(ReviewVO writeUserReview) {
		return bookDao.updateReview(writeUserReview);
	}

	public boolean deleteReview(int bookNum, String id) {
		return bookDao.deleteReview(bookNum,id);
	}

	public List<BookGenreVO> selectGenreList() {
		return bookDao.selectGenreList();
	}
	
	public List<BookGenreVO> getAllGenre() {
		List<BookGenreVO> list = bookDao.selectAllGenre();
		return list;
	}

	public List<BookGenreVO> getSecondGenre(int ge_num) {	
		List<BookGenreVO> list = bookDao.selectAllSecondGenre(ge_num);
		return list;
	}

	public List<BookSecondGenreVO> selectSecondGenreList() {
		return bookDao.selectSecondGenre();
	}

	public boolean insertBook(BookVO book) {
		return bookDao.insertBook(book);
	}

	public boolean insertWriterList(WriterListVO writerListVO) {
		return bookDao.insertWriterList(writerListVO);
	}
	

	
	
}