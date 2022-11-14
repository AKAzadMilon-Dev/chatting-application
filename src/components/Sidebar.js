import React from "react";
import { BiHome } from "react-icons/bi";
import { BiMessageRoundedDots } from "react-icons/bi";
import { MdOutlineNotifications, MdOutlineLogout } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ active }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth).then(() => {
      navigate('/login')
    });
  };

  return (
    <div className="w-full bg-primary xl:rounded-[20px] xl:py-9 xl:px-11 overflow-x-hidden flex xl:flex-col p-2.5 xl:p-0 gap-[20px] xl:gap-0 justify-between mb-2.5 xl:mb-0">
      <img
        className=" xl:w-26 xl:h-26 rounded-[50%]   "
        src="assets/images/profileimg.png"
        alt="profileimg"
      />
      <h1 className="font-bold font-nunito text-center text-xl text-white">{auth.currentUser.displayName}</h1>
      <div className="flex xl:flex-col items-center gap-x-6 xl:gap-y-20 xl:mt-20 ">
        <div
          className={`${
            active == "home" &&
            "relative z-10 after:absolute after:top-0 after:right-[-35px] after:bg-[#03506F] after:rounded-l-2xl xl:after:w-[125%] after:h-full text-center flex xl:flex-col items-center after:z-[-1] xl:p-10  before:absolute before:top-0 before:right-[-35px] before:rounded-l-2xl before:bg-primary xl:before:w-[20px] before:h-full before:content-['] before:drop-shadow-md "
          }`}
        >
          <BiHome
            className={`${
              active == "home"
                ? "text-2xl xl:text-4xl text-[#FA7D09]"
                : "text-2xl xl:text-4xl text-white"
            }`}
          />
        </div>
        <div
          className={`${
            active == "message" &&
            "relative z-10 after:absolute after:top-0 after:right-[-35px] after:bg-[#03506F] after:rounded-l-2xl xl:after:w-[125%] after:h-full text-center flex xl:flex-col items-center after:z-[-1] xl:p-10  before:absolute before:top-0 before:right-[-35px] before:rounded-l-2xl before:bg-primary xl:before:w-[20px] before:h-full before:content-['] before:drop-shadow-lg "
          }`}
        >
          <BiMessageRoundedDots
            className={`${
              active == "message"
                ? "text-2xl xl:text-4xl text-[#FA7D09]"
                : "text-2xl xl:text-4xl text-white"
            }`}
          />
        </div>
        <MdOutlineNotifications className="text-2xl xl:text-4xl text-white cursor-pointer" />
        <AiOutlineSetting className="text-2xl xl:text-4xl text-white cursor-pointer" />
        <MdOutlineLogout
          onClick={handleSignout}
          className="text-2xl xl:text-4xl text-white xl:mt-[140px] xl:mb-10 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
