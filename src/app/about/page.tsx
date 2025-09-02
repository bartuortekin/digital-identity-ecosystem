// app/about/page.tsx
import React from "react";
import model from "../../models/identity-ecosystem-model.json";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-zinc-800">
      <h1 className="text-3xl font-bold mb-4">
        🌐 About Digital Identity Ecosystems
      </h1>
      <p className="mb-6 text-zinc-600">
        This tool helps you map, manage, and understand the complex network of
        your digital identities. Based on the concept of ecosystems, each
        identity has a type, visibility, purpose, and connections to others.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">🧬 Identity Types</h2>
      <ul className="list-disc list-inside mb-4">
        {model.identityTypes.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        🔗 Relationship Types
      </h2>
      <ul className="list-disc list-inside mb-4">
        {model.relationTypes.map((relation) => (
          <li key={relation}>{relation}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">🧠 Identity Dynamics</h2>
      <ul className="list-disc list-inside mb-4">
        {model.identityDynamics.map((dynamic) => (
          <li key={dynamic}>{dynamic}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">📚 Use Cases</h2>
      <ul className="list-disc list-inside mb-4">
        {model.useCases.map((use) => (
          <li key={use}>{use}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">💡 How to Use</h2>
      <p className="mb-4 text-zinc-600">
        Start by creating identities representing your real, alt, brand, or
        anonymous profiles. Use connections to link them, showing relationships
        like ownership, influence, or coordination. Then visualize and refine
        your ecosystem in the interactive map.
      </p>
    </div>
  );
}
