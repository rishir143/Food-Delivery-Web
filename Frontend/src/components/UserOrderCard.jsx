import React from "react";
import { FaBoxOpen, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserOrderCard = ({ data }) => {
  const navigate = useNavigate();
  const formatdate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isOrderDelivered = data.shopOrders.every(
    (shopOrder) => shopOrder.status === "delivered",
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-lg p-5 space-y-5 hover:shadow-2xl transition-all duration-500 border border-gray-100">
      <div className="flex justify-between items-start border-b pb-3">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            Order #{data._id.slice(-6)}
          </p>
          <p className="text-sm text-gray-500">{formatdate(data.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-700">
            Payment:{" "}
            <span className="font-medium text-indigo-600">
              {data.paymentMethod.toUpperCase()}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            Status:{" "}
            <span className="font-semibold text-orange-500">
              {data.shopOrders?.[0]?.status}
            </span>
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="flex items-center text-gray-600 text-sm">
        <FaMapMarkerAlt className="text-blue-500 mr-2" />
        {data.deliveryAddress?.text}
      </div>

      {/* Shop Orders */}
      {data.shopOrders?.map((shopOrder, index) => (
        <div
          key={index}
          className="border border-gray-100 rounded-xl p-4 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition duration-300"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800 text-lg capitalize">
              {shopOrder.shop?.name}
            </h3>
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              Orders Status: {shopOrder?.status}
            </span>
            <div className="flex  gap-3 p-4">
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-center p-2">
                Owner Mobile Number: {shopOrder.owner?.mobile}
              </span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-center p-2">
                Owner Email: {shopOrder.owner?.email}
              </span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-center p-2">
                Owner Name: {shopOrder.owner?.fullname}
              </span>
            </div>

            <span></span>
          </div>

          {shopOrder.shopOrderItems?.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              {/* Product Image */}
              <img
                src={item.item?.image}
                alt={item.item?.name}
                className="w-16 h-16 rounded-xl object-cover border border-gray-200 shadow-sm"
              />

              {/* Product Info */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm capitalize">
                  {item.item?.name}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} × ${item.item?.price}
                </p>
              </div>

              {/* Total for this item */}
              <p className="font-semibold text-gray-700">
                ${item.quantity * item.item?.price}
              </p>
            </div>
          ))}
        </div>
      ))}

      {/* Total Summary */}
      <div className="flex justify-between items-center border-t pt-3 text-gray-700">
        <p className="font-medium flex items-center gap-2">
          <FaBoxOpen className="text-indigo-500" /> Total Amount
        </p>
        <p className="text-xl font-bold text-indigo-600">${data.totalAmount}</p>
      </div>
      {!isOrderDelivered && (
        <button
          className="bg-orange-600 font-bold text-center px-4 py-2 rounded-lg text-white hover:bg-orange-700 transition-colors duration-300 cursor-pointer"
          onClick={() => navigate(`/track-order/${data._id}`)}
        >
          Track Order
        </button>
      )}
    </div>
  );
};

export default UserOrderCard;
