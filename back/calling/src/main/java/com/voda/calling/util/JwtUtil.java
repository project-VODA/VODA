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
    
    // access token으로부터 user email 추출하는 함수
    public String getUserEmailFromJwt(String accessToken){

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody()
                .get("userEmail", String.class);
    }

}
