import React from "react";
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <Spinner size="lg" />
    </div>
  );
}
