package kr.kh.ebook.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.CartVO;

public interface CartDAO {
    boolean addCart(@Param("bk_num") int ca_bk_num, @Param("me_id") String ca_me_id);

    List<CartVO> selectCartList(@Param("me_id") String ca_me_id);

    boolean removeCart(@Param("ca_num") int ca_num); // 카트 삭제 메서드
    
    boolean existsInCart(@Param("bk_num") int ca_bk_num, @Param("me_id") String ca_me_id);
}

