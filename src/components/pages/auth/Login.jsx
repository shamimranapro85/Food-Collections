import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Flip, toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import { auth } from "../../firebase/firebase.confige";

import useInterceptor from "../../featured/axios";
import { useSelector } from "react-redux";

const Login = () => {
  const axiosInstance = useInterceptor();
  const [showPass, setShowPass] = useState(false);
  const functionState = useSelector((state) => state.functionState);
  const showPasswordFunc = () => {
    setShowPass(!showPass);
  };
  const refEamil = useRef("");

  const forgotPass = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    !emailRegex.test(refEamil.current.value)
      ? toast.warning("please enter your valid email ", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        })
      : sendPasswordResetEmail(auth, refEamil.current.value)
          .then(() => {
            toast.success(
              "Reset password Link sended to your email please check",
              {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
              }
            );
            window.location.href =
              "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox";
          })
          .catch((err) => {
            setError(err.message);
          });
  };
  const location = useLocation();
  const navigate = useNavigate();

  const [err, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const email = form.get("email");
    const password = form.get("password");

    signInWithEmailAndPassword(auth, email, password)
      .then(async (e) => {
        await axiosInstance.post("/login", e, { withCredentials: true });
        navigate(location?.state ? location.state : "/");
        toast.success("Sign in successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      })
      .catch((err) => {
        setError("email or password incorrect / network error");
      });
  };
  const provider = new GoogleAuthProvider();
  const signINWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        await axiosInstance.post(`/login`, data, { withCredentials: true });
        updateProfile(auth.currentUser, {
          photoURL: data?.user?.photoURL,
        }).then(() => {
          //   console.log(data.user.photoURL);
          toast.success("Login Successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          return navigate(location?.state ? location.state : "/");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-3">Login now!</h1>
        </div>
        <div className="card bg-base-100 relative w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={refEamil}
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <p
                onClick={showPasswordFunc}
                className="absolute right-[12px] bottom-[90px]"
              >
                {!showPass ? <FaEye /> : <FaEyeSlash />}
              </p>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label>
                <p
                  className="label hover:underline hover:text-blue-500"
                  onClick={() =>
                    navigate("/forgot", {
                      state: { email: refEamil.current.value },
                    })
                  }
                >
                  Forgot password
                </p>
              </label>
              <label className="label">
                <p className="text-sm">
                  Have not a account! you can
                  <Link
                    to={"/register"}
                    className="label-text-alt text-sm ml-1 link link-hover"
                  >
                    Register
                  </Link>
                </p>
              </label>
            </div>
            <p className=" text-red-500 my-1">{err}</p>
            <div className="form-control ">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="flex justify-center items-center">
            <button className="btn mb-4" onClick={signINWithGoogle}>
              {" "}
              <FaGoogle /> Continue With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
