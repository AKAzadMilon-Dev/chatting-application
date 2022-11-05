import React from "react";
import Friends from "../../components/Friends";
import Friendsrequest from "../../components/Friendsrequest";
import BlockedUsers from "../../components/BlockedUsers";
import Grouplist from "../../components/Grouplist";
import MyGroups from "../../components/MyGroups";
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
          <Friendsrequest />
        </div>
        <div className="max-w-[344px]">
          <Friends />
          <MyGroups/>
        </div>
        <div className="max-w-[344px]">
          <Userlist />
          <BlockedUsers/>
        </div>
      </div>
    </div>
  );
};

export default Home;
