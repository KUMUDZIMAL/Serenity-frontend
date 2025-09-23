"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include", // Ensure cookies are included in the request
        });
        if (response.ok) {
          const data = await response.json();
          if (data._id) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        document.cookie = "token=; Max-Age=0; path=/;"; // Invalidate the cookie
        setIsLoggedIn(false);
        router.push("/"); // Redirect to home
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="rounded-full bg-white">
      <div className="grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <h1 className="text-2xl font-bold font-outfitRegular pl-1">LOGO</h1>
        </div>

        {/* Center: Nav links */}
        <div className="flex justify-center gap-5 relative z-20 pointer-events-auto">
          <Link
            href="/"
            className="text-sm font-outfitRegular px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black"
          >
            Home
          </Link>
          <Link
            href="/assessment"
            className="text-sm font-outfitRegular px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black whitespace-nowrap"
          >
            AI Guided Assessment
          </Link>
          <Link
            href="/chatbot"
            className="text-sm font-outfitRegular px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black whitespace-nowrap"
          >
            AI  First-Aid Bot
          </Link>
          <Link
            href="/community"
            className="text-sm font-outfitRegular px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black whitespace-nowrap"
          >
          Peer Support
          </Link>
       
       
          <Link
            href="/video-call"
            className="text-sm font-outfitRegular px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black whitespace-nowrap"
          >
            Confidential Booking
          </Link>
          <Link
            href="/articles"
            className="text-sm font-outfitRegular px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black whitespace-nowrap"
          >
            Resource Hub
          </Link>
       
          <Link
            href="/dashboard"
            className="text-sm font-outfitRegular px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black relative z-30 pointer-events-auto whitespace-nowrap"
          >
           User Dashboard
          </Link>
        </div>

        {/* Right: Auth buttons */}
        <div className="flex justify-end">
          {!isLoggedIn ? (
            <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
              <Button
                className="rounded-full bg-gray-100 shadow-none text-gray-700 hover:text-black hover:bg-gray-200 font-outfitRegular"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
              <Button
                className="rounded-full bg-white text-black hover:text-white hover:bg-slate-700 font-outfitRegular"
                onClick={() => router.push("/auth/register")}
              >
                Signup
              </Button>
            </div>
          ) : (
            <Button
              className="rounded-full bg-white text-black hover:text-white hover:bg-slate-700 font-outfitRegular"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
