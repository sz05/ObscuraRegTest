import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";

function Leaderboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`,
          {
            credentials: "include",
          }
        );
        const json = await res.json();
        console.log(json);
        setData(json || []);
        setLoading(false);
      } catch (e) {
        setError("Failed to load leaderboard");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!data.length)
    return <div className="text-gray-400">No leaderboard data</div>;

  return (
    <ul className="space-y-2">
      {data.map((entry, i) => (
        <li key={i} className="flex justify-between text-white">
          <span>{entry.team_code}</span>
          <span className="font-mono">{entry.Points}</span>
          <span className="font-mono">{entry.Current_level}</span>
          <span className="font-mono">{entry.Levels_Cleared}</span>
          <span className="font-mono">{entry.Questions_solved}</span>
        </li>
      ))}
    </ul>
  );
}

function Announcement() {
  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setAnnouncement(json.announcement || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load announcement");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!announcement)
    return <div className="text-gray-400">No announcements</div>;

  return <div className="text-white">{announcement}</div>;
}

export default function PauseOverlay({
  onClose,
  targetDate,
}: {
  onClose: () => void;
  targetDate: string;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center">
      <div className="max-w-2xl w-full rounded-2xl shadow-2xl bg-background border border-border p-12 relative flex flex-col gap-12">
        <Button
          onClick={onClose}
          className="absolute top-8 right-8 text-foreground bg-muted hover:bg-muted/80 rounded-full px-6 py-3 font-bold text-lg shadow-lg"
        >
          Resume
        </Button>
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center tracking-tight">
          Paused
        </h2>
        <div className="flex flex-col gap-10">
          <div className="bg-card p-8 rounded-xl shadow mb-4 flex flex-col gap-4">
            <h4 className="text-xl font-semibold mb-2 text-primary">
              Leaderboard
            </h4>
            <Leaderboard />
          </div>
          {/* <div className="bg-card p-8 rounded-xl shadow mb-4 flex flex-col gap-4">
            <h4 className="text-xl font-semibold mb-2 text-accent">Announcement</h4>
            <Announcement />
          </div> */}
          <div className="bg-card p-8 rounded-xl shadow flex flex-col gap-4 items-center">
            <h4 className="text-xl font-semibold mb-2 text-blue-500">
              Time Left
            </h4>
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
