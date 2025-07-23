// app/video-call/page.tsx
"use client";

import React, { useEffect, useRef } from "react";

const VideoCallPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // Read query params from URL
    const params = new URLSearchParams(window.location.search);
    const callId = params.get("callId") || "default-room";
    const userId =
      params.get("userId") || String(Math.floor(Math.random() * 10000));

    const startCall = async () => {
      if (!containerRef.current) {
        console.error("Container element not found.");
        return;
      }

      // Dynamically import Zego so no SSR issues
      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );

      const AppId = 74206127;
      const ServerSecret = "20a0c3c047ae13bf7a606cd5fef59b3e";

      // Generate a test kit token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        AppId,
        ServerSecret,
        callId,
        userId,
        "TestUser"
      );

      // Create and join the room
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:3000/video-call?callId=${callId}&userId=${userId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
    };

    startCall();
  }, []); // run once

  return (
    <div>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100vh", border: "2px solid #ccc" }}
      />
    </div>
  );
};

export default VideoCallPage;
