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
        <p>{data?.delieveryAddress}</p>

        <p className="text-xs to-gray-500">
          Lat: {data?.delieveryAddress?.latitude}, Lon:{" "}
          {data?.delieveryAddress?.longitude}
        </p>
      </div>
    </div>
  );
};

export default OwnerCard;
