import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
  const auth = getAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      const isWhitespace = /^(?=.*\s)/;
      const isContainsUppercase = /^(?=.*[A-Z])/;
      const isContainsLowercase = /^(?=.*[a-z])/;
      const isContainsNumber = /^(?=.*[0-9])/;
      const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
      const isValidLength = /^.{8,16}$/;

      if (isWhitespace.test(password)) {
        setPasswordError("Password must not contain Whitespaces.");
      }
      if (!isContainsUppercase.test(password)) {
        setPasswordError(
          "Password must have at least one Uppercase Character."
        );
      }
      if (!isContainsLowercase.test(password)) {
        setPasswordError(
          "Password must have at least one Lowercase Character."
        );
      }
      if (!isContainsNumber.test(password)) {
        setPasswordError("Password must contain at least one Digit.");
      }
      if (!isContainsSymbol.test(password)) {
        setPasswordError("Password must contain at least one Special Symbol.");
      }
      if (!isValidLength.test(password)) {
        setPasswordError("Password must be 8-16 Characters Long.");
      }
    }
    if (
      fullName &&
      email &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("registration Done")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
        });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex px-2.5 md:px-0">
      <div className="sml:w-1/2 flex flex-col items-end sml:mr-[69px] justify-center ">
        <div className="xl:w-[530px]">
          <h2 className="font-nunito font-bold sml:text-[18px] sm:text-center sm:mt-3.5 md:text-left text-4xl text-primary">
            Get started with easily register
          </h2>
          <p className="font-nunito font-normal sm:text-center sml:text-center md:!text-left sm:mt-2 sm:text-sm sml:text-sm md:text-xl text-primary md:mt-3 sml-mt-14">
            Free register and you can enjoy it
          </p>
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
          <button
            className="w-full font-nunito font-semibold text-xl text-white sml:px-[100px] sm:py-3.5 sml:py-5 bg-btn rounded-[86px] sm:mt-8 sml:mt-10"
            type="submit"
            onClick={handleSignup}
          >
            Sign up
          </button>
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