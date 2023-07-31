package com.voda.calling.exception;

public class AlarmFailedException extends RuntimeException{
    public AlarmFailedException(){
        super("알림 실패");
    }
}
