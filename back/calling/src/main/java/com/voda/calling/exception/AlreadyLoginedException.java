package com.voda.calling.exception;

public class AlreadyLoginedException extends RuntimeException {
    public AlreadyLoginedException(){
        super("이미 로그인 했어요");
    }
}
