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
    <div className=" xl:w-[344px] rounded-xl shadow-md drop-shadow-md mt-[90px]">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-semibold font-nunito text-lg">Users List</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {userslist.map((item) => (
          <div className="flex justify-between mt-5 items-center border-b-2 pb-2.5">
            <img className="w-[70px] h-[70px] rounded" src={item.photoURL} />
            <div>
              <h2 className="font-semibold font-nunito text-[14px] ">
                {item.username}
              </h2>
              <p className="font-medium font-nunito text-[10px] text-[#4D4D4D] ">
                {item.email}
              </p>
            </div>
            <div>
              {friendList.includes(item.id + auth.currentUser.uid) ||
              friendList.includes(auth.currentUser.uid + item.id) ? (
                <button
                  className="bg-btn p-[5px] rounded-md font-semibold font-nunito text-[20px] text-white"
                  type="submit"
                >
                  Friends
                </button>
              ) : friend.includes(item.id + auth.currentUser.uid) ||
                friend.includes(auth.currentUser.uid + item.id) ? (
                <button
                  className="bg-btn p-[5px] rounded-md font-semibold font-nunito text-[20px] text-white"
                  type="submit"
                >
                  pending
                </button>
              ) : (
                <button
                  onClick={() => handleFriendRequest(item)}
                  className="bg-btn p-[5px] rounded-md font-semibold font-nunito text-[18px] text-white"
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
