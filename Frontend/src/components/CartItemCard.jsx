import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/userSlice";

const CartItemCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleDecrease = (id, currentqty) => {
    dispatch(updateQuantity({ id, quantity: Math.max(1, currentqty - 1) }));
  };
  const handleIncrease = (id, currentqty) => {
    dispatch(updateQuantity({ id, quantity: currentqty + 1 }));
  };
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all border">
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-20 h-20 object-cover rounded-xl border"
        />

        <div>
          <h1 className="font-semibold text-gray-800 text-lg">{data.name}</h1>
          <p className="text-gray-500 text-sm">
            {data.price} x {data.quantity}
          </p>
          <p className="font-bold text-gray-700 mt-1">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-full bg-red-500/60 hover:bg-red-500 transition-all"
          onClick={() => handleIncrease(data.id, data.quantity)}
        >
          <FaPlus className="text-white text-sm" />
        </button>
        <span className="mx-2 text-black font-bold text-lg">
          {data.quantity}
        </span>

        <button
          className="p-2 rounded-full bg-red-500/60 hover:bg-red-500 transition-all"
          onClick={() => handleDecrease(data.id, data.quantity)}
        >
          <FaMinus className="text-white text-sm" />
        </button>

        <button
          className="p-2 rounded-full bg-red-500/60 hover:bg-red-500 transition-all cursor-pointer"
          onClick={() => dispatch(removeItem(data.id))}
        >
          <FaTrashAlt className="text-white text-sm" />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
