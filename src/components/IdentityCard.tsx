"use client"

import type { Identity } from '../Identity';

const typeColorMap: Record<Identity['type'], string> = {
  real: 'border-green-500',
  alt: 'border-blue-500',
  anon: 'border-gray-500',
  brand: 'border-yellow-500',
};

const typeIconMap: Record<Identity['type'], string> = {
  real: '🧍',
  alt: '🎭',
  anon: '👤',
  brand: '🏷️',
};

export default function IdentityCard({ identity }: { identity: Identity }) {
  return (
    <div
      className={`bg-gray-800 p-4 rounded-2xl border-l-4 shadow hover:scale-[1.02] transition-all duration-200 ${typeColorMap[identity.type]}`}
    >
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
        {typeIconMap[identity.type]} {identity.name}
      </h2>
      <div className="space-y-1 text-sm text-gray-300">
        <p><span className="text-gray-400 font-medium">Type:</span> {identity.type}</p>
        <p><span className="text-gray-400 font-medium">Goal:</span> {identity.goal}</p>
        <p><span className="text-gray-400 font-medium">Style:</span> {identity.style}</p>
      </div>
    </div>
  );
}