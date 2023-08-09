import { useNavigate } from "react-router-dom";
import ToolbarComponentClass from "./ToolbarComponentClass";

export default function ToolbarComponent(props:any){
  const navigate = useNavigate();

  return <ToolbarComponentClass props={props} navigate={navigate}/>
}