import { HttpStatusCode } from "axios"
import { getAccessToken, logout } from "../apis/user"
import { useDispatch, useSelector } from "react-redux"
import { updateAccessToken, userSliceLogout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const useErrorHandlers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state:RootState) => {
    return state.user.userInfo.userEmail;
  })

  const errorHandlers = (statusCode: number, callback: any, param?: any) => {
    switch(statusCode) {
      case HttpStatusCode.Unauthorized:
        handle401Error(callback, param);
        break;
      case HttpStatusCode.NotFound:
      case HttpStatusCode.MethodNotAllowed:
      case HttpStatusCode.InternalServerError:
      case HttpStatusCode.ServiceUnavailable:
      case HttpStatusCode.GatewayTimeout:
      default:
        redirectErrorPage();
    }
  };
  
  function handle401Error(callback: any, param?: any) {
    getAccessToken()
    .then((res) => {
      dispatch(updateAccessToken({accessToken: res.accessToken}));
      callback(param);
    })
    .catch((err) => {
      console.log(err);
      alert("다시 로그인해주세요");
      logout(userEmail);
      dispatch(userSliceLogout());
      navigate('/login');
    })
  }

  function redirectErrorPage() {
    navigate('/error');
  }

  return errorHandlers;
}

export default useErrorHandlers;

