import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "../pages/CategoryCard";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import FoodCart from "./FoodCart";

const UserDashboard = () => {
  const { currentCity, shopsInMyCity, itemsInMyCity } = useSelector(
    (state) => state.user,
  );
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const UpdateBtn = (cateScrollRef, setLeftButton, setRightButton) => {
    const element = cateScrollRef.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth,
      );
    }
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    UpdateBtn(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
    UpdateBtn(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    const cateElement = cateScrollRef.current;
    const shopElement = shopScrollRef.current;

    const handleCateScroll = () => {
      UpdateBtn(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
    };

    const handleShopScroll = () => {
      UpdateBtn(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    };

    if (cateElement) {
      cateElement.addEventListener("scroll", handleCateScroll);
    }

    if (shopElement) {
      shopElement.addEventListener("scroll", handleShopScroll);
    }

    return () => {
      if (cateElement) {
        cateElement.removeEventListener("scroll", handleCateScroll);
      }

      if (shopElement) {
        shopElement.removeEventListener("scroll", handleShopScroll);
      }
    };
  }, [categories, shopsInMyCity]);
  return (
    <div className="w-full md: max-w-6xl flex flex-col gap-5 items-start p-[10px] ">
      <h1 className="text-gray-800 text-2xl sm:text-3xl ">
        Inspiration for your first order
      </h1>
      <div className="w-full relative">
        {showLeftCateButton && (
          <button
            className="absolute
        left-0 top-1/2 -translate-y-1/2 bg-[#ff2d4d] text-white p-2 rounded-full shadow-full hover:bg-[#e64528] z-10 "
            onClick={() => scrollHandler(cateScrollRef, "left")}
          >
            <FaArrowCircleLeft />
          </button>
        )}

        <div
          className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar"
          ref={cateScrollRef}
        >
          {categories.map((cate, index) => (
            <CategoryCard name={cate.category} image={cate.image} key={index} />
          ))}
        </div>

        {showRightCateButton && (
          <button
            className="absolute
        right-0 top-1/2 -translate-y-1/2 bg-[#ff2d4d] text-white p-2 rounded-full shadow-full hover:bg-[#e64528] z-10 "
            onClick={() => scrollHandler(cateScrollRef, "right")}
          >
            <FaArrowCircleRight />
          </button>
        )}
      </div>

      <div className="w-full md: max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl ">
          Best Restaurants in {currentCity}
        </h1>

        <div className="w-full relative">
          {showLeftShopButton && (
            <button
              className="absolute
        left-0 top-1/2 -translate-y-1/2 bg-[#ff2d4d] text-white p-2 rounded-full shadow-full hover:bg-[#e64528] z-10 "
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaArrowCircleLeft />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar"
            ref={shopScrollRef}
          >
            {shopsInMyCity?.map((shop, index) => (
              <CategoryCard name={shop.name} image={shop.image} key={index} />
            ))}
          </div>

          {showRightShopButton && (
            <button
              className="absolute
        right-0 top-1/2 -translate-y-1/2 bg-[#ff2d4d] text-white p-2 rounded-full shadow-full hover:bg-[#e64528] z-10 "
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaArrowCircleRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full md: max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl ">
          Suggested Food items
        </h1>
        <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
          {itemsInMyCity?.map((item, index) => (
            <FoodCart key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
