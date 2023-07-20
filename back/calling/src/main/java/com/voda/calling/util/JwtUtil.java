package com.voda.calling.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    public String createToken(String userEmail, String secretKey, long expiredMs){
        // payload 내용
        Claims claims = Jwts.claims();
        claims.put("userEmail", userEmail);

        // key 생성
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis())) // 토큰 생성 시간
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs)) // 토큰 만료 시간
                .signWith(key, SignatureAlgorithm.HS256)// secretKey를 가지고 서명
                .compact();
    }
}
