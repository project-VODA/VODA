package com.voda.calling.exception;

public class PasswordWrongException extends RuntimeException {
    PasswordWrongException(){
        super("비밀번호가 틀렸습니다.");
    }
}