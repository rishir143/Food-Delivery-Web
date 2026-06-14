import React, { useEffect } from "react";
import { serverUrl } from "../src/App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../src/redux/userSlice";

const useGetMyOrders = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/order/my-orders`, {
          withCredentials: true,
        });
        dispatch(setMyOrders(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [userData]);
};

export default useGetMyOrders;
