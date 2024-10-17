package kr.kh.ebook.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.BuyListVO;

public interface MypageDAO {

	 List<BuyListVO> findBooksByMemberId(@Param("bl_me_id")String me_id);
    }