import { HttpStatusCode } from "axios"
import { getAccessToken } from "../apis/user"
import { updateAccessToken } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./reduxHook";
import useLogOut from "./useLogout";

const useErrorHandlers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = useLogOut();

  const errorHandlers = (response: any, callback: any, param?: any) => {
    if(response === undefined){
      navigate('/error');
      return;
    }
    const statusCode = response.status;
    switch(statusCode) {
      case HttpStatusCode.Unauthorized:
        console.log("401 에러당");
        handle401Error(callback, param);
        break;
      case HttpStatusCode.NotFound:
      case HttpStatusCode.MethodNotAllowed:
      case HttpStatusCode.InternalServerError:
      case HttpStatusCode.ServiceUnavailable:
      case HttpStatusCode.GatewayTimeout:
      default:
        console.log("넌 나가라");
        redirectErrorPage();
    }
  };
  
  function handle401Error(callback: any, param?: any) {
    getAccessToken()
    .then((res) => {
      dispatch(updateAccessToken({accessToken: res.accessToken}));
      console.log("새로운 토큰 받아옴");
      callback(param);
    })
    .catch((err) => {
      console.log(err);
      alert("다시 로그인해주세요");
      logout();
    })
  }

  function redirectErrorPage() {
    navigate('/error');
  }

  return errorHandlers;
}

export default useErrorHandlers;

