import React from "react";
import { BiHome } from "react-icons/bi";
import { BiMessageRoundedDots } from "react-icons/bi";
import { MdOutlineNotifications, MdOutlineLogout } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

const Sidebar = ({active}) => {
  return (
    <div className="w-full bg-primary rounded-[20px] py-9 px-11 overflow-x-hidden ">
      <img
        className=" w-26 h-26 rounded"
        src="assets/images/profileimg.png"
        alt="profileimg"
      />
      <div className="flex flex-col items-center gap-y-20 mt-24 ">
        <div
          className={`${
            active == "home" &&
            "relative z-10 after:absolute after:top-0 after:right-[-35px] after:bg-[#03506F] after:rounded-l-2xl after:w-[125%] after:h-full text-center flex flex-col items-center after:z-[-1] p-10  before:absolute before:top-0 before:right-[-35px] before:rounded-l-2xl before:bg-primary before:w-[20px] before:h-full before:content-['] before:drop-shadow-md "
          }`}
        >
          <BiHome
            className={`${
              active == "home"
                ? "text-4xl text-[#FA7D09]"
                : "text-4xl text-white"
            }`}
          />
        </div>
        <div
          className={`${
            active == "message" &&
            "relative z-10 after:absolute after:top-0 after:right-[-35px] after:bg-[#03506F] after:rounded-l-2xl after:w-[125%] after:h-full text-center flex flex-col items-center after:z-[-1] p-10  before:absolute before:top-0 before:right-[-35px] before:rounded-l-2xl before:bg-primary before:w-[20px] before:h-full before:content-['] before:drop-shadow-lg "
          }`}
        >
          <BiMessageRoundedDots
            className={`${
              active == "message"
                ? "text-4xl text-[#FA7D09]"
                : "text-4xl text-white"
            }`}
          />
        </div>
        <MdOutlineNotifications className="text-4xl text-white mt-24" />
        <AiOutlineSetting className="text-4xl text-white mt-24" />
        <MdOutlineLogout className="text-4xl text-white mt-[187px] mb-10" />
      </div>
    </div>
  );
};

export default Sidebar;
