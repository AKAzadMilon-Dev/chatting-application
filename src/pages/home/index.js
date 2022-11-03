import React from "react";
import Friends from "../../components/Friends";
import Grouplist from "../../components/Grouplist";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import Userlist from "../../components/Userlist";

const Home = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="max-w-[186px]">
          <Sidebar active="home" />
        </div>
        <div className="max-w-[427px]">
          <Search />
          <Grouplist />
        </div>
        <div className="max-w-[344px]">
          <Friends />
        </div>
        <div className="max-w-[344px]">
          <Userlist/>
        </div>
      </div>
    </div>
  );
};

export default Home;
