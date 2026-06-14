import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import UserOrderCard from "../components/UserOrderCard";
import OwnerCard from "../components/OwnerCard";

const MyOrder = () => {
  const navigate = useNavigate();
  const { userData, myOrders } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex justify-center px-4  ">
      <div className="w-full max-w-[800px] p-4">
        <div className="flex items-center gap-[20px] mb-6 ">
          <div
            className="absolute top-[20px] left-[20px] z-[10] mb-[10px] "
            onClick={() => navigate("/")}
          >
            <IoArrowBackOutline size={35} className="text-[#ff4d2d] " />
          </div>
          <h1 className="text-gray-800 font-bold text-xl">My Orders</h1>
        </div>
        <div className="space-y-6">
          {myOrders?.map((order, index) =>
            userData?.role == "user" ? (
              <UserOrderCard data={order} key={index} />
            ) : userData.role == "owner" ? (
              <OwnerCard data={order} key={index} />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
