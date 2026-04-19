import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";

import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";
import { MdDeliveryDining } from "react-icons/md";

const RecenterMap = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location?.lat && location?.lon) {
      map.flyTo([location.lat, location.lon], 16, { animate: true });
    }
  }, [location]);
  return null;
};

const CheckOut = () => {
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cod");
  const { cartItems, totalamount } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { location, address } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const apikey = import.meta.env.VITE_GEOAPIKEY;

  const deliveryfee = totalamount > 500 ? 0 : 50;

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  const ondragend = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat: lat, lon: lng }));
    getAddressByLatLong(lat, lng);
  };

  const getAddressByLatLong = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apikey}`,
      );
      dispatch(setAddress(result?.data?.results[0]?.address_line2));
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, lon: longitude }));
      getAddressByLatLong(latitude, longitude);
    });
  };

  const getLongLatByAddress = async () => {
    try {
      const result =
        await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apikey}
`);
      const { lat, lon } = result.data.features[0].properties;
      console.log(result.data.features[0].properties);
      dispatch(setLocation({ lat: lat, lon: lon }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff9f6] flex justify-center items-center p-6">
      <div
        className="absolute top-[20px] left-[20px] z-10"
        onClick={() => navigate("/")}
      >
        <IoArrowBackOutline size={35} className="text-[#ff4d2d] " />
      </div>
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">CheckOut</h1>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {" "}
            <FaLocationDot className="text-[#ff4d2d]" /> Delivery Location
          </h2>
          <div className="relative">
            <div className="flex items-center gap-3">
              <input
                type="text"
                className="flex-1 border border-gray-300 focus:outline-none focus:border-[#ff4d2d] rounded-2xl p-3 text-md text-gray-800 shadow-inner bg-white/50 backdrop-blur-sm"
                placeholder="Enter Your Delievery Address"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
              />
              <button
                className="p-2  border-t-2 border-white bg-blue-400  text-white rounded-xl mx-auto"
                onClick={getLongLatByAddress}
              >
                <GoSearch size={28} />
              </button>
              <button
                className="p-3 rounded-2xl bg-[#6a11cb] text-white hover:bg-[#520ea1] shadow-lg shadow-purple-300 transition"
                onClick={getCurrentLocation}
              >
                <BiCurrentLocation size={22} />
              </button>
            </div>

            <div className="rounded-[2rem] border border-gray-200 overflow-hidden shadow-2xl mt-6 relative">
              <div className="h-[420px] w-full relative">
                <MapContainer
                  center={[location?.lat, location?.lon]}
                  zoom={15}
                  scrollWheelZoom={true}
                  className="h-full w-full z-10"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <RecenterMap location={location} />
                  <Marker
                    position={[location?.lat, location?.lon]}
                    draggable
                    eventHandlers={{ dragend: ondragend }}
                  />
                </MapContainer>{" "}
                a
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-5 text-gray-800 text-center tracking-wide">
            Choose Your Payment Method
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`flex items-center gap-4 rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                  paymentMethod === "Cod"
                    ? "border-[#ff4d2d] bg-gradient-to-r from-orange-50 to-orange-100 shadow-[0_0_25px_rgba(255,77,45,0.3)]"
                    : "border-gray-200 hover:border-[#ff4d2d]/60 bg-white"
                }`}
                onClick={() => setPaymentMethod("Cod")}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 shadow-inner">
                  <MdDeliveryDining className="text-green-600" size={28} />
                </div>
                <div>
                  <p
                    className={`font-semibold text-[16px] ${
                      paymentMethod === "Cod"
                        ? "text-[#ff4d2d]"
                        : "text-gray-700"
                    }`}
                  >
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-gray-500">
                    Pay when your food arrives at your door
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-4 rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                  paymentMethod === "Online"
                    ? "border-[#ff4d2d] bg-gradient-to-r from-orange-50 to-orange-100 shadow-[0_0_25px_rgba(255,77,45,0.3)]"
                    : "border-gray-200 hover:border-[#ff4d2d]/60 bg-white"
                }`}
                onClick={() => setPaymentMethod("Online")}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-600"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 7.5h19.5M3.75 7.5v9.75A2.25 2.25 0 006 19.5h12a2.25 2.25 0 002.25-2.25V7.5m-1.5 0V6A2.25 2.25 0 0016.5 3.75h-9A2.25 2.25 0 005.25 6v1.5m3.75 7.5h6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`font-semibold text-[16px] ${
                      paymentMethod === "Online"
                        ? "text-[#ff4d2d]"
                        : "text-gray-700"
                    }`}
                  >
                    Online Payment
                  </p>
                  <p className="text-xs text-gray-500">
                    Pay securely via card, mobile banking or wallet
                  </p>
                </div>
              </div>
            </div>
          </h2>
        </section>
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-gray-800 text-center mb-6 tracking-wide">
            Order Summary
          </h2>
          <div className="rounded-3xl border border-gray-200 bg-white/60 backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.05)] p-5 space-y-3 max-h-[260px] overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white/70 hover:bg-orange-50 transition-all duration-300 rounded-2xl p-3 shadow-sm"
                >
                  {/* 🛍️ Item name + qty */}
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-800 text-[15px] leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: <span className="font-medium">{item.quantity}</span>
                    </p>
                  </div>

                  {/* 💰 Price */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-700">
                      ₹{item.price} × {item.quantity}
                    </p>
                    <p className="text-base font-bold text-[#ff4d2d]">
                      ₹{totalamount}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm italic">
                No items in your cart
              </p>
            )}
          </div>
          <hr className="border-gray-200 my-2" />
          <div className="mt-6 bg-gradient-to-r from-[#ff9a9e] to-[#ff4d2d] rounded-2xl p-4 text-white shadow-[0_0_40px_rgba(255,77,45,0.4)]">
            <div className="flex justify-between text-lg font-semibold mb-1">
              <span>Subtotal</span>
              <span>{totalamount}</span>
            </div>

            <div className="flex justify-between text-sm opacity-90">
              <span>Delivery Fee</span>
              <span className="font-bold">
                {" "}
                {deliveryfee == "0" ? "Free" : deliveryfee}
              </span>
            </div>

            <div className="border-t border-white/40 my-2"></div>

            <div className="flex justify-between text-xl font-bold tracking-wide">
              <span>Total</span>
              <span>{totalamount + deliveryfee}</span>
            </div>
          </div>
        </section>
        <button className="w-full bg-[#ff4d2d]/80  text-white font-bold py-4 rounded-[1.5rem] shadow-[0_0_40px_rgba(255,77,45,0.5)] hover:bg-[#ff4d2d]/90  transition text-xl tracking-wide cursor-pointer">
          {paymentMethod == "Cod" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
