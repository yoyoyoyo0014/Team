package kr.kh.ebook.controller;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.CartVO;
import kr.kh.ebook.service.CartService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
public class CartController {

    private CartService cartService;	
    
    @GetMapping("/{ca_me_id}")
    public List<CartVO> getCart(@PathVariable String ca_me_id) {
		List<CartVO> cart = cartService.getCartByUser(ca_me_id); 
	    return cart;
    }

    @PostMapping("/add")
    public HashMap<String, Object> addCart(@RequestBody CartVO cartVO) {
    	System.out.println(cartVO);
    	boolean addSuccess = cartService.addCart(cartVO.getCa_bk_num(), cartVO.getCa_me_id());
        
        HashMap<String, Object> map = new HashMap<String, Object>();
		
        if (addSuccess) map.put("res", true);
        else map.put("res", false);
        
        return map;
    }

    @PostMapping("/remove/{ca_num}")
    public ResponseEntity<Void> removeCart(@PathVariable int ca_num) {
        cartService.removeCart(ca_num);
        return ResponseEntity.ok().build();
    }
    
}
