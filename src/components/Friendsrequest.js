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
        if (item.val().receiverid === auth.currentUser.uid) {
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
    <div className="xl:w-[427px] rounded-xl mt-11 shadow-md drop-shadow-md  ">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-semibold font-nunito text-lg">Friends Request</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {friendrequest.map((item) => (
          <div className="flex justify-between mt-5 items-center border-b-2 pb-2.5">
            <img
              className="w-[70px] h-[70px] rounded"
              src="assets/images/friendsreunion.png"
              alt="friendsreunion"
            />
            <div>
              <h2 className="font-semibold font-nunito text-[14px] ">
                {item.sendername}
              </h2>
              <p className="font-medium font-nunito text-[12px] text-[#4D4D4D] ">
                Dinner?
              </p>
            </div>
            <div>
              <button
                onClick={() => handleAcceptFriends(item)}
                className="bg-btn px-5 rounded-md font-semibold font-nunito text-[20px] text-white"
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
