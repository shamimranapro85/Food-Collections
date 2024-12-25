import { useEffect } from "react";
import { axiosInstance } from "../../../featured/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyRequestedFod } from "../../../redux/slice/myRequestedFod";
import Spinner from "../../shared/Spinner";
import { useNavigate } from "react-router";

const MyFoodRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myRequestedFodState = useSelector((state) => state.myRequestedFodState);
  const { user } = useSelector((state) => state.UserSate);

  useEffect(() => {
    dispatch(
      fetchMyRequestedFod({ url: "/myRequestedFood", data: user.email })
    );
  }, [dispatch]);

  useEffect(() => {
    axiosInstance.post("/checkToken");
  }, []);

  const items = myRequestedFodState?.data?.data || [];
  if (myRequestedFodState.loading) {
    <Spinner />;
  }

  if (items.length > 0) {
    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Food/Donar</th>
              <th>Expire info</th>
              <th>PicUp Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <th>
                    <label></label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
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
                  <th>
                    <button
                      onClick={() =>
                        navigate(`/food/${item._id}`, { state: item._id })
                      }
                      className="btn self-start mt-5 btn-sm bg-green-400"
                    >
                      View Details
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div className="text-center">Item not Requested</div>;
  }
};

export default MyFoodRequest;
