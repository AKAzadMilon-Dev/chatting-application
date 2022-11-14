import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [forgotPassword, setForgotPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleLogin = () => {
    if (!email) {
      setEmailError("Email is required!");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Valid email is required");
      }
    }

    if (!password) {
      setPasswordError("Password is required!");
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        toast("Login Successfully!");
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode.includes("auth/user-not-found")) {
          setFirebaseError("Email not match!");
        }
        if (errorCode.includes("auth/wrong-password")) {
          setFirebaseError("Wrong-password!");
        }
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, forgotPassword).then(() => {
      toast("Please chack your email!");
      setTimeout(() => {
        setLoading(false);
        setShow(false);
      }, 1000);
    });
  };

  return (
    <div className="flex px-2.5 md:px-0">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="sml:w-1/2 flex flex-col items-end sml:mr-[69px] mx-auto justify-center ">
        <div className="xl:w-[530px]">
          <h2 className=" font-nunito font-bold md:!text-4xl text-primary sm:text-3xl sm:mt-6 sm:text-center sml:mt-10 md:text-left sml:text-[26px]">
            Login to your account!
          </h2>
          <button
            className=" font-nunito font-semibold text-sm flex flex-row border border-solid rounded-lg items-center py-3 pr-5 md:mt-12 sm:mt-6 mx-auto md:mx-0 "
            type="submit"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="ml-3 mr-1" />
            Login with Google
          </button>
          {success && (
            <p className="font-nunito font-normal text-sm text-green-500 pt-3">
              {success}
            </p>
          )}
          <div className="flex flex-col">
            <div className="relative">
              <input
                className="w-full border-b border-solid border-primary py-6 md:mt-14 sm:mt-10 outline-none"
                type="email"
                placeholder="Youraddres@email.com"
                onChange={handleEmail}
              />
              <p className="absolute md:top-11 sm:top-6 left-0 bg-white ">
                Email Addres
              </p>
              {emailError && (
                <p className="font-nunito font-normal text-sm text-red-500 pt-3">
                  {emailError}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className="w-full border-b border-solid border-primary py-6 md:mt-14 sm:mt-10 outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={handlePassword}
              />
              <p className="absolute md:top-11 sm:top-6 left-0 bg-white">
                Password
              </p>
              {passwordError && (
                <p className="font-nunito font-normal text-sm text-red-500 pt-3">
                  {passwordError}
                </p>
              )}
              {showPassword ? (
                <RiEyeLine
                  onClick={handleShowPassword}
                  className="absolute top-[85px] right-[14px]"
                />
              ) : (
                <RiEyeCloseLine
                  onClick={handleShowPassword}
                  className="absolute top-[85px] right-[14px]"
                />
              )}
            </div>
          </div>

          {firebaseError && (
            <p className="font-nunito font-normal text-sm text-red-500 pt-3">
              {firebaseError}
            </p>
          )}

          {loading ? (
            <div className="mt-10 flex justify-center ">
              <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="100"
                visible={true}
              />
            </div>
          ) : (
            <button
              className=" w-full font-nunito font-semibold text-xl text-white md:px-[122px] sml:px-[50px] sm:px-[80px] py-5 bg-btn rounded-lg md:mt-14 sm:mt-10"
              type="submit"
              onClick={handleLogin}
            >
              Login to Continue
            </button>
          )}

          <p className="font-nunito font-semibold text-sm text-[#03014C] mt-[36px]">
            Don’t have an account ?{" "}
            <Link className=" font-bold text-[#EA6C00]" to="/registration">
              Sign up
            </Link>
          </p>
          <p className="font-nunito font-semibold text-sm text-[#03014C] mt-[36px] text-center">
            <button
              onClick={() => setShow(!show)}
              className=" font-bold text-[#EA6C00]"
              to="/forgotpassword"
            >
              Forgot Password?
            </button>
          </p>
        </div>
      </div>
      <div className="sml:w-1/2 hidden sml:block">
        <picture>
          <img
            className="w-full sml:h-full md:!h-screen object-cover"
            src="assets/images/login.webp"
            leading="lazy"
          />
        </picture>
      </div>
      {/* Forgot Password Modal */}
      {show && (
        <div className="w-full h-screen bg-primary flex justify-center items-center fixed">
          <div className="p-5 bg-white rounded-md">
            <h1 className=" font-nunito font-bold text-xl text-center ">
              Forgot Password
            </h1>
            <div>
              <input
                onChange={(e) => setForgotPassword(e.target.value)}
                className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-8 sml:mt-8 outline-none"
                type="email"
                placeholder="Email address"
              />
              <div className="flex justify-between gap-10">
                {loading ? (
                  <div className="mt-10 flex justify-center ">
                    <RotatingLines
                      strokeColor="green"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="100"
                      visible={true}
                    />
                  </div>
                ) : (
                  <button
                    onClick={handleForgotPassword}
                    className=" font-nunito font-semibold text-xl text-white p-3 bg-btn rounded-xl sm:mt-8 sml:mt-10"
                    type="submit"
                  >
                    Change Password
                  </button>
                )}

                <button
                  onClick={() => setShow(false)}
                  className=" font-nunito font-semibold text-xl text-white p-3 bg-[#FF1E1E] rounded-xl sm:mt-8 sml:mt-10"
                  type="submit"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
