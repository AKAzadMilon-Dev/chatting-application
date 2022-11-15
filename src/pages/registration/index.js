import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSignup = () => {
    if (!fullName) {
      setFullNameError("Full Name is required!");
    } else {
      if (fullName.length <= 3) {
        setFullNameError("Full Name must be 4 character");
      }
    }

    if (!email) {
      setEmailError("Email is required!");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Valid email is required");
      }
    }

    if (!password) {
      setPasswordError("Password is required!");
    } else {
      if (/^(?=.*\s)/.test(password)) {
        setPasswordError("Password must not contain Whitespaces.");
      }
      if (!/^(?=.*[A-Z])/.test(password)) {
        setPasswordError(
          "Password must have at least one Uppercase Character."
        );
      }
      if (!/^(?=.*[a-z])/.test(password)) {
        setPasswordError(
          "Password must have at least one Lowercase Character."
        );
      }
      if (!/^(?=.*[0-9])/.test(password)) {
        setPasswordError("Password must contain at least one Digit.");
      }
      if (!/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/.test(password)) {
        setPasswordError("Password must contain at least one Special Symbol.");
      }
      if (!/^.{8,16}$/.test(password)) {
        setPasswordError("Password must be 8-16 Characters Long.");
      }
    }
    if (
      fullName &&
      email &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      !/^(?=.*\s)/.test(password) &&
      /^(?=.*[A-Z])/.test(password) &&
      /^(?=.*[a-z])/.test(password) &&
      /^(?=.*[0-9])/.test(password) &&
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/.test(password) &&
      /^.{8,16}$/.test(password)
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: "assets/images/profile.png",
          })
            .then(() => {
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  setLoading(false);
                  toast(
                    "Registration Successfully!. Please Varify your email!."
                  );
                })
                .then(() => {
                  set(ref(db, "users/" + user.user.uid), {
                    username: user.user.displayName,
                    email: user.user.email,
                    photoURL: user.user.photoURL,
                  });
                })
                .then(() => {
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseError("This email already in used");
          }
        });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex px-2.5 md:px-0">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="sml:w-1/2 flex flex-col items-end sml:mr-[69px] justify-center ">
        <div className="xl:w-[530px]">
          <h2 className="font-nunito font-bold sml:text-[18px] sm:text-center sm:mt-3.5 md:text-left text-4xl text-primary">
            Get started with easily register
          </h2>
          <p className="font-nunito font-normal sm:text-center sml:text-center md:!text-left sm:mt-2 sm:text-sm sml:text-sm md:text-xl text-primary md:mt-3 sml-mt-14">
            Free register and you can enjoy it
          </p>
          {firebaseError && (
            <p className="font-nunito font-normal text-sm text-red-500 pt-3">
              {firebaseError}
            </p>
          )}
          {success && (
            <p className="font-nunito font-normal text-sm text-green-500 pt-3">
              {success}
            </p>
          )}
          <div className="flex flex-col">
            <div className="relative">
              <input
                className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-8 sml:mt-8 outline-none"
                type="text"
                onChange={handleFullName}
              />
              <p className="absolute sm:top-5 sml:top-5 left-9 bg-white px-4">
                Full Name
              </p>
              {fullNameError && (
                <p className="font-nunito font-normal text-sm text-red-500 pt-3  ">
                  {fullNameError}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-8 sml:mt-8 outline-none"
                type="email"
                onChange={handleEmail}
              />
              <p className="absolute sm:top-5 sml:top-5 left-9 bg-white px-4">
                Email Addres
              </p>
              {emailError && (
                <p className="font-nunito font-normal text-sm text-red-500 pt-3">
                  {emailError}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className="w-full border border-solid border-primary rounded-lg sml:p-4 sm:p-3.5 md:py-6 md:px-12 sm:mt-8 sml:mt-8 outline-none"
                type={showPassword ? "text" : "password"}
                onChange={handlePassword}
              />
              <p className="absolute sm:top-5 sml:top-5 left-9 bg-white px-4">
                Password
              </p>

              {showPassword ? (
                <RiEyeLine
                  onClick={handleShowPassword}
                  className="absolute top-[53px] right-[14px]"
                />
              ) : (
                <RiEyeCloseLine
                  onClick={handleShowPassword}
                  className="absolute top-[53px] right-[14px]"
                />
              )}

              {passwordError && (
                <p className="font-nunito font-normal text-sm text-red-500 pt-3">
                  {passwordError}
                </p>
              )}
            </div>
          </div>
          {loading ? (
            <div className="mt-10 flex justify-center ">
              <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="100"
                visible={true}
              />
            </div>
          ) : (
            <button
              className="w-full font-nunito font-semibold text-xl text-white sml:px-[100px] sm:py-3.5 sml:py-5 bg-btn rounded-[86px] sm:mt-8 sml:mt-10"
              type="submit"
              onClick={handleSignup}
            >
              Sign up
            </button>
          )}

          <p className="font-nunito font-semibold text-sm flex justify-center text-[#03014C] my-[36px]">
            Already have an account ?{" "}
            <Link className=" font-bold text-[#EA6C00]" to="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="sml:w-1/2 hidden sml:block ">
        <picture>
          <img
            className="w-full sml:h-full md:!h-screen object-cover"
            src="assets/images/registration.webp"
            leading="lazy"
          />
        </picture>
      </div>
    </div>
  );
};

export default Registration;
