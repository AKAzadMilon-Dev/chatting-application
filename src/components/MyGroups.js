import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const MyGroups = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [groupList, setGroupList] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showList, setShowList] = useState(false);
  const [memberRequest, setMemberRequest] = useState([]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      const groupArr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid == auth.currentUser.uid) {
          groupArr.push({ ...item.val(), groupid: item.key });
        }
      });
      setGroupList(groupArr);
    });
  }, []);

  const handleRequestShow = (item) => {
    setShowInfo(!showInfo);
    const groupRef = ref(db, "groupjoinrequest");
    onValue(groupRef, (snapshot) => {
      const groupArr = [];
      snapshot.forEach((gitem) => {
        if (
          item.adminid == auth.currentUser.uid &&
          item.groupid == gitem.val().groupid
        ) {
          groupArr.push({ ...gitem.val(), key: gitem.key });
        }
      });
      setMemberRequest(groupArr);
    });
  };

  const handleMemberRemove = (item) => {
    remove(ref(db, "groupjoinrequest/" + item.key));
  };

  const handleMemberAccept = (item) => {
    set(push(ref(db, "groupmember")), {
      adminid: item.adminid,
      groupName: item.groupName,
      groupTag: item.groupTag,
      groupid: item.groupid,
      key: item.key,
      userName: item.userName,
      userProfile: item.userProfile,
      userid: item.userid,
    }).then(() => {
      remove(ref(db, "groupjoinrequest/" + item.key));
    });
  };

  const handleGroupMember = (id) => {
    setShowList(true);
    const groupMemRef = ref(db, "groupmember");
    onValue(groupMemRef, (snapshot) => {
      const groupmemArr = [];
      snapshot.forEach((item) => {
        if (id.groupid == item.val().groupid) {
          groupmemArr.push(item.val());
        }
        setMemberList(groupmemArr);
      });
    });
  };

  const handleRemove = (item) => {
    console.log(item.adminid)
    remove(ref(db, "groupmember/" + item.adminid));
  };

  return (
    <div className=" mt-[48px] rounded-xl shadow-md drop-shadow-md xl:w-[344px]">
      <div className="flex items-center justify-between px-3">
        <h1 className="font-nunito text-lg font-semibold ">My Groups</h1>
        <BiDotsVerticalRounded className="text-lg" />
      </div>
      <div className="h-[347px] overflow-x-auto px-2.5">
        {showInfo ? (
          <>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="rounded-md bg-btn px-2 font-nunito text-[20px] font-semibold text-white hover:bg-primary"
              type="submit"
            >
              Back
            </button>
            {memberRequest.map((item) => (
              <div className="mt-5 flex items-center justify-between border-b-2 pb-2.5">
                <img
                  className="h-[70px] w-[70px] rounded"
                  src={item.userProfile}
                  alt="friendsreunion"
                />
                <div>
                  <h2 className="font-nunito text-[14px] font-semibold ">
                    {item.userName}
                  </h2>
                  <p className="font-nunito text-[12px] font-medium text-[#4D4D4D] ">
                    {item.groupTag}
                  </p>
                </div>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => handleMemberAccept(item)}
                    className="rounded-md bg-btn px-2 font-nunito text-[20px] font-semibold text-white hover:bg-primary"
                    type="submit"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleMemberRemove(item)}
                    className="rounded-md bg-red-500 px-2 font-nunito text-[20px] font-semibold text-white hover:bg-primary"
                    type="submit"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : showList ? (
          <>
            <button
              onClick={() => setShowList(false)}
              className="rounded-md bg-btn px-2 font-nunito text-[20px] font-semibold text-white hover:bg-primary"
              type="submit"
            >
              Back
            </button>
            {memberList.map((item) => (
              <div className="mt-5 flex items-center justify-between border-b-2 pb-2.5">
                <img
                  className="h-[70px] w-[70px] rounded"
                  src={item.userProfile}
                  alt="friendsreunion"
                />
                <div>
                  <h2 className="font-nunito text-[14px] font-semibold ">
                    {item.userName}
                  </h2>
                  <p className="font-nunito text-[12px] font-medium text-[#4D4D4D] ">
                    {item.groupTag}
                  </p>
                </div>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => handleRemove(item)}
                    className="rounded-md bg-red-500 px-2 font-nunito text-[20px] font-semibold text-white hover:bg-primary"
                    type="submit"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
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
                <h2 className="font-nunito text-[14px] font-semibold ">
                  {item.groupName}
                </h2>
                <p className="font-nunito text-[12px] font-medium text-[#4D4D4D] ">
                  Dinner?
                </p>
              </div>
              <div className="flex gap-x-2">
                <button
                  onClick={() => handleRequestShow(item)}
                  className="rounded-md bg-btn px-2 font-nunito text-[20px] font-semibold text-white hover:bg-primary"
                  type="submit"
                >
                  Info
                </button>
                <button
                  onClick={() => handleGroupMember(item)}
                  className="rounded-md bg-btn px-2 font-nunito text-[20px] font-semibold text-white hover:bg-primary"
                  type="submit"
                >
                  Members
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyGroups;
