import React, { useEffect } from "react";
import { axiosInstance } from "../../../featured/axios";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../../redux/slice/postData";

const AddFood = () => {
  const select_userData = useSelector((state) => state.UserSate);
  const dispatch = useDispatch()

  const {
    user: { email, displayName, photoURL },
  } = select_userData;
  const onSubmitted = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    const newData = {
      ...data,
      email,
      displayName,
      photoURL,
    };
    dispatch(postData(""))

    console.log(newData);
  };
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
              <button type="submit" className="btn btn-primary">
                Add Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
