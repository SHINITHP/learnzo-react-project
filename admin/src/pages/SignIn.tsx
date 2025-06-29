import SignInForm from "@/components/signin-form";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SignIn = () => {
  const token = useSelector((state: any) => state.auth.token);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated && token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-screen h-screen flex">
      <div className="w-full lg:w-1/2 h-full dark:bg-slate-900 flex justify-center items-center">
        <div className="w-[90%] md:w-[80%] lg:w-[65%] h-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-start gap-2 mb-12">
            <h1 className="text-4xl font-bold">Sign In</h1>
            <p className="text-sm text-gray-500 font-medium">
              Enter your email and password to sign in!
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 h-full text-white bg-slate-900 dark:bg-slate-800 justify-center items-center">
        <img src="/grid-01.svg" className="w-full relative" alt="" />
        <div className="absolute flex flex-col items-center justify-center">
          <h1 className="text-3xl xl:text-4xl font-bold">
            Welcome to LearnEase
          </h1>
          <p className="text-gray-500 text-sm xl:text-lg mt-5 w-[85%] xl:w-3/4 text-center">
            Sign in to the LearnEase Admin Dashboard to manage courses, track
            user activity, and oversee site settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
