package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.CartDAO;
import kr.kh.ebook.model.vo.CartVO;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartService {
    private final CartDAO cartDao;

    public boolean addCart(int ca_bk_num, String ca_me_id) {
        // 중복 체크
    	ca_me_id = "admin123";
        if (cartDao.existsInCart(ca_bk_num, ca_me_id)) {
            return false; // 이미 카트에 존재하는 경우 false 반환
        }
        return cartDao.addCart(ca_bk_num, ca_me_id); // 카트 추가
    }

    public List<CartVO> getCartByUser(String ca_me_id) {
        return cartDao.selectCartList(ca_me_id);
    }

    public void removeCart(int ca_num) {
        cartDao.removeCart(ca_num); // 카트 삭제
    }

}

