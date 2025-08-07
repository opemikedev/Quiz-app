"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
const SUPABASE_URL = "https://bvvlqbtwqetltdcvioie.supabase.co/rest/v1";
const SUPABASE_APIKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dmxxYnR3cWV0bHRkY3Zpb2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMjM4MzMsImV4cCI6MjA2OTU5OTgzM30.d-leDFpzc6uxDvq47_FC0Fqh0ztaL11Oozm-z6T9N_M";

type SupabaseUser = {
  display_name: string;
  jsonInput: string;
};

type ParsedJsonInput = {
  pfp: string;
  jsonInput: string;
  title: string;
  level: string;
};

const UserProf = ({ username }: { username: string }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<ParsedJsonInput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const url = `${SUPABASE_URL}/leaderboard_full_0208?display_name=ilike.${username}`;
        const response = await fetch(url, {
          headers: {
            apikey: SUPABASE_APIKEY,
            Authorization: `Bearer ${SUPABASE_APIKEY}`,
          },
        });

        const data: SupabaseUser[] = await response.json();

        if (data.length > 0) {
          const parsed = JSON.parse(data[0].jsonInput);
          setUserData(parsed);
        }
      } catch (err) {
        console.error("fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <div>
      {" "}
      <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
        <Image
          width={100}
          height={100}
          src={userData.pfp}
          alt="User PFP"
          style={{ width: 100, height: 100, borderRadius: "50%" }}
        />

        <h2>{username}</h2>
        <p>🎖️ Title: {userData.title}</p>
        <p>⚡ Level: {userData.level}</p>
      </div>
      <Button
        className="bg-[#4BB7C3] mt-5 hover:bg-[#4bb7c395] text-white font-medium py-2 px-4 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4bb7c395] focus:ring-offset-2"
        onClick={() =>
          router.push(
            `/Quiz?username=${encodeURIComponent(
              username
            )}&pfp=${encodeURIComponent(userData.pfp)}`
          )
        }
      >
        Proceed to Quiz
      </Button>
    </div>
  );
};

export default UserProf;
