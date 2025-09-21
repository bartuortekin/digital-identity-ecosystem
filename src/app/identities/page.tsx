"use client";

import React, { useEffect, useState } from "react";

type Identity = {
  name: string;
  platform: string;
  type: string;
  visibility: string;
};

const IdentitiesList: React.FC = () => {
  const [identities, setIdentities] = useState<Identity[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("identities");
    if (saved) setIdentities(JSON.parse(saved));
  }, []);

  if (!identities.length)
    return <p className="ml-64 p-6 text-gray-600">No identities added yet.</p>;

  return (
    <div className="ml-64 p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Your Identities</h2>
      <ul className="space-y-3">
        {identities.map((id, idx) => (
          <li
            key={idx}
            className="p-4 bg-white shadow rounded flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Name:</strong> {id.name}
              </p>
              <p>
                <strong>Platform:</strong> {id.platform}
              </p>
              <p>
                <strong>Type:</strong> {id.type}
              </p>
              <p>
                <strong>Visibility:</strong> {id.visibility}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IdentitiesList;
