import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="flex px-2.5 md:px-0">
      <div className="sml:w-1/2 flex flex-col items-end sml:mr-[69px] justify-center ">
        <div className="xl:w-[530px]">
          <h2 className="font-nunito font-bold sml:text-[18px] sm:text-center sm:mt-3.5 md:text-left text-4xl text-primary">
            Get started with easily register
          </h2>
          <p className="font-nunito font-normal sm:text-center sml:text-center md:!text-left sm:mt-2 sm:text-sm sml:text-sm md:text-xl text-primary md:mt-3 sml-mt-14">
            Free register and you can enjoy it
          </p>
          <div className="flex flex-col">
            <div className="relative">
              <input
                className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-8 sml:mt-8 outline-none"
                type="email"
              />
              <p className="absolute sm:top-5 sml:top-5 left-9 bg-white px-4">
                Email Addres
              </p>
            </div>
            <div className="relative">
              <input
                className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-8 sml:mt-14 outline-none"
                type="email"
              />
              <p className="absolute sm:top-5 sml:top-11 left-9 bg-white px-4">
                Full Name
              </p>
            </div>
            <div className="relative">
              <input
                className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-8 sml:mt-14 outline-none"
                type="email"
              />
              <p className="absolute sm:top-5 sml:top-11 left-9 bg-white px-4">
                Password
              </p>
            </div>
          </div>
          <button
            className="w-full font-nunito font-semibold text-xl text-white sml:px-[100px] sm:py-3.5 sml:py-5 bg-btn rounded-[86px] sm:mt-8 sml:mt-10"
            type="submit"
          >
            Sign up
          </button>
          <p className="font-nunito font-semibold text-sm flex justify-center text-[#03014C] my-[36px]">
            Already have an account ?{" "}
            <Link className=" font-bold text-[#EA6C00]" to="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="sml:w-1/2 hidden sml:block ">
        <picture>
          <img
            className="w-full sml:h-full md:!h-screen object-cover"
            src="assets/images/registration.webp"
            leading="lazy"
          />
        </picture>
      </div>
    </div>
  );
};

export default Registration;
