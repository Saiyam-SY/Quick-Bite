import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";

function useGetCity() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (params) => {
      const { latitude, longitude } = params.coords;

      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`,
      );

      dispatch(setCurrentCity(response.data.results[0].city));
      dispatch(setCurrentState(response.data.results[0].state));
      dispatch(
        setCurrentAddress(
          response.data.results[0].address_line1 || response.data.results[0].address_line2,
        ),
      );
    });
  }, [userData]);
}

export default useGetCity;
