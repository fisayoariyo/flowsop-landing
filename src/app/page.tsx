"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      console.error("Supabase insert error:", error);
      setStatus("error");
    } else {
      setEmail("");
      setStatus("success");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans px-4 md:px-8">
      <header className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              FlowSOP
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#how-it-works" className="hover:text-black">
              How It Works
            </a>
            <a href="#join" className="hover:text-black">
              Join Waitlist
            </a>
          </nav>
        </div>
      </header>

      <section className="py-20 text-center bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">
            Turn Screen Recordings Into Step-by-Step Guides
          </h2>
          <p className="text-lg mb-6">
            FlowSOP helps you convert screen + voice recordings into clear,
            shareable how-to guides using AI.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center gap-2"
            id="join"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border rounded-md w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </button>
            {status === "success" && (
              <p className="text-green-600 mt-2">Thanks for joining!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 mt-2">
                Something went wrong. Try again.
              </p>
            )}
          </form>
        </div>
      </section>

      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-10">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-2">
                1. Record your screen
              </h4>
              <p>Capture your screen and voice as you walk through a task.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">
                2. Let FlowSOP process it
              </h4>
              <p>
                We auto-detect key steps, transcribe your speech, and snap
                screenshots.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">
                3. Share your guide
              </h4>
              <p>Get a clean, step-by-step SOP you can copy or share.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500">
        Built by Fz • © 2025 FlowSOP
      </footer>
    </div>
  );
}
