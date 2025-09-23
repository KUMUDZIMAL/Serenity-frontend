"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/myComponents/Navbar";
import Bargraph from "@/myComponents/Bargraph";
import Piechart from "@/myComponents/Piechart";
import Areachart1 from "@/myComponents/Areachart";
import FinalScore from "@/myComponents/FinalScore";
import MoodCounter from "@/myComponents/Moodcounter";
import EverydayInputCard from "@/myComponents/HorizontalScrollInputCard";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMoodData, setHasMoodData] = useState<boolean>(true); // track if moods exist
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user", { method: "GET" });
        if (response.status === 401) {
          router.push("/auth/login");
          return;
        }
        if (!response.ok) {
          router.push("/auth/login");
          return;
        }
        const data = await response.json();
        if (data.username) {
          setUsername(data.username);
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    const fetchMoodData = async () => {
      try {
        const response = await fetch("/api/auth/mood", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          if (data.analysis && data.analysis.length === 0) {
            setHasMoodData(false);
          }
        }
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };

    fetchUser();
    fetchMoodData();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="loader border-t-4 border-violet-500 rounded-full w-16 h-16 animate-spin"></div>
          <p className="mt-4 text-slate-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen px-8 gap-4 flex flex-col relative">
      {/* Navbar */}
      <div className="pt-4">
        <div className="rounded-full bg-white">
          <Navbar />
        </div>
      </div>

      {/* Main Dashboard */}
      <div
        className={`grid grid-cols-12 bg-slate-100 rounded-3xl gap-4 p-4 flex-1 transition-opacity duration-300 ${
          !hasMoodData ? "opacity-30 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Left Column */}
        <div className="bg-white rounded-3xl p-4 flex flex-col col-span-5 shadow-md">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-slate-800">
              Good Morning, <span className="text-violet-700">{username}</span>
            </h1>
            <p className="text-slate-600">
              Here’s a quick summary of your stats:
            </p>
          </div>
          <div className="flex items-end justify-center">
            <div className="w-full">
              <Bargraph />
            </div>
          </div>
          <MoodCounter />
        </div>

        {/* Right Column */}
        <div className="col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 bg-white rounded-3xl p-4 px-0 flex items-start justify-center shadow-md">
              <Piechart />
            </div>
            <div className="col-span-8 bg-white rounded-3xl p-4 flex items-start justify-center shadow-md">
              <Areachart1 />
            </div>
          </div>

          <div className="rounded-3xl grid grid-cols-3 h-full gap-4">
            <div className="col-span-2 bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <EverydayInputCard />
            </div>
            <div className="col-span-1 bg-white rounded-3xl p-4 flex items-start justify-center shadow-md">
              <FinalScore />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay if no mood data */}
      {!hasMoodData && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
       <div className="bg-white rounded-2xl shadow-2xl p-10 w-[500px] max-w-[90%] text-center">
         <h2 className="text-2xl font-semibold text-gray-800 mb-4 leading-snug">
           Dashboard is Empty 🙁!  <br/>Track your mood of the day <br /> to see the dashboard
         </h2>
         <Link href="/Input1">
      <button className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-700 transition">
        Mood Track
      </button>
    </Link>
       </div>
     </div>
     
      )}
    </div>
  );
}
