package kr.kh.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.service.PaymentService;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestParam String imp_uid, @RequestParam int expectedAmount) {
        try {
            // 결제 금액 검증
            boolean isValidPayment = paymentService.verifyPaymentAmount(imp_uid, expectedAmount);
            if (isValidPayment) {
            	
                return ResponseEntity.ok("결제가 유효합니다.");
            } else {
                return ResponseEntity.status(400).body("결제 금액이 일치하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("결제 검증 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
