package kr.kh.ebook.service;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.BookDAO;
import kr.kh.ebook.model.vo.BookVO;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookService {
    private final BookDAO bookDao; // BookDAO는 데이터베이스 접근을 위한 인터페이스입니다.

    public BookVO getBookByNum(int bk_num) {
        return bookDao.findByNum(bk_num); // findById 메서드는 데이터베이스에서 책 정보를 가져오는 메서드입니다.
    }
}

