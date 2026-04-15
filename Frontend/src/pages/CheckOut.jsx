import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";

import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";

const CheckOut = () => {
  const navigate = useNavigate();
  const { location } = useSelector((state) => state.map);

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
              />
              <button className="animate-spin h-5 w-5 border-t-2 border-white rounded-full mx-auto">
                <GoSearch size={25} />
              </button>
              <button className="p-3 rounded-2xl bg-[#6a11cb] text-white hover:bg-[#520ea1] shadow-lg shadow-purple-300 transition">
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
                  <Marker position={[location?.lat, location?.lon]} />
                </MapContainer>{" "}
                a
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOut;
