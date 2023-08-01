package com.voda.calling.interceptor;

import com.voda.calling.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
@Slf4j
public class TokenInterceptor implements HandlerInterceptor {
    private final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        try{
            String token = jwtUtil.extractTokenFromHeader(request.getHeader("Authorization"));
            if(token != null && jwtUtil.validateToken(token)){
                return true;
            }else{
                log.info("intercept 성공");
                request.getRequestDispatcher("/errors/unauthorized").forward(request, response);
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
