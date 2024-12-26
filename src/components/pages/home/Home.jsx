import { useEffect, useState } from "react";
import Slider from "../featured/Another slide etc/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnyData } from "../../redux/slice/FetchAnyData";
import Spinner from "../shared/Spinner";
import { NavLink, useNavigate } from "react-router";
import ContactSection from "../featured/extra/Contact";
import SpecialOffers from "../featured/extra/Spacial";

const Home = () => {
  const { data, error, loading } = useSelector(
    (state) => state.fetchAnyDataState
  );
  const navigate = useNavigate();
  const [top6data, setTop6Data] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnyData("/allFood"));
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const top6 = [...data.data]
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 6);
      setTop6Data(top6);
    }
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading data.</div>;
  }

  return (
    <div>
      <Slider />
      <div className="Featured py-8 flex justify-center items-center flex-col">
        <h1 className="text-center font-bold text-4xl pb-4">Featured Foods</h1>
        <div className="grid py-4 grid-cols-1 md:grid-cols-2 px-4 lg:grid-cols-3 gap-4 border rounded-md">
          {top6data.length > 0 ? (
            top6data.map((item, indx) => (
              <div
                key={indx}
                className="rounded-md shadow-md p-2 flex flex-col grow gap-2"
              >
                <div className="grow flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt="" />
                </div>
                <h2 className="font-semibold">Food Name: {item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Pick Location: {item.location}</p>
                <p>Expiration Date: {item.ExpDate}</p>
                <p className="">
                  Status:{" "}
                  {item.status == "available" ? (
                    <div className="rounded-lg inline-block p-1  bg-green-300 text-center">
                      {item.status}
                    </div>
                  ) : (
                    <div className="rounded-sm bg-yellow-200 p-1 text-center inline-block">
                      {item.status}
                    </div>
                  )}
                </p>
                <button
                  onClick={() =>
                    navigate(`/food/${item._id}`, { state: item._id })
                  }
                  className="btn  btn-sm bg-green-400"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <div className="h-8 flex items-center justify-center text-center text-2xl">
              No Item Available
            </div>
          )}
          <NavLink to={"/availablefoods"} className="btn btn-sm col-span-full">
            Show All
          </NavLink>
        </div>
      </div>
      <SpecialOffers />
      <ContactSection />
    </div>
  );
};

export default Home;
