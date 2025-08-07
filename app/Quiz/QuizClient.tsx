"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

const QuizClient = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const pfp = searchParams.get("pfp");

  return (
    <div className="flex items-center justify-center gap-1">
      {pfp && (
        <Image
          src={pfp}
          height={100}
          width={100}
          className="w-5 h-5 rounded-full"
          alt=""
        />
      )}
      <h1>{username}</h1>
    </div>
  );
};

export default QuizClient;
