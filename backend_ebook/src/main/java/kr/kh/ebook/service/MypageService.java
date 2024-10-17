package kr.kh.ebook.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.MypageDAO;
import kr.kh.ebook.model.dto.MemberBookDTO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.BuyListVO;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MypageService {

    private final MypageDAO mypageDAO;
    private final BookService bookService; // BookService 주입

    public List<MemberBookDTO> getMyBooks(String me_id) {
        List<BuyListVO> buyList = mypageDAO.findBooksByMemberId(me_id);
        List<MemberBookDTO> memberBooks = new ArrayList<>();

        for (BuyListVO buy : buyList) {
            BookVO book = bookService.getBookByNum(buy.getBl_bk_num()); // 구매한 책 정보 가져오기
            memberBooks.add(new MemberBookDTO(buy, book));
        }
        
        return memberBooks;
    }
}