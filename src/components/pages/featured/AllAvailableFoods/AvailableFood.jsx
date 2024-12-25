import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { fetchAnyData } from "../../../redux/slice/FetchAnyData";
import Spinner from "../../shared/Spinner";

const AvailableFood = () => {
  const { data, error, loading } = useSelector(
    (state) => state.fetchAnyDataState
  );
  const navigate = useNavigate();
  const [allFoods, setAllFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnyData("/allFood"));
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      setAllFoods([...data.data]);
    }
  }, [data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    const sortedFoods = [...allFoods].sort((a, b) => {
      const dateA = new Date(a.ExpDate);
      const dateB = new Date(b.ExpDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setAllFoods(sortedFoods);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredFoods = allFoods.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading data.</div>;
  }

  return (
    <div className="Featured py-8 flex justify-center items-center flex-col">
      <h1 className="text-center font-bold text-4xl pb-4">
        All Available Foods
      </h1>
      <div className="flex gap-2 p-2 w-full justify-end items-center">
        <input
          placeholder="Search Food"
          className="input-sm border rounded-lg"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="btn btn-sm" onClick={handleSort}>
          Sort By Expire Date {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>
      <div className="grid py-4 grid-cols-1 md:grid-cols-2 px-4 lg:grid-cols-4 gap-4 border rounded-md">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((item, indx) => (
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
              <p>
                Status:{" "}
                {item.status === "available" ? (
                  <div className="rounded-lg inline-block p-1 bg-green-300 text-center">
                    {item.status}
                  </div>
                ) : (
                  <div className="rounded-sm bg-red-300 p-1 text-center inline-block">
                    {item.status}
                  </div>
                )}
              </p>
              <button
                onClick={() => navigate("/ViewDetails", { state: item._id })}
                className="btn btn-sm bg-green-400"
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
      </div>
    </div>
  );
};

export default AvailableFood;
