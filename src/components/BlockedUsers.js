import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

const BlackedUsers = () => {

  const db = getDatabase();
  const auth = getAuth();

  const [blockuser, setBlockUser] = useState([]);

  useEffect(() => {
    const blockUsersRef = ref(db, "blockusers");
    onValue(blockUsersRef, (snapshot) => {
      const blockUsersArr = [];
      snapshot.forEach((item) => {
        if ( item.val().blockbyid == auth.currentUser.uid) {
          blockUsersArr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          });
        }else{
          blockUsersArr.push({
            id: item.key,
            blockby: item.val().blockby,
            blockbyid: item.val().blockbyid,
          });
        }
      });
      setBlockUser(blockUsersArr);
    });
  }, []);

  return (
    <div className=" xl:w-[344px] rounded-xl shadow-md drop-shadow-md mt-[48px]">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-semibold font-nunito text-lg">Blocked Users</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>
        <div className="h-[347px] overflow-x-auto px-2.5">
          {blockuser.map((item)=>(
            <div className="flex justify-between mt-5 items-center border-b-2 pb-2.5">
              <img
                className="w-[70px] h-[70px] rounded"
                src="assets/images/user1.png"
                alt="user1"
              />
              <div>
                <h2 className="font-semibold font-nunito text-[14px] ">{item.block}</h2>
                <p className="font-medium font-nunito text-[10px] text-[#4D4D4D] ">
                  Today, 8:56pm
                </p>
              </div>
              <div>
                {!item.blockbyid && (
                <button
                  className="bg-btn px-5 rounded-md font-semibold font-nunito text-[20px] text-white"
                  type="submit"
                >
                  unblock
                </button>
                )}
              </div>
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default BlackedUsers;
