"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className=" min-h-screen">
      <div className="flex justify-center items-center h-screen flex-col">
        {/* Title with simple fade-in */}
        <h1
          className={`font-bold text-6xl md:text-8xl font-mono text-white transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          ZKGM
        </h1>

        {/* Logo with bounce effect using CSS animation */}
        <div
          className={`w-24 h-24 md:w-32 md:h-32 my-4 ${
            isVisible ? "animate-bounce" : "opacity-0"
          }`}
          style={{ animationIterationCount: 2 }}
        >
          <Image
            src="/union/bears.png"
            width={100}
            height={100}
            alt="Union Logo"
            className="w-full h-full"
          />
        </div>

        {/* Subtitle with delayed fade-in */}
        <h1
          className={`text-xl md:text-2xl font-medium text-gray-200 mb-6 transition-opacity duration-1000 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Test Your Union Knowledge
        </h1>

        {/* Button with hover effect */}
        <Link
          href="/Quiz"
          className={`transition-transform duration-300 hover:scale-105 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button className="bg-[#4BB7C3] text-white font-bold px-8 py-4 text-lg">
            Start Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}
