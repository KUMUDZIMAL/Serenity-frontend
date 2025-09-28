"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(Boolean(data._id));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loader when request completes
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
        document.cookie = "token=; Max-Age=0; path=/;";
        setIsLoggedIn(false);
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const hoverStyle = "onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(216,169,255,0.50)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}";

  return (
    <div className="rounded-full bg-white">
      <div className="grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <h1 className="text-2xl font-bold font-outfitRegular pl-1">LOGO</h1>
        </div>

        {/* Center: Nav links */}
        <div className="flex justify-center gap-5 relative z-20 pointer-events-auto">
          {[
            { href: "/", label: "Home" },
            { href: "/assessment", label: "AI Guided Assessment" },
            { href: "/chatbot", label: "AI First-Aid Bot" },
            { href: "/community", label: "Peer Support" },
            { href: "/video-call", label: "Confidential Booking" },
            { href: "/articles", label: "Resource Hub" },
            { href: "/dashboard", label: "User Dashboard" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-outfitRegular px-4 py-2 rounded-full text-gray-700 hover:text-black whitespace-nowrap transition-colors duration-200"
              style={{ transition: "all 0.3s", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(216,169,255,0.50)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Auth buttons */}
        <div className="flex justify-end">
          {loading ? (
            // Small loader while fetching auth status
            <div className="w-6 h-6 border-2 border-gray-300 border-t-purple-400 rounded-full animate-spin mx-2"></div>
          ) : !isLoggedIn ? (
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
