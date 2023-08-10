import { HttpStatusCode } from "axios"
import { getAccessToken, logout } from "../apis/user"
import { useDispatch, useSelector } from "react-redux"
import { updateAccessToken, userSliceLogout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "./reduxHook";

const useErrorHandlers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userEmail = useAppSelector((state) => {
    return state.user.userInfo.userEmail;
  });

  const errorHandlers = (statusCode: number, callback: any, param?: any) => {
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
      logout(userEmail);
      dispatch(userSliceLogout());
      navigate('/');
    })
  }

  function redirectErrorPage() {
    navigate('/error');
  }

  return errorHandlers;
}

export default useErrorHandlers;

