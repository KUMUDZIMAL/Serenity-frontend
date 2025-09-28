"use client"; 

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Mood {
  emoji: string;
  label: string;
}

const MoodTracker: React.FC = () => {
  const moods: Mood[] = [
    { emoji: "🌟", label: "Awesome" },
    { emoji: "😊", label: "Great" },
    { emoji: "😍", label: "Loved" },
    { emoji: "🙂", label: "Okay" },
    { emoji: "😕", label: "Meh" },
    { emoji: "😥", label: "Anxious" },
    { emoji: "☹️", label: "Bad" },
    { emoji: "😖", label: "Terrible" },
    { emoji: "😡", label: "Upset" },
  ];

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true); // loader until login data fetched

  const router = useRouter();

  useEffect(() => {
    // Update date and time every second
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setCurrentDate(now.toLocaleDateString(undefined, options));
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Fetch user login data
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user", { method: "GET", credentials: "include" });
        if (response.status === 401) {
          router.push("/auth/login");
          return;
        }
        if (!response.ok) {
          router.push("/auth/login");
          return;
        }
        const data = await response.json();
        if (!data._id) {
          router.push("/auth/login");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/auth/login");
      } finally {
        setLoading(false); // hide loader after login check
      }
    };

    fetchUser();
    return () => clearInterval(interval);
  }, [router]);

  const handleMoodClick = async (label: string) => {
    setSelectedMood(label);
    try {
      const response = await fetch("/api/analysis", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: label }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Mood saved:", data);
        router.push("/Input2");
      } else {
        console.error("Failed to save mood");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    // Loader while login data is being fetched
    return (
      <div className="flex items-center justify-center min-h-screen bg-[rgba(216,169,255,0.8)]">
        <div className="loader border-t-8 border-violet-700 w-24 h-24 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#B194D6] to-[#EBEBEE] p-4 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute w-96 h-96 bg-blue-400/30 rounded-full blur-3xl -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-purple-400/30 rounded-full blur-3xl top-40 left-60"></div>
        <div className="absolute w-80 h-80 bg-blue-500/30 rounded-full blur-3xl bottom-0 right-20"></div>
        <div className="absolute w-72 h-72 bg-purple-500/30 rounded-full blur-3xl -right-20 top-10"></div>
        <div className="absolute w-80 h-80 bg-orange-300/30 rounded-full blur-3xl top-0 right-60"></div>
        <div className="absolute w-80 h-80 bg-orange-300/30 rounded-full blur-3xl top-20 left-20"></div>
      </div>

      {/* Mood Form */}
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full text-center relative text-[#151515] z-10">
        <h2 className="text-2xl font-semibold mb-8 text-[#151515]">
          How are you feeling right now?
        </h2>

        <div className="mb-6 text-xl text-[#151515]">
          <span>{currentDate}</span>{" "}
          <span>{currentTime}</span>
        </div>

        <div className="mb-6">
          <label className="mr-2 text-base text-[#151515]">Select a date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 text-base rounded-lg border border-[#EBEBEE] text-[#151515] bg-white focus:border-[#B194D6] focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {moods.map((mood) => (
            <MoodItem
              key={mood.label}
              emoji={mood.emoji}
              label={mood.label}
              onClick={() => handleMoodClick(mood.label)}
              isSelected={selectedMood === mood.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MoodItem: React.FC<Mood & { onClick: () => void; isSelected: boolean }> = ({
  emoji,
  label,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 p-4 rounded-xl ${
        isSelected ? "bg-yellow-200" : "bg-transparent"
      }`}
      onClick={onClick}
    >
      <span className="text-4xl">{emoji}</span>
      <span className="mt-3 text-sm text-[#151515]">{label}</span>
    </div>
  );
};

export default MoodTracker;
