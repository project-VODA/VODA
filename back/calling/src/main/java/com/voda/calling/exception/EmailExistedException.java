package com.voda.calling.exception;

public class EmailExistedException extends RuntimeException {
    public EmailExistedException(String email){
        super(email + "은 이미 가입되어 있습니다.");
    }
}
