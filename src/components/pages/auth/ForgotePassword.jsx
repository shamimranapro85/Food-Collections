import { sendPasswordResetEmail } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import { auth } from "../../firebase/firebase.confige";


const Forgot = () => {
  const [err, setError] = useState("");
  const email = useLocation();

  const refEamil = useRef("");

  const forgotPass = (form) => {
    form.preventDefault();

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

  const [ValueEmail, setValueEmail] = useState(email?.state?.email);

  const handleEmailChange = (event) => {
    setValueEmail(event.target.value);
  };

  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-3">Reset Your Password!</h1>
        </div>
        <div className="card bg-base-100 relative w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={forgotPass} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                onChange={handleEmailChange}
                ref={refEamil}
                type="email"
                name="email"
                value={ValueEmail}
                placeholder="email"
                className="input input-bordered"
              />
            </div>

            <p className=" text-red-500 my-1">{err}</p>
            <div className="form-control ">
              <button className="btn btn-primary">
                Reset Password/Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;