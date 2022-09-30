import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex">
      <div className="w-1/2 flex flex-col items-end md:mr-[69px] mt-16">
        <div>
          <h2 className=" md:w-[530px] font-nunito font-bold text-4xl text-primary">
            Login to your account!
          </h2>
          <button
            className=" font-nunito font-semibold text-sm flex flex-row border border-solid rounded-lg items-center py-3 pr-5 mt-12"
            type="submit"
          >
            <FcGoogle className="ml-3 mr-1" />
            Login with Google
          </button>
          <div className="flex flex-col">
            <div className="relative">
              <input
                className="md:w-full border-b border-solid border-primary py-6 mt-14 outline-none"
                type="email"
                placeholder="Youraddres@email.com"
              />
              <p className="absolute top-11 left-0 bg-white ">Email Addres</p>
            </div>
            <div className="relative">
              <input
                className="md:w-full border-b border-solid border-primary py-6 mt-14 outline-none"
                type="password"
                placeholder="Enter your password"
              />
              <p className="absolute top-11 left-0 bg-white">Password</p>
            </div>
          </div>
          <button
            className=" w-full font-nunito font-semibold text-xl text-white px-[122px] py-5 bg-btn rounded-lg mt-14"
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
      <div className="w-1/2 ">
        <picture>
          <img
            className="w-full h-screen object-cover"
            src="assets/images/login.webp"
            leading="lazy"
          />
        </picture>
      </div>
    </div>
  );
};

export default Login;
