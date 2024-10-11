package kr.kh.ebook.service;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private IamportClient iamportClient;

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
}
