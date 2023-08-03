import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function SseComponent(){
    const userEmail = useSelector((state:RootState) => {
        return state.user.userInfo.userEmail;
    })
    useEffect(() => {
        if(userEmail == null || userEmail == ''){
            return
        }
        const eventSource = new EventSource(`http://52.78.222.238:8080/voda/subscribe/${userEmail}`);
        eventSource.addEventListener("sse", (event) => {
            console.log(event);
        })
    }, [userEmail]);

    return <div></div>
}