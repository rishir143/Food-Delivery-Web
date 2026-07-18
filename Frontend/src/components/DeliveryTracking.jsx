import React, { useEffect, useState } from "react";
import L from "leaflet";

import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import scooter from "../assets/scooter.png";

import home from "../assets/home.png";
import axios from "axios";
import { serverUrl } from "../App";

const deliveryboyicon = new L.Icon({
  iconUrl: scooter,
  iconSize: [60, 60],
  iconAnchor: [30, 60],
});

const customericon = new L.Icon({
  iconUrl: home,
  iconSize: [55, 55],
  iconAnchor: [27, 55],
});

const DeliveryTracking = ({ data, data2, data3, showDeliveryActions }) => {
  const customerLat = data?.lat;
  const customerLon = data?.lon;
  const deliveryLat = data2?.lat;
  const deliveryLon = data2?.lon;
  const center = [deliveryLat || 0, deliveryLon || 0];
  const [showotp, setshowotp] = useState(false);
  const [otp, setOtp] = useState("");
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (deliveryLat && deliveryLon && customerLat && customerLon) {
      setPath([
        [deliveryLat, deliveryLon],
        [customerLat, customerLon],
      ]);
    }
  }, [deliveryLat, deliveryLon, customerLat, customerLon]);

  const sendOtp = async () => {
    try {
      await axios.post(
        `${serverUrl}/order/senddelotp`,
        { orderId: data3 },
        { withCredentials: true },
      );
    } catch (error) {
      console.error(
        "Failed to send OTP",
        error?.response?.data || error.message,
      );
    }
  };

  return (
    <div className="w-full px-6 py-5 backdrop-blur-2xl bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 rounded-[2rem] border border-gray-700 shadow-[0_0_50px_rgba(255,77,45,0.4)] overflow-hidden relative">
      {showDeliveryActions && (
        <div>
          <h1 className="text-center text-3xl font-extrabold text-orange-400 tracking-wider">
            DishDash Delivery Tracking
          </h1>
          <h1 className="text-center text-xl font-extrabold text-orange-400 tracking-wider mt-4">
            Customer Lat:{customerLat}, Customer Lon:{customerLon}
          </h1>
          <h1 className="text-center text-xl font-extrabold text-orange-400 tracking-wider mt-4">
            Your Lat:{deliveryLat}, Your Lon:{deliveryLon}
          </h1>
        </div>
      )}
      <div className="mt-6 relative overflow-hidden rounded-3xl border border-orange-500/40 shadow-[0_0_25px_rgba(255,77,45,0.3)]">
        <div className="h-[300px] w-full relative">
          <MapContainer
            center={center}
            zoom={14}
            scrollWheelZoom={true}
            className="h-full w-full z-10 rounded-3xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[deliveryLat, deliveryLon]}
              icon={deliveryboyicon}
            >
              <Popup>
                <div className="font-bold text-center text-orange-600">
                  Delivery Boy
                </div>
              </Popup>
            </Marker>

            <Marker position={[customerLat, customerLon]} icon={customericon}>
              <Popup>
                <div className="font-bold text-center text-green-700">
                  Customer
                </div>
              </Popup>
            </Marker>

            {path.length > 0 && (
              <Polyline
                positions={path}
                color="orange"
                weight={6}
                opacity={0.8}
              />
            )}
          </MapContainer>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-16 h-16 bg-orange-400/40 rounded-full blur-2xl" />
          </div>

          <div className="absolute top-5 left-5 text-white font-semibold bg-orange-500/30 px-4 py-2 rounded-full shadow-xl backdrop-blur-xl border border-orange-400/50">
            Live tracking enabled
          </div>

          <div className="absolute inset-0 border-2 border-transparent rounded-3xl" />
        </div>
        {showDeliveryActions && (
          <div className="mt-5">
            <button
              className="text-amber-500 font-bold w-full bg-green-700 rounded-xl hover:bg-green-800 transition-all duration-400 cursor-pointer"
              onClick={() => setshowotp((prev) => !prev)}
            >
              Mark as Delivered
            </button>

            {showotp && (
              <div className="mt-4">
                <button
                  className="w-full bg-green-600 p-4 font-bold text-white"
                  onClick={sendOtp}
                >
                  Send OTP
                </button>

                <p className="font-bold text-md text-center">
                  Enter the OTP from{" "}
                  <span className="text-[#ff4d2d] font-bold">{data3}</span>
                </p>

                <input
                  type="text"
                  className="w-full border-2 focus:border-orange-600 focus:outline-none rounded-lg p-4 mt-3 mb-4"
                  placeholder="Enter The OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />

                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold mb-3 rounded-lg cursor-pointer p-3">
                  Submit OTP
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryTracking;
