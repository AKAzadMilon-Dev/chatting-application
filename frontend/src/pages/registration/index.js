import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="flex">
      <div className="w-1/2 flex flex-col items-end md:mr-[69px] mt-10">
        <div>
          <h2 className=" md:w-[530px] font-nunito font-bold text-4xl text-primary">
            Get started with easily register
          </h2>
          <p className="font-nunito font-normal text-xl text-primary md:mt-3">
            Free register and you can enjoy it
          </p>
          <div className="flex flex-col">
            <div className="relative">
              <input
                className="md:w-full border border-solid border-primary rounded-lg py-6 px-12 mt-14 outline-none"
                type="email"
              />
              <p className="absolute top-11 left-9 bg-white px-4">
                Email Addres
              </p>
            </div>
            <div className="relative">
              <input
                className="md:w-full border border-solid border-primary rounded-lg py-6 px-12 mt-14 outline-none"
                type="text"
              />
              <p className="absolute top-11 left-9 bg-white px-4">Full name</p>
            </div>
            <div className="relative">
              <input
                className="md:w-full border border-solid border-primary rounded-lg py-6 px-12 mt-14 outline-none"
                type="password"
              />
              <p className="absolute top-11 left-9 bg-white px-4">Password</p>
            </div>
          </div>
          <button
            className=" w-full font-nunito font-semibold text-xl text-white px-[150px] py-5 bg-btn rounded-[86px] mt-14"
            type="submit"
          >
            Sign up
          </button>
          <p className="font-nunito font-semibold text-sm flex justify-center text-[#03014C] mt-[36px] mb-10">
            Already have an account ?{" "}
            <Link className=" font-bold text-[#EA6C00]" to="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="w-1/2 ">
        <picture>
          <img
            className="w-full h-screen object-cover"
            src="assets/images/registration.webp"
            leading="lazy"
          />
        </picture>
      </div>
    </div>
  );
};

export default Registration;
