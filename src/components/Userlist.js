import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const Userlist = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [userslist, setUserslist] = useState([]);
  const [friend, setFriend] = useState([]);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserslist(arr);
    });
  }, []);

  const handleFriendRequest = (item) => {
    set(push(ref(db, "friendrequest")), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      receivername: item.username,
      receiverid: item.id,
    });
  };

  useEffect(() => {
    const friendsRef = ref(db, "friendrequest/");
    onValue(friendsRef, (snapshot) => {
      const friendsArr = [];
      snapshot.forEach((item) => {
        friendsArr.push(item.val().receiverid + item.val().senderid);
      });
      setFriend(friendsArr);
    });
  }, []);

  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      const friendsArr = [];
      snapshot.forEach((item) => {
        friendsArr.push(item.val().receiverid + item.val().senderid);
      });
      setFriendList(friendsArr);
    });
  }, []);

  return (
    <div className=" mt-[90px] rounded-xl shadow-md drop-shadow-md xl:w-[344px]">
      <div className="flex items-center justify-between px-3">
        <h1 className="font-nunito text-lg font-semibold">Users List</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {userslist.map((item) => (
          <div className="mt-5 flex items-center justify-between border-b-2 pb-2.5">
            <img className="h-[70px] w-[70px] rounded" src={item.photoURL} />
            <div>
              <h2 className="font-nunito text-[14px] font-semibold ">
                {item.username}
              </h2>
              <p className="font-nunito text-[10px] font-medium text-[#4D4D4D] ">
                {item.email}
              </p>
            </div>
            <div>
              {friendList.includes(item.id + auth.currentUser.uid) ||
              friendList.includes(auth.currentUser.uid + item.id) ? (
                <button
                  className="rounded-md bg-btn p-[5px] font-nunito text-[20px] font-semibold text-white"
                  type="submit"
                >
                  Friends
                </button>
              ) : friend.includes(item.id + auth.currentUser.uid) ||
                friend.includes(auth.currentUser.uid + item.id) ? (
                <button
                  className="rounded-md bg-btn p-[5px] font-nunito text-[20px] font-semibold text-white"
                  type="submit"
                >
                  pending
                </button>
              ) : (
                <button
                  onClick={() => handleFriendRequest(item)}
                  className="rounded-md bg-btn p-[5px] font-nunito text-[18px] font-semibold text-white"
                  type="submit"
                >
                  send request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userlist;
