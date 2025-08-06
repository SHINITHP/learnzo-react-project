// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { logout, setAuth } from "@/redux/slices/authSlice"; 
// // import { useRefreshTokenMutation } from "@/services/authApi";

// // const AuthCheck = () => {
// //     const dispatch = useDispatch();
// //     const tokenExpiry = useSelector((state: any) => state.auth.tokenExpiry);
// //     const [refreshToken] = useRefreshTokenMutation();

// //     useEffect(() => {
        
// //         const now = Date.now();
// //         const timeUntilExpiry = tokenExpiry - now;

// //         //Refresh token 30 seconds before expiry
// //         const refreshBuffer = 30 * 1000;
// //         const refreshTime = timeUntilExpiry - refreshBuffer;

// //         if(refreshTime > 0){
// //             const timeout = setTimeout(async() => {
// //                 try {
// //                     const { data } = await refreshToken().unwrap();
// //                     dispatch(setAuth({ token: data.token, admin: data.admin }));
// //                 } catch (error) {
// //                     dispatch(logout());
// //                 }
// //             }, refreshTime); 

// //             return () => clearTimeout(timeout);

// //         }
// //     },[tokenExpiry, dispatch, refreshToken])

// //     return null;

// // };

// // export default AuthCheck;
// // hooks/useAuth.ts
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { authApi } from "@/services/authApi";
// import { logout } from "@/redux/slices/authSlice";

// export const useAuth = () => {
//   const dispatch = useDispatch();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading

//   const [triggerRefresh] = authApi.endpoints.refreshToken.useLazyQuery();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const result = await triggerRefresh().unwrap();
//         dispatch(setAccessToken(result.accessToken));
//         setIsAuthenticated(true);
//       } catch (err) {
//         dispatch(clearAuth());
//         setIsAuthenticated(false);
//       }
//     };

//     checkAuth();
//   }, [dispatch, triggerRefresh]);

//   return { isAuthenticated };
// };
