import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[#2A7DDD] rounded-full">
        <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-b-red-500 rounded-full"></div>
      </div>
    </div>
  );
}
