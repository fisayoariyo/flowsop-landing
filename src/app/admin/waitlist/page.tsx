"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type WaitlistEntry = {
  id: number;
  email: string;
  created_at: string;
};

export default function WaitlistDashboard() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWaitlist = async () => {
      const { data, error } = await supabase
        .from("waitlist")
        .select("id, email, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching waitlist:", error);
      } else {
        setWaitlist(data || []);
      }
      setLoading(false);
    };

    fetchWaitlist();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">FlowSOP Waitlist Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : waitlist.length === 0 ? (
        <p>No signups yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Signed Up At</th>
            </tr>
          </thead>
          <tbody>
            {waitlist.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="px-4 py-2 border">{entry.id}</td>
                <td className="px-4 py-2 border">{entry.email}</td>
                <td className="px-4 py-2 border">
                  {new Date(entry.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
