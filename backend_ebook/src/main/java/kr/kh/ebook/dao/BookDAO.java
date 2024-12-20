package kr.kh.ebook.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.pagination.BookPageMaker;
import kr.kh.ebook.pagination.Criteria;
import kr.kh.ebook.pagination.PageMaker;

@Repository
@Mapper
public interface BookDAO {
	//테스트용 
	int count();  
	
	List<BookVO> searchBookList(PageMaker pm);

	List<BookGenreVO> selectAllGenre();

	List<BookGenreVO> selectAllSecondGenre(int ge_num);

	List<BookVO> searchBookList(@Param("pm") BookPageMaker pm); //검색시 사용되는

	ReviewVO selectMyReview(@Param("userId")String userId,@Param("bookNum") int bookNum); //내 리뷰 찾기

	int searchBookCount(@Param("country")String country,@Param("genre")int genre,@Param("search")String search);

	int reviewCount(int bookNum);

	List<ReviewVO> selectReviewList(@Param("bookNum")int bookNum,@Param("pageNum") int pageNum);

	boolean insertReview(@Param("review")ReviewVO review);

	BookListVO selectReadBook(@Param("bookNum")int bookNum, @Param("userId") String userId);

	boolean updateReadBook(BookListVO readBook);

	BookVO selectBook(int bookNum);

	List<BookVO> selectBestSellers();

	List<BookVO> selectNewBooks();

	int selectMaxBookNum();
	
	boolean updateReview(@Param("re")ReviewVO writeUserReview);  //리뷰 업데이트

	void updateReviewCount(int re_bk_num, char operator);

	void updateReviewScore(int re_bk_num, double re_star, char operator);
	
	boolean deleteReview(@Param("bookNum")int bookNum, @Param("id")String id);

	boolean insertBook(@Param("bk")BookVO book);

	boolean insertWriterList(@Param("wr")WriterListVO writerVO);

	List<ReviewVO> selectAllMyReview(@Param("cri")Criteria cri, String userId);

	int selectMyReviewCount(String userId);

	Integer selectBookPage(String userId, int bookNum);

	void deleteBook(int bk_num);

	void deleteWriterList(int bk_num);

	int selectCountBookBuy(String userId);

	void insertBookFiles(String originalFilename, int bk_num, String extension);

	void insertMyBook(String userId, int bookNum);

	List<BookVO> selectMyBook(String userId);

	BookVO bookReviewInfo(@Param("bookNum")int bookNum);
}
