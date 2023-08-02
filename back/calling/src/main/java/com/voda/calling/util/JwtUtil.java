package com.voda.calling.util;

import com.voda.calling.model.dto.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
@Slf4j
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;
    private Long expiredMs = 1000 * 60 * 60L;// 토큰 유효기간: 1시간

    /**
     * user정보를 담고있는 accessToken 발행하기
     *
     * @param user
     * @return accessToken
     */
    public String createAccessToken(User user){
        // payload 내용
        Claims claims = Jwts.claims();
        claims.put("userEmail", user.getUserEmail());
        claims.put("userName", user.getUserName());
        claims.put("userHandicap", user.getUserHandicap());
        claims.put("role", user.getRole());

        return Jwts.builder()
                .setHeaderParam("typ", "JWT") // 헤더에 타입 명시
                .setClaims(claims) // payload 설정
                .setIssuedAt(new Date(System.currentTimeMillis())) // 토큰 생성 시간
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs)) // 토큰 만료 시간
                .signWith(getKey(), SignatureAlgorithm.HS256)// secretKey를 가지고 서명
                .compact();
    }

    /**
     * refresh token 발행하기
     *
     * @return refreshToken
     */
    public String createRefreshToken(){

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs * 24 * 7)) // 일주일
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     *
     * @param token
     * @return 유효한 token일 경우 : true / 잘못된 token일 경우 : false
     */
    public boolean validateToken(String token) {
        try{
            Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token);
            return true;
        }catch (Exception e){
            log.info("invalid token");
        }
        return false;
    }

    /**
     * Claim 에서 userEmail 가져오기
     */
    public String getUserEmailFromToken(String bearer) {
        String token = extractTokenFromHeader(bearer);
        if(token == null) return null;
        String userEmail = String.valueOf(getAllClaims(token).get("userEmail"));
        return userEmail;
    }

    /**
     * request header에서 token을 추출하는 함수
     *
     * @param bearer
     * @return token
     */
    public String extractTokenFromHeader(String bearer){
        if(bearer != null && bearer.startsWith("Bearer")){
            return bearer.split(" ")[1];
        }
        return null;
    }

    /**
     * 토큰의 Claim 디코딩
     */
    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 지정한 secretKey를 가지고 서명에 사용할 Key 생성
     * 
     * @return Key
     */
    private Key getKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

}
