import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

const CartPage = () => {
  const { cartItems, totalamount } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center p-6 bg-[#fff9f6]">
      <div className="w-full max-w-[800px]">
        <div className="flex items-center gap-[20px] mb-6 ">
          <div
            className="absolute top-[20px] left-[20px] z-[10] mb-[10px] "
            onClick={() => navigate("/")}
          >
            <IoArrowBackOutline size={35} className="text-[#ff4d2d] " />
          </div>
          <h1 className="text-2xl font-bold text-start">Your Cart</h1>
        </div>
        {cartItems?.length == 0 ? (
          <p className="text-gray-500 text-lg text-center">
            {" "}
            Your cart is empty 😢
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems?.map((item, index) => (
              <div key={index}>
                <CartItemCard data={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-lg border-t border-gray-200 p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm">Total Price</p>
            <h2 className="text-2xl font-bold text-gray-800">₹{totalamount}</h2>
          </div>
          <button
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all "
            onClick={() => navigate("/checkout")}
          >
            {" "}
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
