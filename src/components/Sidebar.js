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
    setLoading(true);
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
              setLoading(false);
              setShow(false);
            })
            .catch((error) => {
              console.log("error", error);
            });
        });
      });
    }
  };

  return (
    <div className="mb-2.5 flex w-full justify-between gap-[20px] overflow-x-hidden bg-primary p-2.5 xl:mb-0 xl:flex-col xl:gap-0 xl:rounded-[20px] xl:p-0 xl:py-9 xl:px-11">
      <div className="group relative overflow-hidden xl:h-[96px] xl:w-[96px]">
        <img
          className=" rounded-[50%] xl:h-[96px] xl:w-[96px] "
          src={auth.currentUser.photoURL}
        />
        <div
          className=" absolute bottom-[-5px] right-[30px] flex hidden cursor-pointer items-center justify-center group-hover:flex xl:h-[40px] xl:w-[40px]"
          onClick={handleImageUpload}
        >
          <FaUpload className="text-[25px] text-white" />
        </div>
      </div>
      <h1 className="text-center font-nunito text-xl font-bold text-gray-300">
        {auth.currentUser.displayName}
      </h1>
      <div className="flex items-center gap-x-6 xl:mt-20 xl:flex-col xl:gap-y-20 ">
        <div
          className={`${
            active == "home" &&
            "before:content-['] relative z-10 flex items-center text-center before:absolute before:top-0 before:right-[-35px] before:h-full before:rounded-l-2xl before:bg-primary before:drop-shadow-md after:absolute after:top-0  after:right-[-35px] after:z-[-1] after:h-full after:rounded-l-2xl after:bg-[#03506F] xl:flex-col xl:p-10 xl:before:w-[20px] xl:after:w-[125%] "
          }`}
        >
          <BiHome
            className={`${
              active == "home"
                ? "text-2xl text-[#FA7D09] xl:text-4xl"
                : "text-2xl text-white xl:text-4xl"
            }`}
          />
        </div>
        <div
          className={`${
            active == "message" &&
            "before:content-['] relative z-10 flex items-center text-center before:absolute before:top-0 before:right-[-35px] before:h-full before:rounded-l-2xl before:bg-primary before:drop-shadow-lg after:absolute after:top-0  after:right-[-35px] after:z-[-1] after:h-full after:rounded-l-2xl after:bg-[#03506F] xl:flex-col xl:p-10 xl:before:w-[20px] xl:after:w-[125%] "
          }`}
        >
          <BiMessageRoundedDots
            className={`${
              active == "message"
                ? "text-2xl text-[#FA7D09] xl:text-4xl"
                : "text-2xl text-white xl:text-4xl"
            }`}
          />
        </div>
        <MdOutlineNotifications className="cursor-pointer text-2xl text-white xl:text-4xl" />
        <AiOutlineSetting className="cursor-pointer text-2xl text-white xl:text-4xl" />
        <MdOutlineLogout
          onClick={handleSignout}
          className="cursor-pointer text-2xl text-white xl:mt-[140px] xl:mb-10 xl:text-4xl"
        />
      </div>
      {/* Image Upload modal */}
      {show && (
        <div className="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-primary">
          <div className="rounded-md bg-white p-5">
            <h1 className=" text-center font-nunito text-xl font-bold ">
              Image Upload
            </h1>

            <div>
              {previewimg ? (
                <img
                  className=" mb-5 rounded-[50%] xl:h-[96px] xl:w-[96px] "
                  src={previewimg}
                />
              ) : (
                <img
                  className=" mb-5 rounded-[50%] xl:h-[96px] xl:w-[96px] "
                  src={auth.currentUser.photoURL}
                />
              )}
              <div className="border bg-primary text-center ">
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
                className="w-full rounded-lg border border-solid border-primary outline-none sm:mt-8 sm:p-3.5 md:py-6 md:px-12 sml:mt-8 sml:p-4"
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
                      className=" rounded-xl bg-btn p-3 font-nunito text-xl font-semibold text-white sm:mt-8 sml:mt-10"
                      type="submit"
                      onClick={getCropData}
                    >
                      Upload
                    </button>

                    <button
                      onClick={() => setShow(false)}
                      className=" rounded-xl bg-[#FF1E1E] p-3 font-nunito text-xl font-semibold text-white sm:mt-8 sml:mt-10"
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
