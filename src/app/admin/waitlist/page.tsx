"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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
    const checkAuthAndFetch = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // OPTIONAL: Check if user is admin by email or role here
      // if (user.email !== "your-admin-email@example.com") {
      //   router.push("/login");
      //   return;
      // }

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

    checkAuthAndFetch();
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
