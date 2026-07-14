import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { setCurrentCity } from "../redux/userSlice";

const ChangeCityModal = ({ onClose }) => {
  const [cityInput, setCityInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = cityInput.trim();
    if (!trimmed) return;
    dispatch(setCurrentCity(trimmed));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-[400px] relative shadow-2xl">
        <RxCross2
          size={22}
          className="absolute top-4 right-4 cursor-pointer text-gray-500"
          onClick={onClose}
        />
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Change City
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <FaLocationDot className="text-[#ff4d2d]" />
            <input
              type="text"
              autoFocus
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Enter city name e.g. Indore"
              className="w-full outline-0 text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="bg-[#ff4d2d] text-white rounded-lg py-2 font-medium hover:bg-[#e64528] transition"
          >
            Show restaurants
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeCityModal;
