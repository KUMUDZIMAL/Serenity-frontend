import React from "react"; 
import Link from "next/link";
import { ArrowDiagonal } from "./Icons";

const Features = () => {
  return (
    <div className="space-y-8">
      {/* First Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="rounded-3xl p-4 shadow-inner h-auto px-12 hover:scale-[1.03] transition-all duration-300"
          style={{ backgroundColor: "rgba(255,182,209,0.65)" }} // Soft Pink
        >
          <h1 className="text-2xl font-bold font-copernicusMedium text-slate-800 text-center pt-4">
            AI Guided Assessment
          </h1>
          <p className="text-sm font-outfitRegular text-slate-600 justify-center text-center pt-4">
            Get dynamic, personalized AI-driven mental health assessments tailored to your needs.
          </p>
          <div className="flex justify-center items-center gap-2 pt-6">
            <Link href="/assessment" className="flex items-center gap-2 text-sm font-outfitRegular font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200">
              Explore <ArrowDiagonal className="text-slate-600" />
            </Link>
          </div>
        </div>

        <div
          className="rounded-3xl p-4 shadow-inner h-auto px-12 hover:scale-[1.03] transition-all duration-300"
          style={{ backgroundColor: "rgba(160,240,255,0.65)" }} // Sky Blue
        >
          <h1 className="text-2xl font-bold font-copernicusMedium text-slate-800 text-center pt-4">
            AI First-Aid Bot
          </h1>
          <p className="text-sm font-outfitRegular text-slate-600 justify-center text-center pt-4">
            Access an AI-powered chatbot providing instant mental health guidance whenever you need it.
          </p>
          <div className="flex justify-center items-center gap-2 pt-6">
            <Link href="/chatbot" className="flex items-center gap-2 text-sm font-outfitRegular font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200">
              Explore <ArrowDiagonal className="text-slate-600" />
            </Link>
          </div>
        </div>

        <div
          className="rounded-3xl p-4 shadow-inner h-auto px-12 hover:scale-[1.03] transition-all duration-300"
          style={{ backgroundColor: "rgba(216,169,255,0.65)" }} // Lavender
        >
          <h1 className="text-2xl font-bold font-copernicusMedium text-slate-800 text-center pt-4">
            Peer Support
          </h1>
          <p className="text-sm font-outfitRegular text-slate-600 justify-center text-center pt-4">
            Connect with a community of peers for shared experiences, support, and encouragement.
          </p>
          <div className="flex justify-center items-center gap-2 pt-6">
            <Link href="/community" className="flex items-center gap-2 text-sm font-outfitRegular font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200">
              Explore <ArrowDiagonal className="text-slate-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* Second Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="rounded-3xl p-4 shadow-inner h-auto px-12 hover:scale-[1.03] transition-all duration-300"
          style={{ backgroundColor: "rgba(216,169,255,0.65)" }} // Lavender
        >
          <h1 className="text-2xl font-bold font-copernicusMedium text-slate-800 text-center pt-4">
            Confidential Booking
          </h1>
          <p className="text-sm font-outfitRegular text-slate-600 justify-center text-center pt-4">
            Book appointments with therapists confidentially for online consultations and support.
          </p>
          <div className="flex justify-center items-center gap-2 pt-6">
            <Link href="/video-call" className="flex items-center gap-2 text-sm font-outfitRegular font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200">
              Explore <ArrowDiagonal className="text-slate-600" />
            </Link>
          </div>
        </div>

        <div
          className="rounded-3xl p-4 shadow-inner h-auto px-12 hover:scale-[1.03] transition-all duration-300"
          style={{ backgroundColor: "rgba(255,182,209,0.65)" }} // Soft Pink
        >
          <h1 className="text-2xl font-bold font-copernicusMedium text-slate-800 text-center pt-4">
            Resource Hub
          </h1>
          <p className="text-sm font-outfitRegular text-slate-600 justify-center text-center pt-4">
            Explore mental health articles, guides, and resources curated for your well-being.
          </p>
          <div className="flex justify-center items-center gap-2 pt-6">
            <Link href="/articles" className="flex items-center gap-2 text-sm font-outfitRegular font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200">
              Explore <ArrowDiagonal className="text-slate-600" />
            </Link>
          </div>
        </div>

        <div
          className="rounded-3xl p-4 shadow-inner h-auto px-12 hover:scale-[1.03] transition-all duration-300"
          style={{ backgroundColor: "rgba(160,240,255,0.65)" }} // Sky Blue
        >
          <h1 className="text-2xl font-bold font-copernicusMedium text-slate-800 text-center pt-4">
            User Dashboard
          </h1>
          <p className="text-sm font-outfitRegular text-slate-600 justify-center text-center pt-4">
            View your personalized mood tracking, progress insights, and mental well-being trends over time.
          </p>
          <div className="flex justify-center items-center gap-2 pt-6">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-outfitRegular font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200">
              Explore <ArrowDiagonal className="text-slate-600" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
