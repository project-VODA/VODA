package com.voda.calling.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;
    private Long expiredMs = 1000 * 60 * 60L;// 토큰 유효기간: 1시간

    // access token 만드는 함수
    public String createAccessToken(String userEmail){
        // payload 내용
        Claims claims = Jwts.claims();
        claims.put("userEmail", userEmail);

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setHeaderParam("typ", "JWT") // 헤더에 타입 명시
                .setClaims(claims) // payload 설정
                .setIssuedAt(new Date(System.currentTimeMillis())) // 토큰 생성 시간
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs)) // 토큰 만료 시간
                .signWith(key, SignatureAlgorithm.HS256)// secretKey를 가지고 서명
                .compact();
    }

    /**
     * 토큰의 Claim 디코딩
     */
    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Claim 에서 userEmail 가져오기
     */
    public String getUserEmailFromToken(String token) {
        String userEmail = String.valueOf(getAllClaims(token).get("userEmail"));
        System.out.println(userEmail);
        return userEmail;
    }

    // refresh token 만드는 함수
    public String createRefreshToken(){

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs * 24 * 7)) // 일주일
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


}
