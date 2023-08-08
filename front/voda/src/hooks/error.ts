import { HttpStatusCode } from "axios"
import { getAccessToken, logout } from "../apis/user"
import { useDispatch } from "react-redux"
import { updateAccessToken, userSliceLogout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const useErrorHandlers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorHandlers = (statusCode: number, callback: any, param?: any) => {
    switch(statusCode) {
      case HttpStatusCode.Unauthorized:
        console.log("handle 401");
        handle401Error(callback, param);
        break;
      case HttpStatusCode.NotFound:
      case HttpStatusCode.MethodNotAllowed:
      case HttpStatusCode.InternalServerError:
      case HttpStatusCode.ServiceUnavailable:
      case HttpStatusCode.GatewayTimeout:
      default:
        console.log("go to error page");
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
      logout();
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

