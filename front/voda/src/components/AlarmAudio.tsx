import {useEffect, useRef} from 'react'
import alarmSound from '../assets/sounds/alarm.mp3';

export default function AlarmAudio(props: {playing: boolean}){
  const audioRef = useRef(null);

  useEffect(() => {
    console.log("통화 알림음 활성화");
    if(props.playing){
      audioRef.current.play();
    }else{
      audioRef.current.pause();
    }
  }, [props.playing]);

  return (
    <>
      <audio ref={audioRef} src={alarmSound} loop/>
    </>
  )
}