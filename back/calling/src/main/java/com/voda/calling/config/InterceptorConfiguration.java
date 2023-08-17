package com.voda.calling.config;

import com.voda.calling.interceptor.TokenInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class InterceptorConfiguration implements WebMvcConfigurer {
    private final TokenInterceptor tokenInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(tokenInterceptor)
                .addPathPatterns("/users").addPathPatterns("/users/*")
                .addPathPatterns("/friends").addPathPatterns("/friends/*")
                .addPathPatterns("/emotions")
                .addPathPatterns("/articles").addPathPatterns("/articles/*")
                .addPathPatterns("/comments").addPathPatterns("/comments/*")
                .addPathPatterns("/settings").addPathPatterns("/settings/*")
                .addPathPatterns("/meetings/recentcall")
                .excludePathPatterns("/users/logout")
                .excludePathPatterns("/users/login")
                .excludePathPatterns("/email/*")
                .excludePathPatterns("/users/regist")
                .excludePathPatterns("/meetings/reject/*")
                .excludePathPatterns("/meetings/quit/*")
                .excludePathPatterns("/meetings/receive/*")
                .excludePathPatterns("/meetings/send");
    }
}
