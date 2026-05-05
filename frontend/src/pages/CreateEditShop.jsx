import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyShopData } from "../redux/ownerSlice";

function CreateEditShop() {
  const navigate = useNavigate();

  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user,
  );

  const [name, setName] = useState(myShopData?.name || "");
  const [shopImage, setShopImage] = useState(myShopData?.shopImage || "");
  const [city, setCity] = useState(myShopData?.city || currentCity || "");
  const [state, setState] = useState(myShopData?.state || currentState || "");
  const [address, setAddress] = useState(
    myShopData?.address || currentAddress || "",
  );

  useEffect(() => {
    if (!myShopData?.city && currentCity) setCity(currentCity);
    if (!myShopData?.state && currentState) setState(currentState);
    if (!myShopData?.address && currentAddress) setAddress(currentAddress);
  }, [currentCity, currentState, currentAddress, myShopData]);

  return (
    <div className="bg-[#fffbfa] min-h-screen py-12 flex justify-center items-center font-sans">
      <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 md:p-10 max-w-[500px] w-full mx-4">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#fdf0e6] w-[80px] h-[80px] rounded-full flex justify-center items-center">
            <svg
              width="45"
              height="45"
              viewBox="0 0 68 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 16 Q17 13 18 16 V32 H21 V16 Q22 13 23 16 V32 H26 V16 Q27 13 28 16 V36 Q28 42 24 42 V62 Q22 66 20 62 V42 Q16 42 16 36 V16 Z"
                fill="#ea4335"
              />
              <path
                d="M38 16 C38 10 52 14 52 30 V40 Q52 42 50 42 H46 V62 Q44 66 42 62 V42 H38 Q36 42 36 40 V18 Q36 16 38 16 Z"
                fill="#ea4335"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[26px] font-extrabold text-[#111827] text-center mb-8 tracking-tight">
          {myShopData ? "Edit Shop" : "Add Shop"}
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-[13px] font-semibold text-[#4b5563] mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter shop Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-400 rounded-[6px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ea4335]/50 focus:border-[#ea4335] transition-colors"
            />
          </div>

          {/* Shop Image */}
          <div>
            <label className="block text-[13px] font-semibold text-[#4b5563] mb-1">
              shop Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-400 rounded-[6px] text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#ea4335]/50 focus:border-[#ea4335] transition-colors file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
            />
            {/* Image Preview Placeholder */}
            <div className="mt-3 w-full h-[160px] rounded-[6px] overflow-hidden border border-gray-300 shadow-sm relative bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Shop preview placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* City and State */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-[13px] font-semibold text-[#4b5563] mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                className="w-full px-3 py-2.5 border border-gray-400 rounded-[6px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ea4335]/50 focus:border-[#ea4335] transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[13px] font-semibold text-[#4b5563] mb-1">
                State
              </label>
              <input
                type="text"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                value={state}
                className="w-full px-3 py-2.5 border border-gray-400 rounded-[6px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ea4335]/50 focus:border-[#ea4335] transition-colors"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[13px] font-semibold text-[#4b5563] mb-1">
              Address
            </label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Address"
              className="w-full px-3 py-2.5 border border-gray-400 rounded-[6px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ea4335]/50 focus:border-[#ea4335] transition-colors"
            />
          </div>

          {/* Save Button */}
          <div className=" cursor-pointer pt-3">
            <button
              type="button"
              className="w-full bg-[#ea4335] hover:bg-[#d63a2e] text-white font-semibold py-3 px-4 rounded-[6px] transition-colors shadow-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEditShop;
