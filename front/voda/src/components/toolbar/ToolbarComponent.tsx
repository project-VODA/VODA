import { useNavigate } from "react-router-dom";
import ToolbarComponentClass from "./ToolbarComponentClass";

export default function ToolbarComponent(props:any){
  const navigate = useNavigate();

  return <ToolbarComponentClass
  navigate={navigate}
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