import { useNavigate } from "react-router-dom";
import { logout } from "../apis/user";
import { userSliceLogout } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "./reduxHook";



const useLogOut = () => {
  const userEmail = useAppSelector((state) => state.user.userInfo.userEmail);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const afterLogout = () => {
    dispatch(userSliceLogout());
    // landing page로 이동
    navigate('/');
  }

  const performLogout = () => {
    logout(userEmail)
      .then(afterLogout)
      .catch(afterLogout);
  }

  return performLogout;
}

export default useLogOut;