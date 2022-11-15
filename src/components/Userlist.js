import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const Userlist = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [userslist, setUserslist] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const arr = [];

      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          arr.push(item.val());
        }
      });
      setUserslist(arr);
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
              <button className="bg-btn p-1 rounded-md" type="submit">
                <AiOutlinePlus className="font-bold text-[15px] text-white " />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userlist;
