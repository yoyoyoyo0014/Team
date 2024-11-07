package kr.kh.ebook.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import kr.kh.ebook.dao.BuyDAO;
import kr.kh.ebook.model.vo.BuyListVO;
import kr.kh.ebook.model.vo.BuyVO;

@Service
public class BuyService {

    @Autowired
    private IamportClient iamportClient;
    @Autowired
    private BuyDAO buyDao;
    
    public IamportResponse<Payment> verifyPayment(String impUid) throws Exception {
        // Iamport API를 통해 결제 검증 요청
        return iamportClient.paymentByImpUid(impUid);
    }

    public boolean verifyPaymentAmount(String impUid, int expectedAmount) throws Exception {
        IamportResponse<Payment> paymentResponse = iamportClient.paymentByImpUid(impUid);
        Payment payment = paymentResponse.getResponse();

        // 실제 결제 금액과 예상 금액 비교
        return payment.getAmount().intValue() == expectedAmount;
    }
    
    public int saveBuyInfo(BuyVO buyVO) {
        // 데이터베이스에 구매 정보를 저장
        if (buyVO.getBu_uid() == null || buyVO.getBu_me_id() == null) {
            throw new IllegalArgumentException("구매 정보가 유효하지 않습니다.");
        }
        buyDao.saveBuyInfo(buyVO);
        return buyVO.getBu_num();
    }

	public void saveBuyList(int bu_num, List<BuyListVO> list) {
		if(list == null) return;
		for(BuyListVO tmp : list)
			buyDao.saveBuyList(bu_num, tmp);
	}

	public int selectBuyCount(String bu_me_id) {
		return buyDao.selectBuyCount(bu_me_id);
	}
	
}