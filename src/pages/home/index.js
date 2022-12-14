import React, { useEffect, useState } from "react";
import Friends from "../../components/Friends";
import Friendsrequest from "../../components/Friendsrequest";
import BlockedUsers from "../../components/BlockedUsers";
import Grouplist from "../../components/Grouplist";
import MyGroups from "../../components/MyGroups";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import Userlist from "../../components/Userlist";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    } else {
      if(auth.currentUser.emailVerified){
        setVerify(true)
      }
    }
  }, []);
  return (
    <>
      {verify ? (
        <div className="xl:p-4">
          <div className="xl:flex justify-between p-2.5 xl:px-0">
            <div className="xl:w-[186px]">
              <Sidebar active="home" />
            </div>
            <div className="w-full xl:w-[427px] ">
              <Search />
              <Grouplist />
              <Friendsrequest />
            </div>
            <div className="w-full xl:w-[344px] ">
              <Friends />
              <MyGroups />
            </div>
            <div className="w-full xl:w-[344px] ">
              <Userlist />
              <BlockedUsers />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen bg-primary bg-opacity-70 flex justify-center items-center fixed">
          <div className="p-5 bg-white rounded-md">
            <h1 className=" font-nunito font-bold text-xl text-center ">
              Please verify your email
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
