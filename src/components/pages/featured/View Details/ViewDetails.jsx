import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Spinner from "../../shared/Spinner";
import { FetchSingleData } from "../../../redux/slice/fetctSingleData";
import { Flip, toast } from "react-toastify";
import { fetchRequestedFood } from "../../../redux/slice/requestedPost";

const ViewDetails = () => {
  const param = useParams();
  const { data, error, loading } = useSelector(
    (state) => state.fetchSingleDataState
  );
  const { user } = useSelector((state) => state.UserSate);
  const {
    data: rdata,
    loading: rloading,
    error: rerror,
  } = useSelector((state) => state.fatechRequestFoodState);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(FetchSingleData(`/food/${param.id}`));
  }, [dispatch, param.id, rdata]);

  const destrucDAta = data?.data;
  const [dataAdditional, setDdditionalDetails] = useState(destrucDAta?.additionalDetails);
  const handleRequestClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }

  const HandleChange = (e) => {
    setDdditionalDetails(e.target.value);
  };

  const onSubmitRequest = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    dispatch(fetchRequestedFood({ url: "/requestedFood", data: data }));
    toast.success("add successfully requested", {
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
    closeModal();
  };

 

  const today = new Date();
  const dateOnly = today.toISOString().split("T")[0];
  if(!destrucDAta){
      return <div className="text-4xl text-center text-red-400">Id is Invalid</div>
  }
  return (
    <div className="w-full flex justify-center py-8 items-center">
      <div className="rounded-lg p-3 shadow-lg flex gap-1 flex-col">
        <div className="overflow-hidden max-w-96">
          <img
            src={destrucDAta?.image}
            className="w-full object-cover"
            alt=""
          />
        </div>

        <h1 className="font-bold text-center text-3xl">{destrucDAta?.name}</h1>
        <h1 className="capitalize">Quantity: {destrucDAta?.quantity}</h1>
        <h1 className="capitalize">location: {destrucDAta?.location}</h1>
        <h1 className="capitalize">ExpDate: {destrucDAta?.ExpDate}</h1>
        <h1 className="capitalize">
          Author:
          <span className="lowercase">{destrucDAta?.foodDonationEmail}</span>
        </h1>
        <h1 className="capitalize">
          details: {destrucDAta?.additionalDetails}
        </h1>
        {destrucDAta?.status === "requested" ? (
          <button disabled className="btn bg-red-300">
            This Item not Available
          </button>
        ) : (
          <button
            onClick={handleRequestClick}
            className="btn btn-sm bg-green-300"
          >
            Request
          </button>
        )}
      </div>

      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modal")) {
              closeModal();
            }
          }}
          className="modal modal-open"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">Request Item</h3>
            <form onSubmit={onSubmitRequest} className="flex flex-col gap-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Name</span>
                </label>
                <input
                  className="input input-bordered"
                  readOnly
                  type="text"
                  value={destrucDAta?.name}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Quantity</span>
                </label>
                <input
                  className="input input-bordered"
                  readOnly
                  type="text"
                  value={destrucDAta?.quantity}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Request Date</span>
                </label>
                <input
                  className="input input-bordered"
                  readOnly
                  name="RequestedDate"
                  type="date"
                  value={dateOnly}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Image</span>
                </label>
                <input
                  className="input input-bordered"
                  readOnly
                  type="text"
                  value={destrucDAta?.image}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food ID</span>
                </label>
                <input
                  className="input input-bordered"
                  readOnly
                  type="text"
                  name="id"
                  value={destrucDAta?._id}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donator Email</span>
                </label>
                <input
                  className="input input-bordered"
                  readOnly
                  type="text"
                  value={destrucDAta?.foodDonationEmail}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donator Name</span>
                </label>
                <input
                  className="input input-bordered"
                  readOnly
                  type="text"
                  value={destrucDAta?.foodDonationEmailDisplayName}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Expiry</span>
                </label>
                <input
                  className="input input-bordered"
                  readOnly
                  type="text"
                  value={destrucDAta?.ExpDate}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  name="requester"
                  className="input input-bordered"
                  readOnly
                  type="text"
                  value={user?.email}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pick Up Location</span>
                </label>
                <input
                  className="input input-bordered"
                  readOnly
                  type="text"
                  value={destrucDAta?.location}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Additional Note</span>
                </label>
                <textarea
                  onChange={HandleChange}
                  className="border border-gray-200 textarea"
                  type="text"
                  value={dataAdditional}
                  name="additionalDetails"
                />
              </div>

              <div className="modal-action">
                <span className="btn btn-sm bg-red-300" onClick={closeModal}>
                  Cancel
                </span>
                <button type="submit" className="btn btn-sm bg-green-300">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
