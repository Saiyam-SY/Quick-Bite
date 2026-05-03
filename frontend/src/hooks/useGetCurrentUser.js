import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/current",
          { withCredentials: true },
        );

        console.log(response);
        dispatch(setUserData(response.data));
      } catch (error) {
        console.log(response);
      }
    };

    fetchUser();
  }, []);
}

export default useGetCurrentUser;
