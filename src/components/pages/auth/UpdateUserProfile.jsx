import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";



import { Flip, toast } from "react-toastify";
import { auth } from "../../firebase/firebase.confige";

const Update = () => {
  const [err, setError] = useState("");

//   console.log(user.displayName);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);

    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");

    // const data = {
    //   name,
    //   photo,
    // };

    let updateData = {};

    if (name && photo) {
      updateData = {
        displayName: name,
        photoURL: photo,
      };

      updateProfile(auth.currentUser, updateData)
        .then(() => {
          toast.success("User information updated", {
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
          navigate("/auth/profile");
        //   console.log("update user successfully");
        })
        .catch((err) => console.log("error update profile : ", err));

      setError("");
    } else if (name) {
      updateData = {
        displayName: name,
      };

      updateProfile(auth.currentUser, updateData)
        .then(() => {
          toast.success("User information updated", {
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
          navigate("/auth/profile");
        //   console.log("update user successfully");
        })
        .catch((err) => console.log("error update profile : ", err));
      setError("");
    } else if (photo) {
      updateData = {
        photoURL: photo,
      };

      updateProfile(auth.currentUser, updateData)
        .then(() => {
          toast.success("User information updated", {
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
          navigate("/auth/profile");
          console.log("update user successfully");
        })
        .catch((err) => console.log("error update profile : ", err));
      setError("");
    } else {
      setError("Please fil up any field for update!");
    }

    // console.log(data);
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-center">
          <h1 className="text-5xl font-bold mb-3">Update Now</h1>
          <h1 className="text-xl font-bold mb-3 text-center">
            Hey {user.displayName}
          </h1>
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
                placeholder="Photo"
                className="input input-bordered"
              />
            </div>
            <p className=" text-red-500 my-4">{err}</p>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;