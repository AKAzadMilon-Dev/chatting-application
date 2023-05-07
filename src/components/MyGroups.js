import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push
} from "firebase/database";
import { getAuth } from "firebase/auth";

const MyGroups = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [groupList, setGroupList] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [memberRequest, setMemberRequest] = useState([]);

  useEffect(()=>{
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot)=>{
      const groupArr = []
      snapshot.forEach((item)=>{
        if(item.val().adminid === auth.currentUser.uid){
          groupArr.push({...item.val(),groupid: item.key})
        }
      })
      setGroupList(groupArr)
    })
  },[])

  const handleRequestShow = (item)=>{
    setShowInfo(!showInfo)
    const groupRef = ref(db, "groupjoinrequest");
    onValue(groupRef, (snapshot)=>{
      const groupArr = []
      snapshot.forEach((gitem)=>{
        if(item.adminid === auth.currentUser.uid && item.groupid === gitem.val().groupid){
          groupArr.push({...gitem.val(), key:gitem.key})
        }
      })
      setMemberRequest(groupArr)
    })
  }

  const handleMemberRemove = (item) =>{
    remove(ref(db, "groupjoinrequest/" + item.key))
  }

  const handleMemberAccept = (item)=>{
    set(push(ref(db, "groupaccept")),{
      adminid: item.adminid,
      groupName: item.groupName,
      groupTag: item.groupTag,
      groupid: item.groupid,
      key: item.key,
      userName: item.userName,
      userProfile: item.userProfile,
      userid: item.userid
    }).then(()=>{
      remove(ref(db, "groupjoinrequest/" + item.key))
    })
  }

  return (
    <div className=" xl:w-[344px] rounded-xl shadow-md drop-shadow-md mt-[48px]">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-semibold font-nunito text-lg ">My Groups</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {showInfo ?
        <>
          <button
          onClick={()=>setShowInfo(!showInfo)}
          className="bg-btn px-2 rounded-md font-semibold font-nunito text-[20px] text-white hover:bg-primary"
          type="submit"
        >
          Back
        </button>
          {memberRequest.map((item)=>(
            <div className="flex justify-between mt-5 items-center border-b-2 pb-2.5">
            <img
              className="w-[70px] h-[70px] rounded"
              src={item.userProfile}
              alt="friendsreunion"
            />
            <div>
              <h2 className="font-semibold font-nunito text-[14px] ">{item.userName}</h2>
              <p className="font-medium font-nunito text-[12px] text-[#4D4D4D] ">
                {item.groupTag}
              </p>
            </div>
            <div className="flex gap-x-2">
              <button
                onClick={()=>handleMemberAccept(item)}
                className="bg-btn px-2 rounded-md font-semibold font-nunito text-[20px] text-white hover:bg-primary"
                type="submit"
              >
                Accept
              </button>
              <button
                onClick={()=>handleMemberRemove(item)}
                className="bg-red-500 px-2 rounded-md font-semibold font-nunito text-[20px] text-white hover:bg-primary"
                type="submit"
              >
                Reject
              </button>
            </div>
          </div>
          ))}

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
              <h2 className="font-semibold font-nunito text-[14px] ">{item.groupName}</h2>
              <p className="font-medium font-nunito text-[12px] text-[#4D4D4D] ">
                Dinner?
              </p>
            </div>
            <div className="flex gap-x-2">
              <button
                onClick={()=>handleRequestShow(item)}
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
          ))
        }
        
      </div>
    </div>
  );
};

export default MyGroups;
