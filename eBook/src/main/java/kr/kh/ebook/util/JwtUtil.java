package kr.kh.ebook.util;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

	// application.properties에서 가져온 SECRET_KEY
    @Value("${jwt.secret-key}")
    private String SECRET_KEY; // 토큰 서명에 사용할 비밀 키

    // 토큰 생성 메서드
    public String generateToken(String userId) {
        long currentTimeMillis = System.currentTimeMillis();
        Date issueDate = new Date(currentTimeMillis);
        Date expirationDate = new Date(currentTimeMillis + 1000 * 60 * 60 * 24); // 토큰 만료 시간 (24시간)

        return Jwts.builder()
                .setSubject(userId) // 사용자 식별자
                .setIssuedAt(issueDate) // 발급 시간
                .setExpiration(expirationDate) // 만료 시간
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // 서명 알고리즘 및 비밀 키
                .compact();
    }

    // 토큰에서 사용자 ID 추출
    public String extractUserId(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 토큰 만료 여부 확인
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    // 토큰의 유효성 확인
    public boolean validateToken(String token, String userId) {
        final String extractedUserId = extractUserId(token);
        return (extractedUserId.equals(userId) && !isTokenExpired(token));
    }
}
