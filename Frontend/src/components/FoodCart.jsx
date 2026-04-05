import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Addtocart } from "../redux/userSlice";

const FoodCart = ({ data }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(0);
  const renderstars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500 text-lg" />
        ) : (
          <FaRegStar key={i} className="text-yellow-500 text-lg" />
        ),
      );
    }
    return stars;
  };

  const handleIncreaseQuantity = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
    }
  };

  return (
    <div className="w-[250px] rounded-2xl border-2 border-[#ff2d4d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative w-full h-[170px] flex justify-center items-center bg-white">
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
          {data.foodType == "veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>

        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col ">
        <h1 className="font-semibold text-gray-900 text-base truncate">
          {data.name}
        </h1>

        <div className="flex items-center gap-1 mt-1">
          {renderstars(data?.rating?.average || 3)}
          <span className="text-xs text-gray-500 ml-1">
            {data.rating?.count || 3}
          </span>
        </div>

        <div className="flex justify-between items-center mt-auto p-2">
          <span className="font-bold text-gray-900 text-lg">
            ₹{data?.price}
          </span>

          <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
            <button
              className="px-2 py-1 hover:bg-gray-100 transition "
              onClick={handleDecreaseQuantity}
            >
              <FaMinus size={16} />
            </button>
            <span>{quantity}</span>
            <button
              className="px-2 py-1 hover:bg-gray-100 transition "
              onClick={handleIncreaseQuantity}
            >
              <FaPlus size={16} />
            </button>
            <button
              className={` ${cartItems.some((item) => item.id === data._id) ? "bg-gray-400" : "bg-[#ff4d2d]"} text-white px-3 py-2 transition-colors`}
              onClick={() =>
                quantity > 0
                  ? dispatch(
                      Addtocart({
                        id: data._id,
                        name: data.name,
                        image: data.image,
                        price: data.price,
                        shop: data.shop,
                        quantity,
                        foodType: data.foodType,
                      }),
                    )
                  : ""
              }
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
