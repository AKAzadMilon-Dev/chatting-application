import React, { useState, useRef } from "react";
import { BiHome } from "react-icons/bi";
import { BiMessageRoundedDots } from "react-icons/bi";
import { MdOutlineNotifications, MdOutlineLogout } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { Triangle } from "react-loader-spinner";

const Sidebar = ({ active }) => {
  const auth = getAuth();
  const storage = getStorage();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [img, setImg] = useState("");
  const [imgname, setImgname] = useState("");
  const [previewimg, setPreviewimg] = useState("");
  const [cropper, setCropper] = useState();
  const [loading, setLoading] = useState();

  const cropperRef = useRef(null);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setPreviewimg(cropper.getCroppedCanvas().toDataURL());
  };

  const handleSignout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  const handleImageUpload = () => {
    setShow(!show);
    setImg("");
    setPreviewimg("");
  };

  const handleImageSelect = (e) => {
    setImgname(e.target.files[0].name);

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    setLoading(true)
    const storageRef = ref(storage, imgname);
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toDataURL();
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              setLoading(false)
              setShow(false)
            })
            .catch((error) => {
              console.log("error", error);
            });
        });
      });
    }
  };

  return (
    <div className="w-full bg-primary xl:rounded-[20px] xl:py-9 xl:px-11 overflow-x-hidden flex xl:flex-col p-2.5 xl:p-0 gap-[20px] xl:gap-0 justify-between mb-2.5 xl:mb-0">
      <div className="relative xl:w-[96px] xl:h-[96px] overflow-hidden group">
        <img
          className=" xl:w-[96px] xl:h-[96px] rounded-[50%] "
          src={auth.currentUser.photoURL}
        />
        <div
          className=" xl:w-[40px] xl:h-[40px] cursor-pointer flex justify-center items-center absolute bottom-[-5px] right-[30px] hidden group-hover:flex"
          onClick={handleImageUpload}
        >
          <FaUpload className="text-white text-[25px]" />
        </div>
      </div>
      <h1 className="font-bold font-nunito text-center text-xl text-gray-300">
        {auth.currentUser.displayName}
      </h1>
      <div className="flex xl:flex-col items-center gap-x-6 xl:gap-y-20 xl:mt-20 ">
        <div
          className={`${
            active == "home" &&
            "relative z-10 after:absolute after:top-0 after:right-[-35px] after:bg-[#03506F] after:rounded-l-2xl xl:after:w-[125%] after:h-full text-center flex xl:flex-col items-center after:z-[-1] xl:p-10  before:absolute before:top-0 before:right-[-35px] before:rounded-l-2xl before:bg-primary xl:before:w-[20px] before:h-full before:content-['] before:drop-shadow-md "
          }`}
        >
          <BiHome
            className={`${
              active == "home"
                ? "text-2xl xl:text-4xl text-[#FA7D09]"
                : "text-2xl xl:text-4xl text-white"
            }`}
          />
        </div>
        <div
          className={`${
            active == "message" &&
            "relative z-10 after:absolute after:top-0 after:right-[-35px] after:bg-[#03506F] after:rounded-l-2xl xl:after:w-[125%] after:h-full text-center flex xl:flex-col items-center after:z-[-1] xl:p-10  before:absolute before:top-0 before:right-[-35px] before:rounded-l-2xl before:bg-primary xl:before:w-[20px] before:h-full before:content-['] before:drop-shadow-lg "
          }`}
        >
          <BiMessageRoundedDots
            className={`${
              active == "message"
                ? "text-2xl xl:text-4xl text-[#FA7D09]"
                : "text-2xl xl:text-4xl text-white"
            }`}
          />
        </div>
        <MdOutlineNotifications className="text-2xl xl:text-4xl text-white cursor-pointer" />
        <AiOutlineSetting className="text-2xl xl:text-4xl text-white cursor-pointer" />
        <MdOutlineLogout
          onClick={handleSignout}
          className="text-2xl xl:text-4xl text-white xl:mt-[140px] xl:mb-10 cursor-pointer"
        />
      </div>
      {/* Image Upload modal */}
      {show && (
        <div className="w-full h-screen bg-primary flex justify-center items-center fixed z-[999] top-0 left-0">
          <div className="p-5 bg-white rounded-md">
            <h1 className=" font-nunito font-bold text-xl text-center ">
              Image Upload
            </h1>

            <div>
              {previewimg ? (
                <img
                  className=" xl:w-[96px] xl:h-[96px] rounded-[50%] mb-5 "
                  src={previewimg}
                />
              ) : (
                <img
                  className=" xl:w-[96px] xl:h-[96px] rounded-[50%] mb-5 "
                  src={auth.currentUser.photoURL}
                />
              )}
              <div className="border text-center bg-primary ">
                <Cropper
                  src={img}
                  style={{ height: 250, width: 250 }}
                  // Cropper.js options
                  initialAspectRatio={16 / 9}
                  guides={false}
                  crop={onCrop}
                  ref={cropperRef}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
              </div>
              <input
                className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-8 sml:mt-8 outline-none"
                type="file"
                onChange={handleImageSelect}
              />
              <div className="flex justify-between gap-10">
                {loading ? (
                  <Triangle
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                ) : (
                  <>
                    <button
                      className=" font-nunito font-semibold text-xl text-white p-3 bg-btn rounded-xl sm:mt-8 sml:mt-10"
                      type="submit"
                      onClick={getCropData}
                    >
                      Upload
                    </button>

                    <button
                      onClick={() => setShow(false)}
                      className=" font-nunito font-semibold text-xl text-white p-3 bg-[#FF1E1E] rounded-xl sm:mt-8 sml:mt-10"
                      type="submit"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
