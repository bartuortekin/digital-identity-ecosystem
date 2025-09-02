"use client";

import React from "react";
import Link from "next/link";

interface NavBarProps {
  currentUser: string | null;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser, onLogout }) => {
  return (
    <nav className="bg-white shadow px-6 py-4 w-full flex items-center">
      {/* Left spacer */}
      <div className="flex-1"></div>

      {/* Menu links */}
      {currentUser && (
        <div className="flex flex-1 justify-center space-x-16">
          <Link
            href="/"
            className="text-2xl font-semibold text-blue-600 hover:underline"
          >
            Map
          </Link>
          <Link
            href="/about"
            className="text-2xl font-semibold text-blue-600 hover:underline"
          >
            About
          </Link>
          <Link
            href="/import"
            className="text-2xl font-semibold text-blue-600 hover:underline"
          >
            Import
          </Link>
          <Link
            href="/analyze"
            className="text-2xl font-semibold text-blue-600 hover:underline"
          >
            Analyze
          </Link>
          <Link
            href="/intelligence"
            className="text-2xl font-semibold text-blue-600 hover:underline"
          >
            Intelligence
          </Link>
        </div>
      )}

      {/* Auth buttons / Logout on the right */}
      <div className="flex-1 flex justify-end space-x-4">
        {!currentUser ? (
          <>
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout Anam
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
