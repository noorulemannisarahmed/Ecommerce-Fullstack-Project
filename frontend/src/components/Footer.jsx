import React from "react";
import ReactCountryFlag from "react-country-flag";
import { ShoppingCart, ChevronDown, Apple, Play } from "lucide-react";

const footerCols = [
  { title: "About", items: ["About Us", "Find store", "Categories", "Blogs"] },
  { title: "Partnership", items: ["About Us", "Find store", "Categories", "Blogs"] },
  { title: "Information", items: ["Help Center", "Money Refund", "Shipping", "Contact us"] },
  { title: "For users", items: ["Login", "Register", "Settings", "My Orders"] },
];

const socials = [
  { icon: "f", link: "facebook.com", color: "hover:text-blue-600" },
  { icon: "𝕏", link: "twitter.com", color: "hover:text-gray-600" },
  { icon: "in", link: "linkedin.com", color: "hover:text-blue-500" },
  { icon: "📷", link: "instagram.com", color: "hover:text-pink-500" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 mb-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-600 p-1.5 rounded">
              <ShoppingCart className="text-white" size={16} />
            </div>
            <span className="font-bold text-lg">Amazon</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[220px] mb-4">
            Best information about the company gies here but now lorem ipsum is
          </p>
          <div className="flex gap-2">
            {socials.map((social, i) => (
              <a
                key={i}
                href={`https://${social.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 cursor-pointer text-xs font-bold ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <p className="font-semibold text-sm mb-3">{col.title}</p>
            <div className="flex flex-col gap-2">
              {col.items.map((item) => (
                <span key={item} className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="col-span-1">
          <p className="font-semibold text-sm mb-3">Get app</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-gray-900 text-white rounded px-3 py-2 w-fit cursor-pointer hover:bg-gray-800">
              <Apple size={14} />
              <span className="text-[10px] leading-tight">
                Download on the
                <br />
                <span className="text-xs font-semibold">App Store</span>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900 text-white rounded px-3 py-2 w-fit cursor-pointer hover:bg-gray-800">
              <Play size={14} />
              <span className="text-[10px] leading-tight">
                Get it on
                <br />
                <span className="text-xs font-semibold">Google Play</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm text-gray-500">
          <span>© 2023 Ecommerce.</span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
            <ReactCountryFlag countryCode="US" svg style={{ width: "20px", height: "20px" }} />
            English <ChevronDown size={12} />
          </span>
        </div>
      </div>
    </footer>
  );
}
