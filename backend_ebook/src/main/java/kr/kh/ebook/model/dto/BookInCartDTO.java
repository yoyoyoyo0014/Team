package kr.kh.ebook.model.dto;

import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.CartVO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookInCartDTO {
    private CartVO cart;
    private BookVO book; // BookVO 정보를 포함
}