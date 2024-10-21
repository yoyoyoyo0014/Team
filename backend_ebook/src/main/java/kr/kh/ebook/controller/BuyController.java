package kr.kh.ebook.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.BuyListVO;
import kr.kh.ebook.model.vo.BuyVO;
import kr.kh.ebook.service.BuyService;

@RestController
@RequestMapping("/buy")
public class BuyController {

    @Autowired
    private BuyService buyService;

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
    public ResponseEntity<Integer> saveBuyInfo(@RequestBody BuyVO buyVO) {
        try {
            // 구매 정보 저장 및 bu_num 반환
            int bu_num = buyService.saveBuyInfo(buyVO);
            return ResponseEntity.ok(bu_num); // bu_num을 반환
        } catch (Exception e) {
            e.printStackTrace(); // 로그 출력
            return ResponseEntity.status(500).body(null); // 오류 발생 시 null 반환
        }
    }

    @PostMapping("list/save")
    public ResponseEntity<String> saveBuyList(@RequestBody BuyListVO buyListVO) {
        try {
            // 구매 정보 저장
            buyService.saveBuyList(buyListVO);
            return ResponseEntity.ok("구매 리스트가 저장되었습니다.");
        } catch (Exception e) {
            e.printStackTrace(); // 로그 출력
            return ResponseEntity.status(500).body("구매 리스트 저장 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    @PostMapping("/checkBuied")
    public ResponseEntity<Boolean> checkBuied(@RequestBody Map<String, Object> request) {
        String me_id = (String) request.get("me_id");
        
        // bk_num을 Object에서 Integer로 변환
        Object bkNumObject = request.get("bk_num");
        int bk_num;
        
        if (bkNumObject instanceof Integer) {
            bk_num = (Integer) bkNumObject;
        } else if (bkNumObject instanceof String) {
            bk_num = Integer.parseInt((String) bkNumObject);
        } else {
            return ResponseEntity.badRequest().body(false); // 잘못된 타입 처리
        }

        boolean isBuied = buyService.isBookAlreadyBuied(me_id, bk_num);
        return ResponseEntity.ok(isBuied);
    }

}
