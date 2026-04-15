import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
} from "../src/redux/userSlice.js";
import { setAddress, setLocation } from "../src/redux/mapSlice.js";

const useGetCity = () => {
  const dispatch = useDispatch();
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, lon: longitude }));
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`,
      );
      dispatch(setCurrentCity(result?.data?.results[0]?.city));
      dispatch(setCurrentState(result?.data?.results[0]?.state));
      dispatch(setCurrentAddress(result?.data?.results[0]?.address_line2));
      dispatch(setAddress(result?.data?.results[0]?.address_line2));
    });
  }, [userData]);
};

export default useGetCity;
