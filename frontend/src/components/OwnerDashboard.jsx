import { useSelector } from "react-redux";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user,
  );

  const navigate = useNavigate();
  return (
    <div className="bg-[#fffbfa] min-h-screen font-sans">
      <Nav />

      {!myShopData && (
        <div className="pt-[80px] flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-12 max-w-[420px] w-full mx-4 flex flex-col items-center text-center">
            <div className="mb-6 flex justify-center">
              <svg
                width="90"
                height="90"
                viewBox="0 0 68 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Custom Fork Icon */}
                <path
                  d="M16 16 Q17 13 18 16 V32 H21 V16 Q22 13 23 16 V32 H26 V16 Q27 13 28 16 V36 Q28 42 24 42 V62 Q22 66 20 62 V42 Q16 42 16 36 V16 Z"
                  fill="#fa5e20"
                />
                {/* Custom Knife Icon */}
                <path
                  d="M38 16 C38 10 52 14 52 30 V40 Q52 42 50 42 H46 V62 Q44 66 42 62 V42 H38 Q36 42 36 40 V18 Q36 16 38 16 Z"
                  fill="#fa5e20"
                />
              </svg>
            </div>

            <h2 className="text-[24px] font-bold text-[#1f2937] mb-3 tracking-tight">
              Add Your Restaurant
            </h2>
            <p className="text-[#64748b] text-[15px] mb-8 leading-relaxed px-1">
              Join our food delivery platform and reach thousands of hungry
              customers every day.
            </p>
            <button
              onClick={() => navigate("/create-edit-shop")}
              className="bg-[#fa5e20] hover:bg-[#e8551b] text-white font-semibold py-3 px-8 rounded-full transition-colors w-max shadow-md shadow-[#fa5e20]/20"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
