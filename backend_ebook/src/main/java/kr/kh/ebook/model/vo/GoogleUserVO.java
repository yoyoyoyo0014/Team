package kr.kh.ebook.model.vo;

import lombok.Data;

@Data
public class GoogleUserVO {
    private String googleId;   // 구글 사용자 고유 ID
    private String email;      // 구글 계정 이메일
    private String name;       // 구글 계정 사용자 이름
    private String picture;    // 구글 프로필 사진 URL
}
