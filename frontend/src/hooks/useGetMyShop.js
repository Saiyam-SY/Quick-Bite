import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

function useGetMyShop() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/shop/get-my",
          { withCredentials: true },
        );

        console.log(response);
        dispatch(setMyShopData(response.data));
      } catch (error) {
        console.log(response);
      }
    };

    fetchShop();
  }, []);
}

export default useGetMyShop;
