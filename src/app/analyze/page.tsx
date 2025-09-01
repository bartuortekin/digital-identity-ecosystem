"use client";

import { useState } from "react";

interface AnalysisResults {
  similarUsernames: string[];
  foundOnPlatforms: string[];
  confidenceScore: number;
}

export default function AnalyzeOpenWeb() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!username.trim()) return;

    setLoading(true);

    // Simulate analysis logic
    setTimeout(() => {
      setResults({
        similarUsernames: [`${username}_alt`, `${username}123`, `real_${username}`],
        foundOnPlatforms: ["Twitter", "GitHub", "Reddit"],
        confidenceScore: Math.floor(Math.random() * 100),
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 text-zinc-800">
      <h1 className="text-2xl font-bold mb-4">🔎 Analyze Identity Trails</h1>
      <p className="text-zinc-600 mb-4">
        Enter a username to simulate how identity traces might appear across the open web.
      </p>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a username"
        className="p-2 border w-full rounded mb-4"
      />

      <button
        onClick={handleAnalyze}
        className="p-2 bg-indigo-600 text-white rounded w-full hover:bg-indigo-700 transition"
      >
        Analyze
      </button>

      {loading && <p className="mt-4 text-sm text-zinc-500">Searching...</p>}

      {results && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Possible Matches</h2>
          <ul className="list-disc list-inside mb-4">
            {results.similarUsernames.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-2">Detected Platforms</h2>
          <p>{results.foundOnPlatforms.join(", ")}</p>

          <h2 className="text-xl font-semibold mt-4 mb-2">Confidence Score</h2>
          <p>{results.confidenceScore}%</p>
        </div>
      )}
    </div>
  );
}
