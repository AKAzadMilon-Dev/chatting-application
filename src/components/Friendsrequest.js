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

const Friendsrequist = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [friendrequest, setFriendrequest] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");
    onValue(usersRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid == auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendrequest(arr);
    });
  }, []);

  const handleAcceptFriends = (item) => {
    set(push(ref(db, "friends/")), {
      id: item.id,
      sendername: item.sendername,
      senderid: item.senderid,
      receivername: item.receivername,
      receiverid: item.receiverid,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id));
    });
  };

  return (
    <div className="mt-11 rounded-xl shadow-md drop-shadow-md xl:w-[427px]  ">
      <div className="flex items-center justify-between px-3">
        <h1 className="font-nunito text-lg font-semibold">Friends Request</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {friendrequest.map((item) => (
          <div className="mt-5 flex items-center justify-between border-b-2 pb-2.5">
            <img
              className="h-[70px] w-[70px] rounded"
              src="assets/images/friendsreunion.png"
              alt="friendsreunion"
            />
            <div>
              <h2 className="font-nunito text-[14px] font-semibold ">
                {item.sendername}
              </h2>
              <p className="font-nunito text-[12px] font-medium text-[#4D4D4D] ">
                Dinner?
              </p>
            </div>
            <div>
              <button
                onClick={() => handleAcceptFriends(item)}
                className="rounded-md bg-btn px-5 font-nunito text-[20px] font-semibold text-white"
                type="submit"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friendsrequist;
