"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/waitlist");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8 py-12">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
        </div>

        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email"
          className="w-full bg-gray-800 text-white border border-gray-700 px-3 py-2 mb-4 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
          className="w-full bg-gray-800 text-white border border-gray-700 px-3 py-2 mb-4 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition-colors"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
