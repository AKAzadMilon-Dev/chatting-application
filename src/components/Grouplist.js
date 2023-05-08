import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const Grouplist = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [createGroup, setCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const [groupList, setGroupList] = useState([]);

  const handleCreateGroup = () => {
    set(push(ref(db, "groups")), {
      groupName: groupName,
      groupTag: groupTag,
      adminName: auth.currentUser.displayName,
      adminid: auth.currentUser.uid,
    }).then(() => {
      setCreateGroup(false);
    });
  };

  useEffect(() => {
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      const groupArr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid != auth.currentUser.uid) {
          groupArr.push({ ...item.val(), groupid: item.key });
        }
      });
      setGroupList(groupArr);
    });
  }, []);

  const handleGroupJoin = (item) => {
    set(push(ref(db, "groupjoinrequest")), {
      adminid: item.adminid,
      groupid: item.groupid,
      groupName: item.groupName,
      groupTag: item.groupTag,
      userid: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      userProfile: auth.currentUser.photoURL,
    });
    console.log(item);
  };

  return (
    <div className="mt-11 rounded-xl shadow-md drop-shadow-md xl:w-[427px]  ">
      <div className="flex items-center justify-between px-3">
        <h1 className="font-nunito text-lg font-semibold">Groups List</h1>
        <button
          onClick={() => setCreateGroup(!createGroup)}
          className="my-2 rounded-md bg-btn px-5 py-2 font-nunito text-[20px] font-semibold text-white hover:bg-primary"
          type="submit"
        >
          {createGroup ? "Go Back" : "Create Group"}
        </button>
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {createGroup ? (
          <>
            <input
              className="w-full rounded-lg border border-solid border-primary outline-none sm:mt-5 sm:p-3.5 md:py-6 md:px-12 sml:mt-5 sml:p-4"
              type="text"
              placeholder="Group Name"
              onChange={(e) => setGroupName(e.target.value)}
            />
            <input
              className="w-full rounded-lg border border-solid border-primary outline-none sm:mt-5 sm:p-3.5 md:py-6 md:px-12 sml:mt-5 sml:p-4"
              type="text"
              placeholder="Group Tagline"
              onChange={(e) => setGroupTag(e.target.value)}
            />
            <button
              className="w-full rounded-[86px] bg-btn font-nunito text-xl font-semibold text-white hover:bg-primary sm:mt-5 sm:py-3.5 sml:mt-5 sml:px-[100px] sml:py-3"
              type="submit"
              onClick={handleCreateGroup}
            >
              Create Group
            </button>
          </>
        ) : (
          groupList.map((item) => (
            <div className="mt-5 flex items-center justify-between border-b-2 pb-2.5">
              <img
                className="h-[70px] w-[70px] rounded"
                src="assets/images/friendsreunion.png"
                alt="friendsreunion"
              />
              <div>
                <h2 className="font-nunito text-lg font-semibold ">
                  {item.groupName}
                </h2>
                <p className="font-nunito text-sm font-medium text-[#4D4D4D] ">
                  {item.groupTag}
                </p>
                <p className="font-nunito text-sm font-medium text-[#4D4D4D] ">
                  Admin: {item.adminName}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleGroupJoin(item)}
                  className="rounded-md bg-btn px-5 font-nunito text-[20px] font-semibold text-white hover:bg-primary"
                  type="submit"
                >
                  Join
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grouplist;
