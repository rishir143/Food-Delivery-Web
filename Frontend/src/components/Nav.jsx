import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { FaPlus } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ChangeCityModal from "./ChangeCityModal";

const Nav = () => {
  const { userData, currentCity, cartItems } = useSelector(
    (state) => state.user,
  );
  const [showCityModal, setShowCityModal] = useState(false);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      {userData.role == "user" && showSearch && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot className="text-[#ff4d2d]" />
            <div
              className="w-[80%] truncate text-gray-600 cursor-pointer hover:text-[#ff4d2d]"
              onClick={() => setShowCityModal(true)}
            >
              {currentCity}
            </div>
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

      {userData.role == "user" && (
        <div className="md:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot className="text-[#ff4d2d]" />
            <div
              className="w-[80%] truncate text-gray-600 cursor-pointer hover:text-[#ff4d2d]"
              onClick={() => setShowCityModal(true)}
            >
              {currentCity}
            </div>
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

      <div className="flex items-center gap-4">
        {userData.role == "user" &&
          (showSearch ? (
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
          ))}

        {userData.role == "owner" ? (
          <>
            {" "}
            {myShopData && (
              <>
                {" "}
                <button
                  className="hidden md:flex items-center gap-1 p-2 cursor-point rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]"
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus size={20} />
                  <span>Add Food Item</span>
                </button>
                <button
                  className=" md:hidden flex items-center gap-1 p-2 cursor-point rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]"
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus size={20} />
                </button>{" "}
              </>
            )}
            <div
              className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium"
              onClick={() => navigate("/my-order")}
            >
              <FaReceipt size={20} />
              <span>My Order</span>
              <span
                className="absolute
          -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px] "
              >
                {myShopData?.items?.length || 0}
              </span>
            </div>
            <div
              className=" md:hidden items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium"
              onClick={() => navigate("/my-order")}
            >
              <FaReceipt size={20} />
              <span
                className="absolute
          -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px] "
              >
                {myShopData?.items?.length || 0}
              </span>
            </div>
          </>
        ) : (
          <>
            {userData.role == "user" && (
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <FiShoppingCart size={25} className="text-[#ff4d2d]" />
                <span
                  className="absolute
        right-[-9px] top-[-12px] text-[#ff4d2d] "
                >
                  <span className="text-red-700">{cartItems.length}</span>
                </span>
              </div>
            )}

            <button
              className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer"
              onClick={() => navigate("/my-order")}
            >
              My order
            </button>
          </>
        )}

        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullname?.slice(0, 1)}
        </div>
        {showInfo && (
          <div
            className={`fixed top-[70px] right-[10px] 
              {userData.role == "deliveryBoy" ? md:right-[10%] lg:right-[37%] :  md:right-[10%] lg:right-[25%] }
              md:right-[10%] lg:right-[25%] w-[180px] bg-white/95 backdrop-blur-2xl shadow-2xl rounded-2xl p-[20px] flex flex-col gap-3 border border-[#ff6a00]/20`}
          >
            <div className="text-[17px] font-semibold ">
              {userData?.fullname}
            </div>

            <div
              className="md:hidden bg-[#ff6a00]/10 text-[#ff6a00] font-semibold cursor-pointer"
              onClick={() => navigate("/my-order")}
            >
              My Order
            </div>

            <div
              className="text-[#ff6a00] font-semibold cursor-pointer hover:text-gray-800 transition-all duration-300"
              onClick={handleSignOut}
            >
              Log Out
            </div>
          </div>
        )}
        {showCityModal && (
          <ChangeCityModal onClose={() => setShowCityModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Nav;
