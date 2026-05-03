import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignIn() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      console.log(response);
      dispatch(setUserData(response.data.user));

      if (response.status === 201) {
        navigate("/"); // Successful hone ke baad user ko home page par bhej do
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Login failed!");
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const firebaseResult = await signInWithPopup(googleAuth, provider);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/google-auth",
        { email: firebaseResult.user.email },
        { withCredentials: true },
      );

      console.log(response);
      dispatch(setUserData(response.data.user));

      if (response.status === 201) {
        navigate("/"); // Successful hone ke baad user ko home page par bhej do
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Googel login failed!");
    }
  };

  return (
    <div className="h-screen bg-[#F8F0E3] flex justify-center items-center">
      <div className="w-full max-w-md p-10 border rounded-2xl bg-[#FFFFFF] ">
        <h1 className="text-4xl mb-5 font-bold text-[#E74A38]">Quick Bite</h1>
        <h1 className="text-2xl mb-1">Welcome back</h1>
        <p className="mb-5">Get start with your first order in minutes</p>

        {/* form */}
        <div className="text-sm flex flex-col gap-2">
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@email.com"
            className="w-full p-2  bg-[#EFF4FF] rounded-md "
          />

          {/* Password */}
          <div className="relative">
            <label htmlFor="password">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***********"
              className="w-full p-2  bg-[#EFF4FF] rounded-md "
            />
            <div
              onClick={() => navigate("/forgot-password")}
              className="absolute top-0 right-0 text-[#E74A38] cursor-pointer text-[12px] font-semibold"
            >
              <p>Forgot Password?</p>
            </div>
            <div
              className="absolute top-7.5 right-3"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </div>
          </div>

          <button
            onClick={handleSignIn}
            className="bg-[#E74A38] text-white py-2 rounded-md mt-5 cursor-pointer hover:"
          >
            Sign In
          </button>

          <button
            onClick={handleSignInWithGoogle}
            className=" border py-2 rounded-md mt-2 flex justify-center items-center text-[13px] gap-1  cursor-pointer "
          >
            <FcGoogle size={20} />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
