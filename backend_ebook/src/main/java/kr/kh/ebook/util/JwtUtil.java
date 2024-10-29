package kr.kh.ebook.util;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

@Component
public class JwtUtil {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${jwt.secret-key}")
    private String SECRET_KEY;

    // 토큰 생성
    public String generateToken(String userId) {
        System.out.println("generateToken method is called."); // 임시 출력

        if (SECRET_KEY == null || SECRET_KEY.isEmpty()) {
            logger.error("SECRET_KEY is not properly configured.");
            throw new IllegalStateException("SECRET_KEY is not properly configured.");
        }

        long currentTimeMillis = System.currentTimeMillis();
        Date issueDate = new Date(currentTimeMillis);
        Date expirationDate = new Date(currentTimeMillis + 1000 * 60 * 60 * 24);

        String token = Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(issueDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

        logger.info("Generated Token: {}", token); // 최종 생성된 토큰 로그 출력
        return token;
    }


    // 사용자 ID 추출
    public String extractUserId(String token) throws SignatureException {
        try {
            Claims claims = parseToken(token);
            logger.info("Token valid. Extracted user ID: " + claims.getSubject());
            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            logger.warn("Expired JWT token: " + e.getMessage());
            throw new SignatureException("Expired token");
        } catch (SignatureException | MalformedJwtException e) {
            logger.warn("Invalid JWT signature: " + e.getMessage());
            throw new SignatureException("Invalid token signature");
        } catch (Exception e) {
            logger.error("JWT parsing error: " + e.getMessage());
            throw new SignatureException("Invalid token");
        }
    }

    // 토큰 만료 여부 확인
    public boolean isTokenExpired(String token) {
        try {
            Date expiration = extractExpiration(token);
            return expiration.before(new Date());
        } catch (Exception e) {
            logger.error("Error while checking token expiration: " + e.getMessage());
            return true;
        }
    }

    // 토큰 만료 시간 추출
    private Date extractExpiration(String token) {
        return parseToken(token).getExpiration();
    }

    // 토큰 파싱 공통 메서드
    private Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    // 토큰의 유효성 확인
    public boolean validateToken(String token, String userId) {
        try {
            final String extractedUserId = extractUserId(token);
            return (extractedUserId.equals(userId) && !isTokenExpired(token));
        } catch (Exception e) {
            logger.error("Token validation failed: " + e.getMessage());
            return false;
        }
    }
}
