package kr.kh.ebook.dao;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.BuyListVO;
import kr.kh.ebook.model.vo.BuyVO;

public interface BuyDAO {
	int getPaymentAmount(@Param("imp_uid") String imp_uid);

	void saveBuyInfo(BuyVO request);

	void saveBuyList(BuyListVO buyListVO);

	int getLastInsertId();

	int checkBookBuied(String me_id, int bk_num);

}
