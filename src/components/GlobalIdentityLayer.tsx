"use client"

import React, { useState } from 'react';

export default function GlobalIdentityLayer() {
  const [query, setQuery] = useState('');
  const [intelligence, setIntelligence] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    setTimeout(() => {
      setIntelligence({
        clusters: [
          { name: 'elonmusk', linkedAlts: ['e_musk_alt', 'xAI_dev'], influence: 98 },
          { name: 'grimes_art', linkedAlts: ['gr1m3s_alt', 'grx_dev'], influence: 77 }
        ],
        summary: `Showing probable high-influence identity webs based on the keyword "${query}".`
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-zinc-800">
      <h1 className="text-2xl font-bold mb-4">🌐 Global Identity Intelligence Layer</h1>
      <p className="text-zinc-600 mb-4">
        Search for high-level identity webs, influence clusters, and connected networks across the open internet. This is a simulation of a real-time identity intelligence system.
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a name, handle, or cluster"
        className="p-2 border w-full rounded mb-4"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-purple-600 text-white rounded w-full"
      >
        Search Web</button>

      {loading && <p className="mt-4 text-sm text-zinc-500">Scanning global identity layer...</p>}

      {intelligence && (
        <div className="mt-6">
          <p className="text-sm text-zinc-500 mb-4">{intelligence.summary}</p>

          {intelligence.clusters.map((cluster, idx) => (
            <div key={idx} className="mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold">{cluster.name}</h2>
              <p className="text-zinc-600">Linked Identities: {cluster.linkedAlts.join(', ')}</p>
              <p className="text-zinc-600">Influence Score: {cluster.influence}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
