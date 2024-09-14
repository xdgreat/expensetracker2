"use client";
import Balance from "@/components/balance";
import { Login } from "@/components/login";
import { useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
    <div>
      <div className="flex items-center justify-center h-[100dvh]">
        {isLoggedIn ? <Balance /> : <Login onLoginSuccess={handleLogin} />}
      </div>
    </div>
  );
}
