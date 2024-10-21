package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.BookDAO;
import kr.kh.ebook.dao.WriterDAO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.model.vo.WriterTypeVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.BookPageMaker;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class WriterService {
	private WriterDAO writerDao;

	public boolean insertWriter(WriterVO writer) {
		boolean res = writerDao.insertWriter(writer);
		return res;
	}

	public boolean insertWriterList(WriterListVO writerBook) {
		boolean res = writerDao.insertWriterList(writerBook);
		return res;
	}

	public List<WriterListVO> selectWriterList(int bookNum) {
		List<WriterListVO> res = writerDao.selectWriterList(bookNum);
		return res;
	}

	public WriterVO selectWriter(int wr_num) {
		return writerDao.selectWriter(wr_num);
	}

	public List<WriterVO> searchWriterList(String search, int page) {
		return writerDao.searchWriterList(search,page);
	}

	public int searchWriterListCount(String search) {
		return writerDao.selectWriterListCount(search);
	}

	public List<WriterTypeVO> selectWriterTypeList() {
		return writerDao.selectWriterTypeList();
	}

	

	

	
	
}
