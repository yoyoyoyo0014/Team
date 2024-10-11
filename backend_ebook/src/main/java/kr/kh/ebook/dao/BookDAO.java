package kr.kh.ebook.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.PageMaker;

//https://github.com/st8324/java_240528/blob/main/servlet/servlet2/src/main/java/kr/kh/app/dao/PostMapper.xml
public interface BookDAO {

	int count();  //테스트용 
	
	List<BookVO> searchBookList(PageMaker pm); //검색시 사용되는
	
	BookVO detailSelectBook(int num); //책 클릭 시 
	
	List<WriterVO> detailBookSelectWriter(int num); //num = bookNum

	ReviewVO selectMyReview(@Param("userId")String userId,@Param("bookNum") int bookNum); //내 리뷰 찾기

	int searchBookCount(BookCriteria bookCri);

	int reviewCount(int bookNum);
	

	List<ReviewVO> selectReviewList(@Param("bookNum")int bookNum,@Param("pageNum") int pageNum);

	boolean insertReview(@Param("review")ReviewVO review);

	BookListVO selectReadBook(@Param("bookNum")int bookNum, @Param("userId") String userId);

	boolean updateReadBook(BookListVO readBook);

	BookVO selectBook(int bookNum);

	boolean updateReview(@Param("re")ReviewVO writeUserReview);  //리뷰 업데이트

	boolean deleteReview(@Param("bookNum")int bookNum, @Param("id")String id);
}