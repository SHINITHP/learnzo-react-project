import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setAuth } from "@/redux/slices/authSlice"; 
import { useRefreshTokenMutation } from "@/services/authApi";

const AuthCheck = () => {
    const dispatch = useDispatch();
    const tokenExpiry = useSelector((state: any) => state.auth.tokenExpiry);
    const [refreshToken] = useRefreshTokenMutation();

    useEffect(() => {
        
        const now = Date.now();
        const timeUntilExpiry = tokenExpiry - now;

        //Refresh token 30 seconds before expiry
        const refreshBuffer = 30 * 1000;
        const refreshTime = timeUntilExpiry - refreshBuffer;

        if(refreshTime > 0){
            const timeout = setTimeout(async() => {
                try {
                    const { data } = await refreshToken().unwrap();
                    dispatch(setAuth({ token: data.token, user: data.user }));
                } catch (error) {
                    dispatch(logout());
                }
            }, refreshTime); 

            return () => clearTimeout(timeout);

        }
    },[tokenExpiry, dispatch, refreshToken])

    return null;

};

export default AuthCheck;
