import axios from "axios";
import React, { _useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const OwnerItemCart = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/delete/${data._id}`,
        { withCredentials: true },
      );
      dispatch(setMyShopData(result.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-3xl">
      <div className="w-36 flex-shrink-0 bg-gray-50">
        <img src={data.image} alt="" className="w-full h-full object-cover " />
      </div>
      <div className="flex flex-col justify-between p-3 flex-1">
        <div className="">
          <h2 className="text-base font-semibold text-[#ff4d2d] ">
            {data.name}
          </h2>
          <p>
            <span className="font-medium text-gray-70 ">Category: </span>
            {data.category}
          </p>
          <p>
            <span className="font-medium text-gray-70 ">Food Type: </span>{" "}
            {data.foodType}{" "}
          </p>
        </div>

        <div className="flex items-center justify-between ">
          <div className="font-bold">
            <span>₹</span> {data.price}
          </div>
          <div className="flex item-center gap-4">
            <div
              className="cursor-pointer hover:bg-[#ff4d2d]/10 p-2 rounded-full text-[#ff4d2d] "
              onClick={handleDelete}
            >
              {" "}
              <FaTrash size={18} />
            </div>
            <div
              className="rounded-full p-2 hover:bg-[#ff4d2d]/10 cursor-pointer text-[#ff4d2d] "
              onClick={() => navigate(`/edit-item/${data._id}`)}
            >
              {" "}
              <FaPen size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCart;
