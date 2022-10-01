import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex px-2.5 md:px-0">
      <div className="sml:w-1/2 flex flex-col items-end sml:mr-[69px] mx-auto justify-center ">
        <div className="xl:w-[530px]">
          <h2 className=" font-nunito font-bold md:!text-4xl text-primary sm:text-3xl sm:mt-6 sm:text-center sml:mt-10 md:text-left sml:text-[26px]">
            Login to your account!
          </h2>
          <button
            className=" font-nunito font-semibold text-sm flex flex-row border border-solid rounded-lg items-center py-3 pr-5 md:mt-12 sm:mt-6 mx-auto md:mx-0 "
            type="submit"
          >
            <FcGoogle className="ml-3 mr-1" />
            Login with Google
          </button>
          <div className="flex flex-col">
            <div className="relative">
              <input
                className="w-full border-b border-solid border-primary py-6 md:mt-14 sm:mt-10 outline-none"
                type="email"
                placeholder="Youraddres@email.com"
              />
              <p className="absolute md:top-11 sm:top-6 left-0 bg-white ">Email Addres</p>
            </div>
            <div className="relative">
              <input
                className="w-full border-b border-solid border-primary py-6 md:mt-14 sm:mt-10 outline-none"
                type="password"
                placeholder="Enter your password"
              />
              <p className="absolute md:top-11 sm:top-6 left-0 bg-white">Password</p>
            </div>
          </div>
          <button
            className=" w-full font-nunito font-semibold text-xl text-white md:px-[122px] sml:px-[50px] sm:px-[80px] py-5 bg-btn rounded-lg md:mt-14 sm:mt-10"
            type="submit"
          >
            Login to Continue
          </button>
          <p className="font-nunito font-semibold text-sm text-[#03014C] mt-[36px] mb-16">
            Don’t have an account ? {" "}
            <Link className=" font-bold text-[#EA6C00]" to="/registration">
              Sign up
            </Link>
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
    </div>
  );
};

export default Login;
