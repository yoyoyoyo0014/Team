package kr.kh.ebook.service;

import java.util.List;
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/service/BookService.java
=======
import java.util.Random;
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/service/BookService.java

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.BookDAO;
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/service/BookService.java
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookSecondGenreVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.BookGenreVO;
=======
import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/service/BookService.java
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.BookPageMaker;
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/service/BookService.java
import lombok.AllArgsConstructor;


=======
import kr.kh.ebook.pagination.Criteria;
import lombok.AllArgsConstructor;

>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/service/BookService.java
@Service
@AllArgsConstructor
public class BookService {
	private BookDAO bookDao;
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/service/BookService.java
	
	public int count() {
		return bookDao.count();
	}
	
=======

>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/service/BookService.java
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
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/service/BookService.java
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
	
=======

>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/service/BookService.java
	public List<BookGenreVO> getAllGenre() {
		List<BookGenreVO> list = bookDao.selectAllGenre();
		return list;
	}

	public List<BookGenreVO> getSecondGenre(int ge_num) {	
		List<BookGenreVO> list = bookDao.selectAllSecondGenre(ge_num);
		return list;
	}

<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/service/BookService.java
	public List<BookSecondGenreVO> selectSecondGenreList() {
		return bookDao.selectSecondGenre();
=======
	public List<BookVO> getBestSellers() {
		List<BookVO> list = bookDao.selectBestSellers();
		return list;
	}

	public List<BookVO> getNewBooks() {
		List<BookVO> list = bookDao.selectNewBooks();
		return list;
	}

	public BookVO getRandomBook() {
		int max = bookDao.selectMaxBookNum();
		Random random = new Random();
		int rand = random.nextInt(max);
		BookVO book = new BookVO();
		do {
			book = bookDao.selectBook(rand);
		} while(book == null);
		return book;
	}
	
	//책 디테일
	public boolean updateReview(ReviewVO writeUserReview) {
		return bookDao.updateReview(writeUserReview);
	}

	public boolean deleteReview(int bookNum, String id) {
		System.out.println("del : " + bookNum + " " + id);
		return bookDao.deleteReview(bookNum,id);
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/service/BookService.java
	}

	public int insertBook(BookVO book) {
		return bookDao.insertBook(book);
	}

	public boolean insertWriterList(WriterListVO writerListVO) {
		return bookDao.insertWriterList(writerListVO);
	}
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/service/BookService.java
	

	
=======

	public void updateReviewCount(int re_bk_num, char operator) {
		bookDao.updateReviewCount(re_bk_num, operator);
	}

	public void updateReviewScore(int re_bk_num, double re_star, char operator) {
		bookDao.updateReviewScore(re_bk_num, re_star, operator);
	}

	public List<ReviewVO> selectAllMyReview(Criteria cri, String userId) {
		return bookDao.selectAllMyReview(cri, userId);
	}

	public int selectMyReviewCount(String userId) {
		return bookDao.selectMyReviewCount(userId);
	}
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/service/BookService.java
	
}
