"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type WaitlistEntry = {
  id: number;
  email: string;
  created_at?: string;
};

export default function WaitlistDashboard() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchWaitlist = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.warn("Not logged in or failed to get user");
        router.push("/login");
        return;
      }

      if (user.email !== "ariyoadefisayomi@gmail.com") {
        console.warn("Unauthorized user:", user.email);
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching waitlist:", error.message || error);
      } else {
        setEntries(data || []);
      }

      setLoading(false);
    };

    fetchWaitlist();
  }, [router]);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-6">Waitlist Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p>No waitlist entries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="border px-4 py-2">{entry.id}</td>
                  <td className="border px-4 py-2">{entry.email}</td>
                  <td className="border px-4 py-2">
                    {entry.created_at
                      ? new Date(entry.created_at).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
