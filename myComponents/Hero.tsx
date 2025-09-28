import React from "react";
import Spline from "@splinetool/react-spline";

const Hero = () => {
  return (
    <section className="relative flex h-[75vh] w-full rounded-3xl overflow-hidden bg-violet-50 shadow-inner">
      {/* Background Spline (full cover) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* pointer-events-none prevents the Spline canvas from blocking clicks */}
        <Spline scene="https://prod.spline.design/2TOJeyduGhMdX1gk/scene.splinecode" />
      </div>

      {/* Overlay content (on top of the spline) */}
      <div className="relative z-10 flex w-full h-full items-center">
        {/* Left text column */}
        <div className="w-1/2 h-full flex items-center pl-20 mt-4">
          <div className="flex flex-col">
            <h1 className="text-7xl font-bold drop-shadow-xl text-slate-800 font-valueSerif">
             AI Guided
            </h1>
            <h1 className="text-7xl font-bold drop-shadow-xl mt-4 text-slate-800 font-valueSerif">
              Mental Wellness,
            </h1>
            
            <h1 className="text-7xl font-bold drop-shadow-xl mt-4 text-slate-800 font-valueSerif">
              For Indian 
            </h1>
            <h1 className="text-7xl font-bold drop-shadow-xl mt-4 text-slate-800 font-valueSerif">
            Students
            </h1>
          </div>
        </div>

        {/* Right area: optional foreground spline or element */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[550px] h-[550px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[550px] pointer-events-auto">
            {/* If you want another Spline or 3D object in the foreground:
                keep it pointer-events-auto so users can interact with it.
                Otherwise remove this to rely on the background Spline only. */}
            <Spline scene="https://prod.spline.design/pq3ogkFieEA2QGd2/scene.splinecode" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
