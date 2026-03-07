import React from "react";

const CategoryCard = ({ name, image }) => {
  return (
    <div
      className="w-[120px] h-[120px] md:h-[180px] rounded-2xl border-2 border-[#ff2d4d] shrink-0 overflow-hidden bg-white shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow relative
    "
    >
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute w-full left-0 bottom-0 bg-[#ffffff96] text-gray-800 bg-opacity-95 px-3 py-1 rounded-t-xl text-center shadow text-sm font-medium backdrop-blur">
        {name}
      </div>
    </div>
  );
};

export default CategoryCard;
