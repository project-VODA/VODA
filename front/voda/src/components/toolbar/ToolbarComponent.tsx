import { useNavigate } from "react-router-dom";
import ToolbarComponentClass from "./ToolbarComponentClass";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../apis/user";
import useErrorHandlers from "../../hooks/useError";

export default function ToolbarComponent(props:any){
  const navigate = useNavigate();
  const [handicap, setHandicap] = useState(false);
  const errorHandlers = useErrorHandlers();

  useEffect(() => {
    handleHandicap();
  }, [])

  const handleHandicap = () => {
    getUserInfo()
    .then((res) => {
      setHandicap(res.userHandicap == 1 ? true : false);
    })
    .catch((err) => {
      errorHandlers(err.response, handleHandicap);
    })
  }

  return <ToolbarComponentClass
  navigate={navigate}
  handicap = {handicap}
  tabIndex = {props.tabIndex}
  sessionId={props.sessionId}
  user={props.user}
  camStatusChanged={props.camStatusChanged}
  micStatusChanged={props.micStatusChanged}
  toggleFullscreen={props.toggleFullscreen}
  switchCamera={props.switchCamera}
  leaveSession={props.leaveSession}  
  hearExpression={props.hearExpression}
  sendExpression={props.sendExpression}
  />
}