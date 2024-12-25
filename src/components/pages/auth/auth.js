import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.confige";
import { Flip, toast } from "react-toastify";
import useInterceptor from "../../featured/axios";
import axios from "axios";

const baseURL = import.meta.env.VITE_baseURL;

