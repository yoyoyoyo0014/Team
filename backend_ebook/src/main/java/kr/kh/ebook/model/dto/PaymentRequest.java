package kr.kh.ebook.model.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private String pg;
    private String pay_method;
    private String merchant_uid;
    private String name;
    private int amount;
    private String buyer_email;
    private String buyer_name;
    private String buyer_tel;
    private String buyer_addr;
    private String buyer_postcode;

    // Getters and Setters
}
