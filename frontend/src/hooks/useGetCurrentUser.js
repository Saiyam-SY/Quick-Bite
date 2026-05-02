import React from "react";
import { useEffect } from "react";
import axios from "axios";

function useGetCurrentUser() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/current",
          { withCredentials: true },
        );

        console.log(response);
      } catch (error) {
        console.log(response);
      }
    };

    fetchUser();
  }, []);
}

export default useGetCurrentUser;
