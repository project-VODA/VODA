package com.voda.calling.exception;

public class NotRegisteredException extends RuntimeException{
    public NotRegisteredException(){
        super("등록이 안된 사용자입니다. 회원가입을 진행해주세요");
    }
}
