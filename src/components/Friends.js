import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      const friendsArr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid === item.val().receiverid ||
          auth.currentUser.uid === item.val().senderid
        ) {
          friendsArr.push({ ...item.val(), key: item.key });
        }
      });
      setFriends(friendsArr);
    });
  }, []);

  const handleBlock = (item)=>{
    console.log(item)
    auth.currentUser.uid === item.senderid
    ?
    set(push(ref(db, "blockusers")), {
      block: item.receivername,
      blockid: item.receiverid,
      blockby: item.sendername,
      blockbyid: item.senderid
    }).then(()=>{
      remove(ref(db, "friends/" + item.key))
    })
    :
    set(push(ref(db, "blockusers")), {
      block: item.sendername,
      blockid: item.senderid,
      blockby: item.receivername,
      blockbyid: item.receiverid
    }).then(()=>{
      remove(ref(db, "friends/" + item.key))
    })
  }

  return (
    <div className=" xl:w-[344px] rounded-xl shadow-md drop-shadow-md mt-[90px]">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-semibold font-nunito text-lg ">Friends List</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>

      <div className="h-[347px] overflow-x-auto px-2.5">
        {friends.map((item) => (
          <div className="flex justify-between mt-5 items-center border-b-2 pb-2.5">
            <img
              className="w-[70px] h-[70px] rounded"
              src="assets/images/friendsreunion.png"
              alt="friendsreunion"
            />
            <div>
              <h2 className="font-semibold font-nunito text-[14px] ">
                {auth.currentUser.uid == item.senderid ? (
                  <h3>{item.receivername}</h3>
                ) : (
                  <h3>{item.sendername}</h3>
                )}
              </h2>
              <p className="font-medium font-nunito text-[12px] text-[#4D4D4D] ">
                Dinner?
              </p>
            </div>
            <div>
              <p className="font-medium font-nunito text-[10px] text-[#4D4D4D] ">
                Today, 8:56pm
              </p>
            </div>
            <div>
              <button
                className="bg-btn px-5 rounded-md font-semibold font-nunito text-[20px] text-white"
                type="submit"
                onClick={()=>handleBlock(item)}
              >
                Block
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
