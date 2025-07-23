"use client";
import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface VideoCallProps {
  userId: string;
  callId: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ userId, callId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startCall = async () => {
      if (!containerRef.current) {
        console.error("Container element is not available");
        return;
      }

      // Replace these with your actual AppId and ServerSecret
      const AppId = 74206127;
      const ServerSecret = "20a0c3c047ae13bf7a606cd5fef59b3e";
      // Generate a kit token. Adjust the parameters as needed.
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        AppId,
        ServerSecret,
        callId, // room id is callId here
        userId,
        "TestUser" // You can replace with dynamic username if available
      );
      console.log("Generated kit token:", kitToken);

      // Create the ZegoUIKit instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      if (!zp || typeof zp.joinRoom !== "function") {
        console.error("ZegoUIKitPrebuilt.create did not return a valid instance with joinRoom");
        return;
      }

      // Join the room
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `https://localhost:3000/video-call/${callId}`,
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
          },
        ],
      });
      console.log("Meeting initialized");
    };

    startCall();
  }, [userId, callId]);

  return (
    <div>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100vh", border: "2px solid red" }}
      />
    </div>
  );
};

export default VideoCall;
