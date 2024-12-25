import React, { useEffect } from "react";
import { axiosInstance } from "../../../featured/axios";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../../redux/slice/postData";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Flip, toast } from "react-toastify";
const AddFood = () => {
  const select_userData = useSelector((state) => state.UserSate);
  const postDataState = useSelector((state) => state.postDataState);
  const dispatch = useDispatch();

  const { loading } = postDataState;
  const {
    user: { email, displayName, photoURL },
  } = select_userData;
  const onSubmitted = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    const newData = {
      ...data,
      status: "available",
      email,
      displayName,
      photoURL,
    };
    dispatch(postData({ url: "/addFood", data: newData }));
    toast.success("Food added", {
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
  };

  console.log(postDataState);

  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-col">
        <div>
          <h1 className="text-5xl font-bold">Add Food</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={onSubmitted} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Food Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Image</span>
              </label>
              <input
                name="image"
                type="url"
                placeholder="Enter Food image"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Quantity</span>
              </label>
              <input
                name="quantity"
                type="number"
                placeholder="Enter Food quantity"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pickup Location</span>
              </label>
              <input
                name="location"
                type="text"
                placeholder="Enter pickup location"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Expired Date</span>
              </label>
              <input
                name="ExpDate"
                type="date"
                placeholder="Enter Expire date"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Additional Notes</span>
              </label>
              <input
                name="details"
                type="text"
                placeholder="Enter additional details"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn overflow-hidden flex flex-row gap-1 btn-primary"
              >
                {loading ? (
                  <PacmanLoader className="object-cover !w-4 flex" />
                ) : (
                  "Add Food"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
