package kr.kh.ebook.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.model.vo.WriterTypeVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.BookPageMaker;
import kr.kh.ebook.pagination.PageMaker;

public interface WriterDAO {

	boolean insertWriter(@Param("wr")WriterVO writer);

	boolean insertWriterList(@Param("wl")WriterListVO writerBook);

<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/dao/WriterDAO.java
	List<WriterListVO> selectWriterList(@Param("bookNum")int bookNum);
=======
	List<WriterVO> selectWriterList(int bookNum);
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/dao/WriterDAO.java

	WriterVO selectWriter(@Param("writerNum")int wr_num);

	List<WriterVO> searchWriterList(@Param("search")String search,@Param("page") int page);

	int selectWriterListCount(@Param("search")String search);

	List<WriterTypeVO> selectWriterTypeList();
	
}
