"use client"

import React, { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import model from '../models/identity-ecosystem-model.json';

const IdentityForm = ({ onAdd, existingIdentities }) => {
  const [form, setForm] = useState({
    name: '',
    platform: '',
    type: model.identityTypes[0],
    visibility: model.visibilityLevels[0],
    connections: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'connections') {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      setForm({ ...form, connections: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now().toString() });
    setForm({
      name: '',
      platform: '',
      type: model.identityTypes[0],
      visibility: model.visibilityLevels[0],
      connections: []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-xl">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Username" className="p-2 border w-full rounded" />
      <input name="platform" value={form.platform} onChange={handleChange} placeholder="Platform (e.g. Twitter)" className="p-2 border w-full rounded" />

      <select name="type" value={form.type} onChange={handleChange} className="p-2 border w-full rounded">
        {model.identityTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select name="visibility" value={form.visibility} onChange={handleChange} className="p-2 border w-full rounded">
        {model.visibilityLevels.map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>

      <div>
        <label className="block mb-1 font-medium">Connect to:</label>
        <select
          name="connections"
          multiple
          value={form.connections}
          onChange={handleChange}
          className="p-2 border w-full h-28 rounded"
        >
          {existingIdentities.map((id) => (
            <option key={id.id} value={id.id}>{id.name} ({id.platform})</option>
          ))}
        </select>
      </div>

      <button type="submit" className="p-2 bg-blue-600 text-white w-full rounded">Add Identity</button>
    </form>
  );
};

const IdentityMap = ({ identities }) => {
  const graphRef = useRef(null);

  const nodes = identities.map(id => ({ id: id.id, name: id.name, group: id.type }));
  const links = identities.flatMap(id => id.connections?.map(conn => ({ source: id.id, target: conn })) || []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Identity Map</h2>
      <div className="border rounded-xl bg-white shadow w-full h-[500px]">
        <ForceGraph2D
          ref={graphRef}
          graphData={{ nodes, links }}
          nodeLabel="name"
          nodeAutoColorBy="group"
          linkColor={() => 'rgba(0,0,0,0.2)'}
        />
      </div>
    </div>
  );
};

export default function App() {
  const [identities, setIdentities] = useState([]);

  const addIdentity = (identity) => {
    const updated = [...identities, identity];
    setIdentities(updated);
    localStorage.setItem('identities', JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('identities')) || [];
    setIdentities(stored);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-zinc-50 text-zinc-900">
      <h1 className="text-3xl font-bold text-center mb-6"></h1>
      <p className="text-center text-zinc-600 mb-10"></p>
      <IdentityForm onAdd={addIdentity} existingIdentities={identities} />
      <IdentityMap identities={identities} />
    </div>
  );
}
