"use client";

import { useState } from "react";

interface Identity {
  id: string;
  name: string;
  platform: string;
  type: string;
  visibility: string;
  goal?: string;
  style?: string;
  connections?: any[];
}

interface ImportPublicProfileProps {
  onImport: (identity: Identity) => void;
}

export default function ImportPublicProfile({ onImport }: ImportPublicProfileProps) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleImport = async () => {
    setStatus("Fetching...");

    try {
      const mockData = extractMockIdentityFromUrl(url);

      if (mockData) {
        onImport({ ...mockData, id: Date.now().toString(), connections: [] });
        setStatus("Imported successfully!");
        setUrl("");
      } else {
        setStatus("Could not parse profile. Try another URL.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error fetching profile.");
    }
  };

  const extractMockIdentityFromUrl = (url: string): Omit<Identity, "id" | "connections"> | null => {
    try {
      const hostname = new URL(url).hostname;

      if (hostname.includes("github.com")) {
        const username = url.split("github.com/")[1].split("/")[0];
        return {
          name: username,
          platform: "GitHub",
          type: "real",
          visibility: "public",
          goal: "code sharing",
          style: "developer",
        };
      }

      if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
        const username =
          url.split(/twitter.com\//)[1]?.split("/")[0] || url.split(/x.com\//)[1]?.split("/")[0];
        return {
          name: username,
          platform: "Twitter/X",
          type: "real",
          visibility: "public",
          goal: "influence",
          style: "personal",
        };
      }
    } catch {
      return null;
    }
    return null;
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 text-zinc-800">
      <h1 className="text-2xl font-bold mb-4">🌐 Import Public Profile</h1>
      <p className="text-zinc-600 mb-4">
        Paste a link to a public profile (e.g., GitHub or Twitter) and we’ll try to auto-fill an
        identity.
      </p>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://github.com/username"
        className="p-2 border w-full rounded mb-4"
      />
      <button
        onClick={handleImport}
        className="p-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700 transition"
      >
        Import Profile
      </button>

      {status && <p className="mt-4 text-sm text-zinc-500">{status}</p>}
    </div>
  );
}