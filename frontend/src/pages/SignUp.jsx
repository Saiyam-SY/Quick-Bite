import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // Redux
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          fullName,
          email,
          mobile,
          password,
          role,
        },
        { withCredentials: true },
      );

      console.log(response);
      dispatch(setUserData(response.data.user));

      if (response.status === 201) {
        navigate("/"); // Successful hone ke baad user ko home page par bhej do
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Registration failed!");
    }
  };

  const handleSignUpWithGoogle = async () => {
    if (!mobile) {
      return alert("Mobile Number daalo");
    }
    const provider = new GoogleAuthProvider();
    const firebaseResult = await signInWithPopup(googleAuth, provider);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/google-auth",
        {
          fullName: firebaseResult.user.displayName,
          email: firebaseResult.user.email,
          mobile,
          role,
        },
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
        <h1 className="text-2xl mb-1">Create an account</h1>
        <p className="mb-5">Get start with your first order in minutes</p>

        {/* form */}
        <div className="text-sm flex flex-col gap-2">
          {/* Full Name */}
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-2  bg-[#EFF4FF] rounded-md "
          />

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

          {/* Mobile */}
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            name="mobile"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="00000-00000"
            className="w-full p-2  bg-[#EFF4FF] rounded-md "
          />

          {/* Password */}
          <label htmlFor="password">Password</label>
          <div className="relative">
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
              className="absolute top-2.5 right-3"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </div>
          </div>

          {/* Role */}
          <label htmlFor="role">Role</label>
          <div className="flex justify-between">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                className={` px-4 py-1 rounded-md transition-all duration-200 ${role === r ? `bg-[#E74A38] text-white` : "bg-white"} cursor-pointer`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={handleSignUp}
            className="bg-[#E74A38] text-white py-2 rounded-md mt-5 cursor-pointer hover:"
          >
            Register
          </button>

          <button
            onClick={handleSignUpWithGoogle}
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

export default SignUp;
