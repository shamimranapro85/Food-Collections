import { useState, useEffect } from "react";
import { axiosBaseUrl } from "../../../featured/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../shared/Spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const fetchMyFoods = async (email) => {
  const response = await axiosBaseUrl.post("/ManageMyFoods", { email });
  return response.data;
};
const ManageMyFoods = () => {
  const { user } = useSelector((state) => state.UserSate);
  const queryClient = useQueryClient();

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["myFoods", user.email],
    queryFn: () => fetchMyFoods(user.email),
    staleTime: 5000,
    cacheTime: 5000,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, receiveData }) =>
      axiosBaseUrl.post("/UpdateMyFood", { id, receiveData }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myFoods", user.email]);
      setSelectedItem(null);
      setModalType(null);
      toast.success("Food updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating food:", error);
      toast.error("Error updating food!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosBaseUrl.post("/deleteFood", { id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myFoods", user.email]);
      setSelectedItem(null);
      setModalType(null);
      toast.success("Food deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting food:", error);
      toast.error("Error deleting food!");
    },
  });

  useEffect(() => {
    axiosBaseUrl.post("/checkToken");
  }, []);

  const handleUpdate = () => {
    const { _id, ...receiveData } = selectedItem;
    updateMutation.mutate({ id: _id, receiveData });
  };

  const handleDelete = () => {
    deleteMutation.mutate(selectedItem._id);
  };

  const items = data || [];
  if (isLoading) return <Spinner />;

  if (error) return <div>Error fetching data: {error.message}</div>;
  if (!(items.length > 0)) {
    return (
      <div className="text-center py-5 text-yellow-200">Item not available</div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Food/Donor</th>
            <th>Expire Info</th>
            <th>PickUp Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div>{item.foodDonationEmailDisplayName}</div>
                  </div>
                </div>
              </td>
              <td>{item.ExpDate}</td>
              <td>{item.location}</td>
              <td>
                <button
                  className="btn btn-sm bg-green-400"
                  onClick={() => {
                    setSelectedItem(item);
                    setModalType("update");
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm bg-red-400"
                  onClick={() => {
                    setSelectedItem(item);
                    setModalType("delete");
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalType === "update" && selectedItem && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Food</h3>
            <input
              type="text"
              className="input input-bordered w-full mt-2"
              value={selectedItem.name}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, name: e.target.value })
              }
              placeholder="Food Name"
            />
            <input
              type="text"
              className="input input-bordered w-full mt-2"
              value={selectedItem.location}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, location: e.target.value })
              }
              placeholder="Location"
            />
            <input
              type="text"
              className="input input-bordered w-full mt-2"
              value={selectedItem.quantity}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, quantity: e.target.value })
              }
              placeholder="Quantity"
            />
            <textarea
              className="textarea textarea-bordered w-full mt-2"
              value={selectedItem.details}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, details: e.target.value })
              }
              placeholder="Details"
            />
            <div className="modal-action">
              <button onClick={handleUpdate} className="btn bg-green-500">
                Update
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="btn bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "delete" && selectedItem && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Food</h3>
            <p>Are you sure you want to delete {selectedItem.name}?</p>
            <div className="modal-action">
              <button onClick={handleDelete} className="btn bg-red-500">
                Delete
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="btn bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
