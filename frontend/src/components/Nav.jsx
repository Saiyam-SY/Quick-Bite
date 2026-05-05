import { FaLocationDot, FaUserGraduate } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { FaPlus } from "react-icons/fa";
import { TbReceiptRupee } from "react-icons/tb";

function Nav() {
  const { userData, currentCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();

  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleSignOut = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/signout",
        { withCredentials: true },
      );

      console.log(response.data.message);
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-[80px] px-[20px] flex items-center justify-between gap-[30px] fixed md:justify-center ">
      {showSearch && userData.role === "user" && (
        <div className="w-[90%] h-[50px] md:hidden flex fixed items-center top-[80px] bg-white shadow-lg rounded-lg overflow-hidden px-3 text-sm">
          <div className=" flex items-center w-[45%] border-r-2 gap-1.5  overflow-hidden ">
            <FaLocationDot size={20} className="text-[#E74A38]  " />
            <span className="cursor-pointer overflow-hidden">
              {currentCity}
            </span>
          </div>
          <div className="flex items-center px-5 gap-3 w-full">
            <FaSearch size={20} className="text-[#E74A38]" />
            <input
              type="text"
              placeholder="search what you crave..."
              className="w-full focus:outline-none  "
            />
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-[#E74A38] cursor-pointer">
          Quick Bite
        </h1>
      </div>
      {userData.role === "user" && (
        <div className="md:w-[60%] lg:[40%] h-[50px] hidden md:flex items-center px-[20px] bg-white shadow-lg rounded-lg">
          <div className=" flex items-center w-[20%] border-r-2 gap-1.5  ">
            <FaLocationDot size={20} className="text-[#E74A38]  " />
            <span className="cursor-pointer">{currentCity}</span>
          </div>
          {userData.role === "user" && (
            <div className="flex items-center px-5 gap-3 w-full">
              <FaSearch size={20} className="text-[#E74A38]" />
              <input
                type="text"
                placeholder="search what you crave..."
                className="w-full focus:outline-none  "
              />
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center items-center gap-10">
        {userData.role === "user" &&
          (showSearch === true ? (
            <RxCross2
              size={20}
              className="text-[#E74A38]  md:hidden"
              onClick={() => setShowSearch((prev) => !prev)}
            />
          ) : (
            <FaSearch
              size={20}
              className="text-[#E74A38]  md:hidden"
              onClick={() => setShowSearch((prev) => !prev)}
            />
          ))}
        {userData.role === "user" && (
          <div className="flex text-[#E74A38] relative cursor-pointer">
            <FaShoppingCart size={20} className="" />
            <span className="absolute right-[-10px] top-[-12px]">0</span>
          </div>
        )}

        {userData.role === "owner" && myShopData && (
          <div className="flex gap-5 ">
            <button className="flex justify-center items-center gap-2 text-[#E74A38] ">
              <FaPlus size={20} />
              <span className="hidden md:block">Add items</span>
            </button>

            <div className="relative">
              <button className="  md:flex px-4 py-2 bg-[#E74A38]/10 text-[#E74A38] rounded-md cursor-pointer justify-center items-center gap-1">
                <span>
                  <TbReceiptRupee
                    size={20}
                    className="bg-[#E74A38]/10 text-[#E74A38]"
                  />
                </span>
                <span className="hidden md:block"> My Orders</span>
              </button>

              <span className="absolute -top-2 right-0 text-white bg-[#E74A38] h-5 w-5 rounded-full flex justify-center items-center">
                0
              </span>
            </div>
          </div>
        )}

        {/* User  */}
        <div
          onClick={() => setShowInfo((prev) => !prev)}
          className=" rounded-full h-[40px] w-[40px] flex justify-center items-center bg-[#E74A38] text-white text-[18px] font-semibold shadow-xl cursor-pointer transition duration-75"
        >
          {userData?.fullName?.slice(0, 1).toUpperCase()}
        </div>

        {/* Pop Up */}
        <div
          className={`fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-9999 bg-white transform transition-all duration-300 ease-in-out ${
            showInfo
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }`}
        >
          <div>
            {userData?.fullName?.charAt(0).toUpperCase() +
              userData?.fullName?.slice(1)}
          </div>
          <div className=" md:hidden block">My orders</div>
          <div
            className="text-[#E74A38] cursor-pointer"
            onClick={handleSignOut}
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
