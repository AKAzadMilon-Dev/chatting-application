import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const MyGroups = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [groupList, setGroupList] = useState([])

  useEffect(()=>{
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot)=>{
      const groupArr = []
      snapshot.forEach((item)=>{
        if(item.val().adminid == auth.currentUser.uid){
          groupArr.push(item.val())
        }
      })
      setGroupList(groupArr)
    })
  },[])
  return (
    <div className=" xl:w-[344px] rounded-xl shadow-md drop-shadow-md mt-[48px]">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-semibold font-nunito text-lg ">My Groups</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {groupList.map((item)=>(
        <div className="flex justify-between mt-5 items-center border-b-2 pb-2.5">
          <img
            className="w-[70px] h-[70px] rounded"
            src="assets/images/friendsreunion.png"
            alt="friendsreunion"
          />
          <div>
            <h2 className="font-semibold font-nunito text-[14px] ">{item.groupName}</h2>
            <p className="font-medium font-nunito text-[12px] text-[#4D4D4D] ">
              Dinner?
            </p>
          </div>
          <div className="flex gap-x-2">
            <button
              className="bg-btn px-2 rounded-md font-semibold font-nunito text-[20px] text-white hover:bg-primary"
              type="submit"
            >
              Info
            </button>
            <button
              className="bg-btn px-2 rounded-md font-semibold font-nunito text-[20px] text-white hover:bg-primary"
              type="submit"
            >
              Members
            </button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default MyGroups;
