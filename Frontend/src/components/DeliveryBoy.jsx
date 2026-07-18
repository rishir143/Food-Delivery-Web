import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { FaStore } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import DeliveryTracking from "./DeliveryTracking";

// import DeliveryTracking from "./DeliveryTracking";
const DeliveryBoy = () => {
  const { userData } = useSelector((state) => state.user);
  const [assignments, setAssignments] = useState([]);
  const [_data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const getassignment = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${serverUrl}/api/order/get-assignment`, {
        withCredentials: true,
      });
      if (result.data.success) {
        console.log(result.data);
        setAssignments(result.data.assignments || []);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          withCredentials: true,
        },
      );

      if (result.data.success) {
        setCurrentAssignment(result.data.data);
        setdata(result.data.data);
        console.log(result.data);
      }
    } catch (error) {
      console.log(error?.response?.data || error?.message);
    }
  };
  const acceptorder = async (assignmentId) => {
    try {
      setLoading(true);

      // ✅ check if undefined or not

      const result = await axios.post(
        `${serverUrl}/api/order/accept-order/${assignmentId}`, // ✅ must be a pure string id
        { userId: userData?.User?._id },
        { withCredentials: true },
      );

      if (result.data.success) {
        alert("Order Accepted successfully");
        await getCurrentOrder();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      getassignment();
      getCurrentOrder();
    }
  }, [userData]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-[#fff5f3] to-[#ffece6]">
      <Nav />

      <div className="mt-28 w-[90%] max-w-6xl">
        <p className="text-4xl text-center capitalize text-[#ff4d2d] font-extrabold tracking-wide drop-shadow-sm">
          welcome back {userData?.fullname?.toUpperCase()}
        </p>

        {/* location info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 bg-white/60 p-4 rounded-xl shadow-sm backdrop-blur-md">
          <p className="text-gray-800 font-semibold text-lg">
            your current location:
          </p>
          <div className="flex gap-2 ">
            <p className="text-xl font-bold text-[#ff4d2d]">
              longitude: {userData?.location?.coordinates?.[0]}
            </p>
            <p className="text-xl font-bold text-[#ff4d2d]">
              latitude: {userData?.location?.coordinates?.[1]}
            </p>
          </div>
        </div>

        {/* available orders */}
        {!currentAssignment && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md border border-orange-100 mt-8">
            <h1 className="text-2xl font-bold text-[#ff4d2d] mb-6 text-center">
              Available Assignments
            </h1>

            {loading && (
              <p className="text-center text-gray-500 animate-pulse">
                Loading assignments...
              </p>
            )}

            {!loading && assignments.length === 0 && (
              <p className="text-center text-gray-500">No active assignments</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-8 bg-gradient-to-br from-[#fff4ef] via-[#fffaf8] to-[#fff4ef] min-h-screen">
              {assignments.map((a, i) => (
                <div
                  key={i}
                  className="relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-2xl border border-[#ffd5c4] shadow-[0_10px_30px_rgba(255,77,45,0.15)] transition-all duration-700 group"
                >
                  {/* animated shimmer sweep */}
                  <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-20" />

                  {/* shop image (hero) */}
                  <div className="relative w-full h-60 overflow-hidden">
                    <img
                      src={a?.shop?.image}
                      alt="shop"
                      className="w-full h-full object-cover brightness-[0.98] group-hover:brightness-110 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* shimmer glow on top of image */}
                    <div className="absolute inset-0" />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h2 className="text-white font-bold text-xl tracking-wide">
                        {a?.shop?.name}
                      </h2>
                      <span className="text-xs text-white/80 capitalize">
                        {a?.status}
                      </span>
                    </div>
                  </div>

                  <div className="relative p-5 space-y-3">
                    <p className="text-gray-700 font-semibold">
                      {a?.shop?.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment:{" "}
                      <span className="font-semibold text-[#ff4d2d]">
                        {a?.payment}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Customer:{" "}
                      <span className="font-semibold">{a?.customer?.name}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Owner:{" "}
                      <span className="font-semibold text-[#ff4d2d]">
                        {a?.owner?.fullname}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {a?.owner?.email} | {a?.owner?.mobile}
                    </p>

                    {/* items list animated */}
                    <div className="mt-4 border-t border-[#ffdcd0] pt-3">
                      <p className="text-sm font-bold text-gray-800 mb-2">
                        Items:
                      </p>
                      <ul className="space-y-2 max-h-32 overflow-y-auto pr-2">
                        {a?.items?.map((it, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between text-sm bg-[#fff9f7] p-2 rounded-lg border border-[#ffe5dd] transition-all"
                          >
                            <div className="flex items-center space-x-2">
                              {it?.item?.image && (
                                <img
                                  src={it?.item?.image}
                                  alt={it?.name}
                                  className="w-9 h-9 rounded-lg object-cover shadow-sm"
                                />
                              )}
                              <span className="font-medium">
                                {it?.name} × {it?.quantity}
                              </span>
                            </div>
                            <span className="font-bold text-[#ff4d2d]">
                              ${it?.price * it?.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* total + animated accept */}
                    <div className="mt-5 border-t border-[#ffdcd0] pt-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-600">
                        Total:
                      </p>
                      <p className="text-xl font-bold">${a?.total}</p>
                    </div>

                    <p className="text-xs text-gray-400">
                      Order #{a?.orderId?.slice(-6)} |{" "}
                      {new Date(a?.createdAt).toLocaleString()}
                    </p>

                    <button
                      onClick={() => acceptorder(a.assignmentId)}
                      className="mt-5 w-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7a5c] text-white py-3 rounded-xl font-bold tracking-wide shadow-lg hover:shadow-[#ff4d2d]/40 transition-all duration-500"
                    >
                      Accept Order
                    </button>
                  </div>

                  {/* glowing animated bottom border */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff4d2d] via-[#ffa78d] to-[#ff4d2d] bg-[length:200%_200%]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {!currentAssignment && (
          <p className="text-center text-gray-400 text-xl animate-pulse">
            Fetching your assignment...
          </p>
        )}

        {currentAssignment && (
          <div>
            <div className="mt-28 w-[90%] max-w-6xl">
              <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,100,50,0.7)]">
                Current Delivery Assignment
              </h1>

              <div className="rounded-3xl p-8 backdrop-blur-2xl bg-white/10 border border-white/10 shadow-[0_0_60px_rgba(255,77,45,0.25)]">
                {/* top info */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                  <div className="flex items-center space-x-4">
                    <FaStore className="text-orange-400 text-4xl" />
                    <div>
                      <h2 className="text-3xl font-bold text-orange-400">
                        {currentAssignment?.shoporder?.shop?.name}
                      </h2>

                      <p className="text-gray-300 text-sm">
                        Status:{" "}
                        <span className="text-pink-400 font-semibold">
                          {currentAssignment?.shoporder?.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Accepted At:{" "}
                    <span className="text-orange-400">
                      {new Date(
                        currentAssignment?.assignment?.acceptedAt,
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* shop + customer + delivery info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* shop info */}
                  <div className="rounded-2xl bg-white/10 border border-white/20 p-6 shadow-inner">
                    <h3 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                      <FaStore className="text-orange-400" />{" "}
                      <span>Shop Info</span>
                    </h3>
                    <p className="text-gray-800 font-bold">
                      Name: {currentAssignment?.shoporder?.shop?.name}
                    </p>
                    <img
                      src={currentAssignment?.shoporder?.shop?.image}
                      className="w-90 h-90 object-cover rounded-lg "
                      alt="Shop Image"
                    />
                    <p className="text-gray-800 font-bold">
                      ID: {currentAssignment?.shoporder?.shop?._id}
                    </p>
                    <p className="text-gray-800 font-bold mt-2 text-sm">
                      Shop Order ID: {currentAssignment?.shoporder?._id}
                    </p>
                  </div>

                  {/* customer info */}
                  <div className="rounded-2xl bg-white/10 border border-white/20 p-6 shadow-inner">
                    <h3 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                      <FaUser className="text-pink-400" />{" "}
                      <span>Customer Info</span>
                    </h3>
                    <p className="text-gray-800 font-bold">
                      Name:{" "}
                      {currentAssignment?.assignment?.order?.user?.fullname}
                    </p>
                    <p className="text-gray-800 font-bold">
                      Email: {currentAssignment?.assignment?.order?.user?.email}
                    </p>

                    <p className="text-gray-800 font-bold">
                      Email:{" "}
                      {currentAssignment?.assignment?.order?.user?.mobile}
                    </p>

                    <p className="text-gray-800 font-bold">
                      Location:{" "}
                      {
                        currentAssignment?.assignment?.order?.deliveryAddress
                          ?.text
                      }
                    </p>
                  </div>

                  {/* delivery boy */}
                  <div className="rounded-2xl bg-white/10 border border-white/20 p-6 shadow-inner">
                    <h3 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                      <FaMotorcycle className="text-green-400" />{" "}
                      <span>Your Info</span>
                    </h3>
                    <p className="text-gray-800 font-bold">
                      Name:{" "}
                      {currentAssignment?.assignment?.assignedTo?.fullname}
                    </p>
                    <p className="text-gray-800 font-bold">
                      Mobile:{" "}
                      {currentAssignment?.assignment?.assignedTo?.mobile}
                    </p>
                    <p className="text-gray-800 font-bold">
                      Email: {currentAssignment?.assignment?.assignedTo?.email}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/20 p-6 shadow-inner">
                    <h3 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                      <span>Owner Info</span>
                    </h3>

                    <p className="text-gray-800 font-bold">
                      FullName:{" "}
                      {currentAssignment?.shoporder?.owner?.fullname.toUpperCase()}
                    </p>

                    <p className="text-gray-800 font-bold">
                      Email: {currentAssignment?.shoporder?.owner?.email}
                    </p>

                    <p className="text-gray-800 font-bold">
                      Mobile: {currentAssignment?.shoporder?.owner?.mobile}
                    </p>
                  </div>
                </div>

                {/* map + status timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
                    <h3 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-blue-400" />{" "}
                      <span>Delivery Route</span>
                    </h3>

                    <div>
                      <span className="font-semibold m-2">🗺️ Live Map</span>
                      <DeliveryTracking
                        customerLocation={currentAssignment?.customerlocation}
                        deliveryLocation={
                          currentAssignment?.deliveryboylocation
                        }
                        orderId={currentAssignment?.assignment?.order?._id}
                        shopOrderId={currentAssignment?.assignment?.shopOrderId}
                        customerName={
                          currentAssignment?.assignment?.order?.user?.fullname
                        }
                        showDeliveryActions={true}
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
                    <h3 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                      <FaBox className="text-yellow-400" />{" "}
                      <span>Order Progress</span>
                    </h3>

                    {/* progress timeline */}
                    <div className="relative pl-5 border-l-2 border-orange-400 space-y-4">
                      {["Accepted", "Out for Delivery", "Delivered"].map(
                        (stage, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -left-[11px] top-1 w-4 h-4 bg-orange-400 rounded-full " />
                            <p className="ml-3 font-semibold text-gray-400">
                              {stage}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* order items */}
                <div className="mt-10 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                  <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                    <FaBox className="text-orange-400" />{" "}
                    <span>Order Items</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentAssignment?.shoporder?.shopOrderItems?.map(
                      (item, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
                        >
                          <div className="flex flex-col space-y-2">
                            <img
                              src={item?.item?.image}
                              alt=""
                              className="h-40 w-40 rounded-lg object-cover"
                            />
                            <p className="text-xl font-bold text-gray-400">
                              <span className="text-orange-400 font-extrabold">
                                {item?.name}
                              </span>{" "}
                              × {item?.quantity}
                            </p>
                            <p className="text-orange-400 font-semibold">
                              ${item?.price * item?.quantity}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {!loading && !currentAssignment && (
                <p className="text-center text-gray-400 text-xl mt-10">
                  No active assignment found 😔
                </p>
              )}
            </div>
          </div>
        )}

        {/* Assignment Card */}
      </div>

      <div></div>
    </div>
  );
};

export default DeliveryBoy;
