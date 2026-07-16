import React from "react";
import { MdDialerSip } from "react-icons/md";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FaMapPin } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { updateOrderStatus } from "../redux/userSlice";
import { useState } from "react";
const OwnerCard = ({ data }) => {
  const [availableBoy, setAvailableBoy] = useState([]);
  const dispatch = useDispatch();

  const handleStatus = async ({ orderId, shopId, status }) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true },
      );
      dispatch(updateOrderStatus({ orderId, shopId, status }));
      const boys = result.data.availableBoys || [];
      setAvailableBoy([...boys]);
      console.log(result);
      console.log(result.data);
    } catch (error) {
      console.log(
        " status update error:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-lg p-4 space-y-5 hover:shadow-2xl transition-all duration-500 border border-gray-100">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {data?.user.fullname}
        </h2>
        <p className="text-sm text-gray-500">{data?.user?.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <MdDialerSip />
          <span>{data?.user?.mobile}</span>
        </p>
      </div>

      <div className="flex items-start flex-col gap-2 to-gray-600 text-sm">
        <p>{data?.deliveryAddress?.text}</p>

        <p className="text-xs to-gray-500">
          Lat: {data?.deliveryAddress?.latitude}, Lon:{" "}
          {data?.deliveryAddress?.longitude}
        </p>
      </div>

      <div className="flex pb-2 space-x-4 overflow-x-auto">
        {data.shopOrders.shopOrderItems?.map((item, i) => (
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

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
            data.shopOrders.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : data.shopOrders.status === "preparing"
                ? "bg-blue-100 text-blue-700"
                : data.shopOrders.status === "out of delivery"
                  ? "bg-orange-100 text-orange-700"
                  : data.shopOrders.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
          }`}
        >
          {data.shopOrders.status}
        </span>

        <select
          className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-yellow-500 text-orange-400 "
          onChange={(e) =>
            handleStatus({
              orderId: data._id,
              shopId: data.shopOrders.shop._id,
              status: e.target.value,
            })
          }
        >
          <option>Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out of Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <div className="text-right font-bold text-gray-800 text-sm">
        Total: ₹ {data?.shopOrders?.subTotal}
      </div>

      {data?.shopOrders?.status === "out of delivery" && (
        <div className="mt-3 p-3 border rounded-lg text-sm bg-orange-100">
          {/* Assigned Boy */}
          {data?.shopOrders?.assignedBoy ? (
            <>
              <p className="font-semibold mb-2 text-green-700">
                Assigned Delivery Boy
              </p>

              <div className="border border-green-300 rounded-lg p-2 bg-white shadow-sm">
                <p className="font-semibold">
                  {data.shopOrders.assignedBoy.fullname}
                </p>

                <p>{data.shopOrders.assignedBoy.mobile}</p>

                <p className="text-green-600 font-medium mt-2">
                  ✅ Assigned Successfully
                </p>
              </div>
            </>
          ) : availableBoy.length > 0 ? (
            <>
              <p className="font-semibold mb-2 text-gray-700">
                Available Delivery Boys
              </p>

              {availableBoy.map((b) => (
                <div
                  key={b.id}
                  className="border border-orange-300 rounded-lg p-2 mb-2 bg-white shadow-sm"
                >
                  <p className="font-semibold">{b.fullname}</p>
                  <p>{b.mobile}</p>
                </div>
              ))}
            </>
          ) : (
            <>
              <p className="font-semibold mb-2 text-gray-700">
                Available Delivery Boys
              </p>

              <p className="text-red-500">No delivery boys available</p>
            </>
          )}
        </div>
      )}
      <div className="mt-6 border-t border-gray-200 pt-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
          <FaCreditCard className="w-5 h-5 text-gray-600" />
          <span>payment: {data?.paymentMethod}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
          <FaClock className="w-5 h-5 text-gray-600" />
          <span>
            total amount: <b>৳{data?.totalAmount}</b>
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
          <FaMapPin className="w-5 h-5 text-gray-600" />
          <a
            href={`https://www.google.com/maps?q=${data?.deliveryAddress?.latitude},${data?.deliveryAddress?.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            {data?.deliveryAddress.text}
          </a>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
          <p className="text-gray-800 font-semibold text-capitilize">
            Coustomer Name: {data?.user?.fullname || "N/A"}
          </p>
          <p className="text-gray-800 font-semibold">
            Coustomer Email: {data?.user?.email || "N/A"}
          </p>
          <p className="text-gray-800 font-semibold">
            Coustomer Mobile: {data?.user?.mobile || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerCard;
