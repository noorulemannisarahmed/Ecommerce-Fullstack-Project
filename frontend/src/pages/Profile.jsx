import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ShoppingBag,
} from "lucide-react";

// ── Mock Orders Data ──────────────────────────────────────────
const mockOrders = [
  {
    id: "#ORD-001",
    date: "June 20, 2026",
    status: "Delivered",
    total: 7999,
    items: [
      { name: "Mechanical Keyboard", qty: 1, price: 7999, img: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "#ORD-002",
    date: "June 22, 2026",
    status: "Shipped",
    total: 7497,
    items: [
      { name: "Wireless Headphones", qty: 1, price: 4999, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop" },
      { name: "USB-C Cable", qty: 5, price: 499, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "#ORD-003",
    date: "June 25, 2026",
    status: "Pending",
    total: 2499,
    items: [
      { name: "Wireless Mouse", qty: 1, price: 2499, img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "#ORD-004",
    date: "June 10, 2026",
    status: "Cancelled",
    total: 1999,
    items: [
      { name: "Laptop Stand", qty: 1, price: 1999, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80&h=80&fit=crop" },
    ],
  },
];

const statusConfig = {
  Delivered:  { color: "text-green-600",  bg: "bg-green-50",  border: "border-green-200",  Icon: CheckCircle },
  Shipped:    { color: "text-indigo-600",   bg: "bg-indigo-50",   border: "border-indigo-200",   Icon: Truck },
  Pending:    { color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200", Icon: Clock },
  Cancelled:  { color: "text-red-500",    bg: "bg-red-50",    border: "border-red-200",    Icon: XCircle },
};

const navItems = [
  { key: "orders",   label: "My Orders",          Icon: Package },
  { key: "profile",  label: "Personal Info",       Icon: User },
  { key: "address",  label: "Manage Address",      Icon: MapPin },
  { key: "payment",  label: "Payment Method",      Icon: CreditCard },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredOrders = filterStatus === "All"
    ? mockOrders
    : mockOrders.filter((o) => o.status === filterStatus);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-5 items-start">

        {/* ── SIDEBAR ── */}
        <div className="w-full lg:w-64 flex-shrink-0">

          {/* User card */}
          <div className="bg-white rounded-2xl p-5 shadow-md mb-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              {user?.role === "admin" && (
                <span className="text-[10px] bg-indigo-100 text-indigo-600 font-bold px-2 py-0.5 rounded-full">
                  ADMIN
                </span>
              )}
            </div>
          </div>

          {/* Nav */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {navItems.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center justify-between px-4 py-3.5 text-sm transition-all border-b border-gray-50 last:border-0 ${
                  activeTab === key
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={activeTab === key ? "text-indigo-600" : "text-gray-400"} />
                  {label}
                </div>
                <ChevronRight size={14} className="text-gray-300" />
              </button>
            ))}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 min-w-0">

          {/* ── ORDERS TAB ── */}
          {activeTab === "orders" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-indigo-600" />

                  My Orders
                </h2>
                {/* Filter */}
                <div className="flex gap-2 flex-wrap">
                  {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        filterStatus === s
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-500 border border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl p-10 text-center text-gray-400 text-sm shadow-sm">
                  No orders found
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const { color, bg, border, Icon: StatusIcon } = statusConfig[order.status];
                  return (
                    <div key={order.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                      {/* Order header */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-800">{order.id}</span>
                          <span className="text-xs text-gray-400">{order.date}</span>
                        </div>
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${color} ${bg} ${border}`}>
                          <StatusIcon size={12} />
                          {order.status}
                        </span>
                      </div>

                      {/* Order items */}
                      <div className="px-5 py-3 flex flex-col gap-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-14 h-14 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5">Qty: {item.qty}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-800 flex-shrink-0">
                              Rs. {item.price.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Order footer */}
                      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          Total: <span className="font-bold text-gray-800">Rs. {order.total.toLocaleString()}</span>
                        </span>
                        <button className="text-xs text-indigo-600 font-semibold hover:underline">
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ── PERSONAL INFO TAB ── */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
                <User size={18} className="text-indigo-600" />

                Personal Information
              </h2>
              <div className="flex flex-col gap-4 max-w-md">
                {[
                  { label: "Full Name", value: user?.name, placeholder: "Your full name" },
                  { label: "Email Address", value: user?.email, placeholder: "your@email.com" },
                  { label: "Phone Number", value: "", placeholder: "+92 300 0000000" },
                ].map(({ label, value, placeholder }) => (
                  <div key={label}>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
                    <input
                      defaultValue={value}
                      placeholder={placeholder}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all"
                    />
                  </div>
                ))}
                <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all mt-2">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ── ADDRESS TAB ── */}
          {activeTab === "address" && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
                <MapPin size={18} className="text-indigo-600" />

                Manage Address
              </h2>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <MapPin size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-400 mb-3">No saved addresses yet</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all">
                  + Add New Address
                </button>
              </div>
            </div>
          )}

          {/* ── PAYMENT TAB ── */}
          {activeTab === "payment" && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
                <CreditCard size={18} className="text-indigo-600" />

                Payment Method
              </h2>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <CreditCard size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-400 mb-3">No saved payment methods</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all">
                  + Add Payment Method
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}