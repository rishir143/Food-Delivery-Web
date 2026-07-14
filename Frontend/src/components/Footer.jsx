import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const _navigate = useNavigate();
  return (
    <footer className="w-full bg-black text-gray-300 pt-14 pb-10 px-6 md:px-16 lg:px-24 border-t border-gray-800">
      {/* TOP — GRID LINKS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
        {/* About */}
        <div>
          <h3 className="text-white font-bold text-xl mb-4">About DishDash</h3>
          <ul className="space-y-2">
            {[
              "Company Info",
              "Careers",
              "Press Releases",
              "DishDash Services",
            ].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-[#ff4d2d] transition-colors duration-300 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-white font-bold text-xl mb-4">Help</h3>
          <ul className="space-y-2">
            {[
              "Your Orders",
              "Returns",
              "Refund Policy",
              "Customer Support",
            ].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-[#ff4d2d] transition-colors duration-300 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-white font-bold text-xl mb-4">Connect With Us</h3>
          <ul className="space-y-2">
            {[
              "Our Team",
              "Partnerships",
              "Affiliate Program",
              "Investor Relations",
            ].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-[#ff4d2d] transition-colors duration-300 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-white font-bold text-xl mb-4">Policies</h3>
          <ul className="space-y-2">
            {[
              "Privacy Policy",
              "Terms & Conditions",
              "Licenses",
              "Cookies",
            ].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-[#ff4d2d] transition-colors duration-300 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center gap-7 mb-10">
        {/* Facebook */}
        <a
          href="facebook link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#ff4d2d] transition-colors cursor-pointer"
        >
          <FaFacebook size={28} />
        </a>

        {/* Instagram */}
        <a
          href="instagram link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#ff4d2d] transition-colors cursor-pointer"
        >
          <FaInstagram size={28} />
        </a>

        {/* LinkedIn */}
        <a
          href="Linkedin Profile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#ff4d2d] transition-colors cursor-pointer"
        >
          <FaLinkedin size={28} />
        </a>
      </div>

      {/* CREDIT SECTION */}
      <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-6">
        <p className="mb-1">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">DishDash</span>. All Rights
          Reserved.
        </p>
        <p className="tracking-wide">
          <a
            href="vercellink"
            className="text-[#ff4d2d] font-bold hover:text-[#ff4d2d] transition-colors cursor-pointer"
          >
            Developer By Rishiraj Choubey
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
