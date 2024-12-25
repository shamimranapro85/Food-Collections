import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Flip, toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { auth } from "../../firebase/firebase.confige";
import useInterceptor from "../../featured/axios";

const provider = new GoogleAuthProvider();

const Register = () => {
  const location = useLocation();
  const axiosInstance = useInterceptor();
  const [showPass, setShowPass] = useState(false);
  const showPasswordFunc = () => {
    setShowPass(!showPass);
  };
  const navigate = useNavigate();

  const [err, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photo = form.get("photo");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (passwordRegex.test(password)) {
      setError("");
    } else {
      setError(
        "Password must be at least 6 characters long and must contain at least one uppercase and  one lowercase   "
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((e) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(async () => {
            // console.log("update user : ", name);
            await axiosInstance.post("/login", e, { withCredentials: true });
            toast.success("Register successfully and Login", {
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
            navigate("/");
          })
          .catch(() => {
            // console.log("update user error: ", error);
          });
        setError("");
      })
      .catch((err) => {
        console.log("firebase error is : ", err.message);

        setError("email already exist/ network error");
      });

    // console.log(data);
  };

  const signINWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        updateProfile(auth.currentUser, {
          photoURL: data?.user?.photoURL,
        }).then(() => {
          //   console.log(data.user.photoURL);
          return navigate(location?.state ? location.state : "/");
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-3">Register Now</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                name="name"
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="photo"
                name="photo"
                placeholder="Photo Url"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
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
                className="absolute right-[12px] bottom-[18px]"
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
            </div>
            <p className=" text-red-500 my-4">{err}</p>

            <label className="label">
              <Link to={"/login"} className="label-text-alt link link-hover">
                Have a account? you can Login
              </Link>
            </label>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
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

export default Register;
