// components/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, User, IdCard, Menu } from "lucide-react";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-900 text-white fixed top-4 left-4 z-50 rounded-md hover:bg-gray-700"
      >
        <Menu size={12} />
      </button>

      {/* Sidebar */}
      <aside
        className={`h-screen bg-zinc-50 text-gray-900 fixed flex-col p-4 py-12 transition-all duration-300 
          ${isOpen ? "w-64" : "w-16"} overflow-hidden`}
      >
        {/* Header */}
        <div className="mb-8 text-lxl font-bold whitespace-nowrap overflow-hidden">
          {isOpen ? "🌐 Identity Ecosystem" : "🌐"}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
          >
            <User size={20} />
            {isOpen && <span>Profile</span>}
          </Link>

          <Link
            href="/identities"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
          >
            <IdCard size={20} />
            {isOpen && <span>Identities</span>}
          </Link>

          <button
            onClick={() => alert("Handle logout")}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-500 mt-auto"
          >
            <LogOut size={20} />
            {isOpen && <span>Log out</span>}
          </button>
        </nav>
      </aside>
    </div>
  );
}
