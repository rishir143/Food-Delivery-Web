import React, { useEffect, useState } from "react";
import { MdCheckCircle, MdDeliveryDining } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const OrderPlaced = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  const [orderId] = useState(`#DSDH-${Math.floor(Math.random() * 1000000)}`);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/my-order");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e]" />
      <div className="z-10 w-[90%] max-w-[800px] bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/40 shadow-[0_0_60px_rgba(255,77,45,0.4)] text-center space-y-10">
        <div className="flex justify-center">
          <MdCheckCircle className="text-green-500" size={90} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-lg">
            Order Placed Successfully 🎉
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Your delicious food is being prepared with love 💖
          </p>
        </div>
        <div className="relative flex justify-center mt-8">
          <MdDeliveryDining
            size={80}
            className="text-[#ff4d2d] drop-shadow-lg"
          />
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="text-left space-y-3">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-[#ff4d2d]">Order ID:</span>{" "}
              {orderId}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-[#ff4d2d]">Payment:</span>{" "}
              Cash on Delivery
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-[#ff4d2d]">Delivery:</span>{" "}
              25–35 mins (approx)
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-[#ff4d2d]">Address:</span>{" "}
              Your selected delivery address
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 text-sm">
            Redirecting to home in{" "}
            <span className="text-[#ff4d2d] font-bold">{countdown}</span>{" "}
            seconds...
          </p>

          <button
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-[#ff4d2d] to-[#ff9a9e] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-[0_0_25px_rgba(255,77,45,0.4)]"
            onClick={() => navigate("/my-order")}
          >
            Go to Home <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
