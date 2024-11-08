package kr.kh.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.dto.BuyDTO;
import kr.kh.ebook.model.vo.BuyListVO;
import kr.kh.ebook.service.AchievenentService;
import kr.kh.ebook.service.BookService;
import kr.kh.ebook.service.BuyService;
import kr.kh.ebook.service.CartService;
import kr.kh.ebook.service.MemberService;

@RestController
@RequestMapping("/buy")
public class BuyController {

    @Autowired
    private BuyService buyService;
    @Autowired
    private AchievenentService achService;
    @Autowired
    private CartService cartService;
    @Autowired
    private BookService bookService;
    @Autowired
    private MemberService memberService;
    
    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestParam String imp_uid, @RequestParam int expectedAmount) {
        try {
            // 결제 금액 검증
            boolean isValidPayment = buyService.verifyPaymentAmount(imp_uid, expectedAmount);
            if (isValidPayment) {
                return ResponseEntity.ok("결제가 유효합니다.");
            } else {
                return ResponseEntity.status(400).body("결제 금액이 일치하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("결제 검증 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    
    @PostMapping("/save")
    public ResponseEntity<String> saveBuyInfo(@RequestBody BuyDTO dto) {
    	try {
            // 구매 정보 저장
            int bu_num = buyService.saveBuyInfo(dto.getBuyVO());
            System.out.println(bu_num);
            buyService.saveBuyList(bu_num, dto.getOrderList());
            if(buyService.selectBuyCount(dto.getBuyVO().getBu_me_id()) == 1) {
            	achService.insertAch(2, dto.getBuyVO().getBu_me_id());
            }
            System.out.println(buyService.selectBuyCount(dto.getBuyVO().getBu_me_id()));
            //책꽂이에 저장
            for(BuyListVO tmp : dto.getOrderList()) {
            	bookService.insertMyBook(tmp.getBl_me_id(), tmp.getBl_bk_num());
            }
            memberService.earnPoint(dto.getBuyVO().getBu_me_id(), dto.getBuyVO().getBu_total());
            cartService.emptyCart(dto.getOrderList());
            return ResponseEntity.ok("구매 정보가 저장되었습니다.");
        } catch (Exception e) {
            e.printStackTrace(); // 로그 출력
            return ResponseEntity.status(500).body("구매 정보 저장 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    
}
