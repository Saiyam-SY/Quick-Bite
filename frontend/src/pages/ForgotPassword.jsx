import axios from "axios";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [forgotPasswordSteps, setForgotPasswordSteps] = useState(1);

  const handleSendingOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/send-otp",
        { email },
        { withCredentials: true },
      );
      console.log(response);

      setForgotPasswordSteps(2);
    } catch (error) {
      console.log(error.response?.data?.message || "Sending OTP failed!");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        { email, otp },
        { withCredentials: true },
      );

      console.log(response);
      setForgotPasswordSteps(3);
    } catch (error) {
      console.log(error.response?.data?.message || "Verifying OTP failed!");
    }
  };

  const handleResetPassword = async () => {
    try {
      if (newPassword != confirmPassword) {
        alert("Password does not match");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        { email, newPassword: confirmPassword },
        { withCredentials: true },
      );

      console.log(response);
      navigate("/signin");
    } catch (error) {
      console.log(
        error.response?.data?.message || "Resetting password failed!",
      );
    }
  };

  return (
    <div className="h-screen bg-[#F8F0E3] flex justify-center items-center">
      <div className="w-full max-w-md p-10 border rounded-2xl bg-[#FFFFFF] ">
        <h1 className="text-2xl mb-5 font-bold text-[#E74A38]">
          Forget your password?
        </h1>

        {/* form */}
        {forgotPasswordSteps === 1 && (
          <div className="text-sm flex flex-col gap-2">
            {/* Email */}
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@email.com"
              className="w-full p-2  bg-[#EFF4FF] rounded-md "
            />

            <button
              onClick={handleSendingOTP}
              className="bg-[#E74A38] text-white py-2 rounded-md mt-5 cursor-pointer hover:"
            >
              Send OTP
            </button>
          </div>
        )}

        {forgotPasswordSteps === 2 && (
          <div className="text-sm flex flex-col gap-2">
            {/* Email */}
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="w-full p-2  bg-[#EFF4FF] rounded-md "
            />

            <button
              onClick={handleVerifyOtp}
              className="bg-[#E74A38] text-white py-2 rounded-md mt-5 cursor-pointer hover:"
            >
              Send OTP
            </button>
          </div>
        )}

        {forgotPasswordSteps === 3 && (
          <div className="text-sm flex flex-col gap-2">
            {/* Password */}
            <label htmlFor="newPassword">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="***********"
                className="w-full p-2  bg-[#EFF4FF] rounded-md "
              />
              <div
                className="absolute top-2.5 right-3"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? (
                  <FaEyeSlash size={16} />
                ) : (
                  <FaEye size={16} />
                )}
              </div>
            </div>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="***********"
                className="w-full p-2  bg-[#EFF4FF] rounded-md "
              />
              <div
                className="absolute top-2.5 right-3"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={16} />
                ) : (
                  <FaEye size={16} />
                )}
              </div>
            </div>

            <button
              onClick={handleResetPassword}
              className="bg-[#E74A38] text-white py-2 rounded-md mt-5 cursor-pointer hover:"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
