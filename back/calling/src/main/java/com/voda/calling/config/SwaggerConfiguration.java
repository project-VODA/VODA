package com.voda.calling.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2

public class SwaggerConfiguration {
    //	Swagger-UI 3.x 확인
    //	http://localhost:8080/{your-app-root}/swagger-ui/index.html
    private String version = "V1";
    private String title = "VODA API " + version;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30).consumes(getConsumeContentTypes()).produces(getProduceContentTypes())
                .apiInfo(apiInfo()).groupName(version).select()
                //모든 컨트롤러 다보기
                .apis(RequestHandlerSelectors.basePackage("com.voda"))
                .paths(regex("/.*")).build()
                .useDefaultResponseMessages(false)
                // jwt token 설정
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(bearerAuthScheme()));
    }

    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
//      consumes.add("application/xml;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");
        return consumes;
    }

    private Set<String> getProduceContentTypes() {
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title(title)
                .description("<h3>VODA API Reference for Developers</h3>Swagger를 이용한 VODA API<br>")
                .contact(new Contact("VODA", "https://edu.ssafy.com", "ssafy@ssafy.com"))
                .license("SSAFY License")
                .licenseUrl("https://www.ssafy.com/ksp/jsp/swp/etc/swpPrivacy.jsp")
                .version("1.0").build();
    }

    /**
     *  jst token 설정
     */
    private ApiKey apiKey(){
        return new ApiKey("JWT", "Authorization", "header");
    }

    private HttpAuthenticationScheme bearerAuthScheme(){
        return HttpAuthenticationScheme.JWT_BEARER_BUILDER.name("JWT").build();
    }

    private SecurityContext securityContext(){
        return springfox
                .documentation
                .spi.service
                .contexts
                .SecurityContext
                .builder()
                .securityReferences(defaultAuth()).forPaths(PathSelectors.any()).build();
    }

    List<SecurityReference> defaultAuth(){
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
    }

}
