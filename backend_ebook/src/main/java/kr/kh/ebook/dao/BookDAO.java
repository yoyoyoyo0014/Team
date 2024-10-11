package kr.kh.ebook.dao;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.BookVO;

public interface BookDAO {
	public BookVO findByNum(@Param("bk_num")int bk_num);
}
