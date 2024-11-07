package kr.kh.ebook.dao;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.BuyListVO;
import kr.kh.ebook.model.vo.BuyVO;

public interface BuyDAO {
	int getPaymentAmount(@Param("imp_uid") String imp_uid);

	int saveBuyInfo(BuyVO request);

	void saveBuyList(@Param("bu_num") int bu_num, @Param("bl") BuyListVO buyListVO);

	int selectBuyCount(String bu_me_id);

}
