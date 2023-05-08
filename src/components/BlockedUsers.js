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

const BlackedUsers = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [blockuser, setBlockUser] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const blockUsersRef = ref(db, "blockusers");
    onValue(blockUsersRef, (snapshot) => {
      const blockUsersArr = [];
      snapshot.forEach((item) => {
        if (item.val().blockbyid == auth.currentUser.uid) {
          blockUsersArr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          });
        } else {
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

  const handleUnblock = (item) => {
    console.log(item);
    set(push(ref(db, "friends")), {
      sendername: item.sendername,
      senderid: item.senderid,
      receivername: auth.currentUser.displayName,
      receiverid: auth.currentUser.uid,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "blockusers/" + item.id));
    });
  };

  return (
    <div className=" mt-[48px] rounded-xl shadow-md drop-shadow-md xl:w-[344px]">
      <div className="flex items-center justify-between px-3">
        <h1 className="font-nunito text-lg font-semibold">Blocked Users</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {blockuser.map((item) => (
          <div className="mt-5 flex items-center justify-between border-b-2 pb-2.5">
            <img
              className="h-[70px] w-[70px] rounded"
              src="assets/images/user1.png"
              alt="user1"
            />
            <div>
              <h2 className="font-nunito text-[14px] font-semibold ">
                {item.block}
              </h2>
              <p className="font-nunito text-[10px] font-medium text-[#4D4D4D] ">
                Today, 8:56pm
              </p>
            </div>
            <div>
              {!item.blockbyid && (
                <button
                  onClick={() => handleUnblock(item)}
                  className="rounded-md bg-btn px-5 font-nunito text-[20px] font-semibold text-white"
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
