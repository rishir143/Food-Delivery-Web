import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const Nav = () => {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const _result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
    } catch (error) {
      console.log(`Signout Error ${error}`);
    }
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[999] bg-[#fff9f6] overflow-visible ">
      {showSearch && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          <div className="w-[80%] flex items-center gap-[10px]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="serach delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">DishDash</h1>
      <div className="md:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">{city}</div>
        </div>
        <div className="w-[80%] flex items-center gap-[10px]">
          <IoIosSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="serach delicious food..."
            className="px-[10px] text-gray-700 outline-0 w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {showSearch ? (
          <RxCross2
            size={25}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch(false)}
          />
        ) : (
          <IoIosSearch
            size={25}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        )}

        <div className="relative cursor-pointer">
          <FiShoppingCart size={25} className="text-[#ff4d2d]" />
          <span
            className="absolute
        right-[-9px] top-[-12px] text-[#ff4d2d] "
          >
            0
          </span>
        </div>
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer">
          My order
        </button>
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullname.slice(0, 1)}
        </div>
        {showInfo && (
          <div
            className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px]
        bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]"
          >
            <div className="text-[17px] font-semibold ">
              {userData?.fullname}
            </div>
            <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
              My Order
            </div>
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleSignOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
