import React, { useEffect } from "react";
import { serverUrl } from "../src/App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setItemsInMyCity } from "../src/redux/userSlice";

const useGetItemByCity = () => {
  const { currentCity } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-item-by-city/${currentCity}`,
          {
            withCredentials: true,
          },
        );
        dispatch(setItemsInMyCity(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [currentCity]);
};

export default useGetItemByCity;
