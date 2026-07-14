import React from "react";
import { MdDialerSip } from "react-icons/md";
const OwnerCard = ({ data }) => {
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
          value={data?.shopOrders?.status}
          className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-yellow-500 text-orange-400 "
        >
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out of Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <div className="text-right font-bold text-gray-800 text-sm">
        Total: ₹ {data.shopOrders.subTotal}
      </div>
    </div>
  );
};

export default OwnerCard;
