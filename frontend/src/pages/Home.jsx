import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliverBoy from "../components/DeliverBoy";

function Home() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="h-screen bg-[#F8F0E3]">
      {userData?.role === "user" && <UserDashboard />}
      {userData?.role === "owner" && <OwnerDashboard />}
      {userData?.role === "deliveryBoy" && <DeliverBoy />}
    </div>
  );
}

export default Home;
