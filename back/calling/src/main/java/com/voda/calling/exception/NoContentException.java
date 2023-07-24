package com.voda.calling.exception;

public class NoContentException extends RuntimeException{
    public NoContentException(){
        super("존재하지 않는 게시글입니다.");
    }
}
