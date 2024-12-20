package kr.kh.ebook.service;

import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.kh.ebook.controller.FileUploadController;
import kr.kh.ebook.dao.BookDAO;
import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.pagination.BookPageMaker;
import kr.kh.ebook.pagination.Criteria;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookService {
	private BookDAO bookDao;

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

	public List<BookGenreVO> getAllGenre() {
		List<BookGenreVO> list = bookDao.selectAllGenre();
		return list;
	}

	public List<BookGenreVO> getSecondGenre(int ge_num) {	
		List<BookGenreVO> list = bookDao.selectAllSecondGenre(ge_num);
		return list;
	}

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
		if(max == 0) {
			return null;
		}
		Random random = new Random();
		int rand = random.nextInt(max) + 1;
		BookVO book = new BookVO();
		do {
			book = bookDao.selectBook(rand);
		} while(book == null);
		System.out.println("hi");
		System.out.println(book);
		return book;
	}
	
	//책 디테일
	public boolean updateReview(ReviewVO writeUserReview) {
		return bookDao.updateReview(writeUserReview);
	}

	public boolean deleteReview(int bookNum, String id) {
		System.out.println("del : " + bookNum + " " + id);
		return bookDao.deleteReview(bookNum,id);
	}

	public boolean insertBook(BookVO book) {
		return bookDao.insertBook(book);
	}

	public boolean insertWriterList(WriterListVO writerListVO) {
		return bookDao.insertWriterList(writerListVO);
	}

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

	public int selectCountBookBuy(String userId) {
		return bookDao.selectCountBookBuy(userId);
	}

	public void deleteBook(int bk_num) {
		bookDao.deleteBook(bk_num);
	}

	public void deleteWriterList(int bk_num) {
		bookDao.deleteWriterList(bk_num);
	}

	public Integer selectMyBookPage(String userId, int bookNum) {
		return bookDao.selectBookPage(userId,bookNum);
	}

	public void insertBookFiles(MultipartFile epubFile, MultipartFile imgFile, int bk_num) {
//		bookDao.insertBookFiles(epubFile.getOriginalFilename(), bk_num, FileUploadController.getFileExtension(epubFile.getOriginalFilename()));
//		bookDao.insertBookFiles(imgFile.getOriginalFilename(), bk_num, FileUploadController.getFileExtension(imgFile.getOriginalFilename()));
	}

	public BookVO bookReviewInfo(int bookNum) {
		return bookDao.bookReviewInfo(bookNum);
	}

	public void insertMyBook(String userId, int bookNum) {
		bookDao.insertMyBook(userId, bookNum);
	}

	public List<BookVO> selectMyBook(String userId) {
		return bookDao.selectMyBook(userId);
	}

}
