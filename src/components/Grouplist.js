import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const Grouplist = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [createGroup, setCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const [groupList, setGroupList] = useState([])

  const handleCreateGroup = ()=>{
    set(push(ref(db, "groups")),{
      groupName: groupName,
      groupTag: groupTag,
      adminName: auth.currentUser.displayName,
      adminid: auth.currentUser.uid
    }).then(()=>{
      setCreateGroup(false)
    })
  }

  useEffect(()=>{
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot)=>{
      const groupArr = []
      snapshot.forEach((item)=>{
        if(item.val().adminid != auth.currentUser.uid){
          groupArr.push(item.val())
        }
      })
      setGroupList(groupArr)
    })
  },[])

  return (
    <div className="xl:w-[427px] rounded-xl mt-11 shadow-md drop-shadow-md  ">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-semibold font-nunito text-lg">Groups List</h1>
        <button
            onClick={()=>setCreateGroup(!createGroup)}
            className="bg-btn px-5 py-2 my-2 rounded-md font-semibold font-nunito text-[20px] text-white hover:bg-primary"
            type="submit"
          >
            {createGroup ? "Go Back" : "Create Group"}
          </button>
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {createGroup ?
        <>
        <input
          className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-5 sml:mt-5 outline-none"
          type="text"
          placeholder="Group Name"
          onChange={(e)=>setGroupName(e.target.value)}
        />
        <input
          className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-5 sml:mt-5 outline-none"
          type="text"
          placeholder="Group Tagline"
          onChange={(e)=>setGroupTag(e.target.value)}
        />
        <button
          className="w-full font-nunito font-semibold text-xl text-white sml:px-[100px] sm:py-3.5 sml:py-3 bg-btn rounded-[86px] sm:mt-5 sml:mt-5 hover:bg-primary"
          type="submit"
          onClick={handleCreateGroup}
          >
          Create Group
          </button>
      </>
      :
      groupList.map((item)=>(
      <div className="flex justify-between mt-5 items-center border-b-2 pb-2.5">
          <img
            className="w-[70px] h-[70px] rounded"
            src="assets/images/friendsreunion.png"
            alt="friendsreunion"
          />
          <div>
            <h2 className="font-semibold font-nunito text-lg ">{item.groupName}</h2>
            <p className="font-medium font-nunito text-sm text-[#4D4D4D] ">{item.groupTag}</p>
            <p className="font-medium font-nunito text-sm text-[#4D4D4D] ">Admin: {item.adminName}</p>
          </div>
          <div>
            <button
              className="bg-btn px-5 rounded-md font-semibold font-nunito text-[20px] text-white hover:bg-primary"
              type="submit"
            >
              Join
            </button>
          </div>
      </div>
      ))
      }
      </div>
    </div>
  );
};

export default Grouplist;
