import { HttpStatusCode } from "axios"
import { getAccessToken } from "../user"
import { useDispatch } from "react-redux"
import { updateAccessToken } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export const errorHandlers = (statusCode: number, callback?: any) => {
    switch(statusCode) {
        case HttpStatusCode.Unauthorized: 
        case HttpStatusCode.NotFound:
        case HttpStatusCode.MethodNotAllowed:
        case HttpStatusCode.InternalServerError:
        case HttpStatusCode.ServiceUnavailable:
        case HttpStatusCode.GatewayTimeout:
    }
}

function handle401Error(callback: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    getAccessToken()
    .then((res) => {
        dispatch(updateAccessToken({accessToken: res.accessToken}));
        callback();
    })
    .catch((err) => {
        console.log(err);
        alert("다시 로그인해주세요");
        navigate('/login');
    })
}

function handle404Error() {
    
}