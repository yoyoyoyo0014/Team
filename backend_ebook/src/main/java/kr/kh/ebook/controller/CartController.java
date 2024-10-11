package kr.kh.ebook.controller;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.dto.BookInCartDTO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.CartVO;
import kr.kh.ebook.service.BookService;
import kr.kh.ebook.service.CartService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
public class CartController {

    private CartService cartService;
    private BookService bookService;	
    
    @GetMapping("/{ca_me_id}")
    public List<BookInCartDTO> getCart(@PathVariable String ca_me_id) {
    	List<CartVO> cart = cartService.getCartByUser(ca_me_id); 
    	List<BookInCartDTO> bookInCart = new ArrayList<>();

	     for (CartVO item : cart) {
	         BookVO book = bookService.getBookByNum(item.getCa_bk_num());
	         bookInCart.add(new BookInCartDTO(item, book)); 
	     }
	
	     return bookInCart;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addCart(@RequestBody CartVO cartVO) {
        boolean addSuccess = cartService.addCart(cartVO.getCa_bk_num(), cartVO.getCa_me_id());
        
        if (addSuccess) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 중복일 경우 409 Conflict 반환
        }
    }

    @PostMapping("/remove/{ca_num}")
    public ResponseEntity<Void> removeCart(@PathVariable int ca_num) {
        cartService.removeCart(ca_num);
        return ResponseEntity.ok().build();
    }
    
}
