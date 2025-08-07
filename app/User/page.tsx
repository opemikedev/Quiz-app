"use client";

import UserProf from "@/components/UserProf";
import { useState } from "react";

const page = () => {
  const [username, Setusername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedUsername(username.trim());
  };

  return (
    <div>
      <main className="flex justify-center flex-col items-center h-screen">
        <h1 className="font-bold font-mono text-2xl">Enter Your x handle</h1>

        <form
          action=""
          onSubmit={handleSubmit}
          className="flex gap-2 items-center max-w-md mx-auto p-4"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => Setusername(e.target.value)}
            placeholder="username"
            className="bg-[#343445] text-white p-3 rounded-2xl flex-grow focus:outline-none focus:ring-2 focus:ring-[#4BB7C3] placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-[#4BB7C3] hover:bg-[#4bb7c395] text-white font-medium py-2 px-4 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4bb7c395] focus:ring-offset-2"
          >
            Search
          </button>
        </form>
        {submittedUsername && <UserProf username={submittedUsername} />}
      </main>
    </div>
  );
};

export default page;
