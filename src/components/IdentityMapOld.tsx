"use client"

import React, { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const IdentityForm = ({ onAdd, existingIdentities }) => {
  const [form, setForm] = useState({
    name: '',
    platform: '',
    type: 'real',
    visibility: 'public',
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
    setForm({ name: '', platform: '', type: 'real', visibility: 'public', connections: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Username" className="p-2 border w-full" />
      <input name="platform" value={form.platform} onChange={handleChange} placeholder="Platform (e.g. Twitter)" className="p-2 border w-full" />
      <select name="type" value={form.type} onChange={handleChange} className="p-2 border w-full">
        <option value="real">Real</option>
        <option value="alt">Alt</option>
        <option value="brand">Brand</option>
        <option value="anonymous">Anonymous</option>
      </select>
      <select name="visibility" value={form.visibility} onChange={handleChange} className="p-2 border w-full">
        <option value="public">Public</option>
        <option value="semi">Semi-Private</option>
        <option value="private">Private</option>
      </select>

      <div>
        <label className="block mb-1 font-medium">Connect to existing identities:</label>
        <select
          name="connections"
          multiple
          value={form.connections}
          onChange={handleChange}
          className="p-2 border w-full h-32"
        >
          {existingIdentities.map((id) => (
            <option key={id.id} value={id.id}>{id.name} ({id.platform})</option>
          ))}
        </select>
      </div>

      <button type="submit" className="p-2 bg-blue-500 text-white w-full">Add Identity</button>
    </form>
  );
};

const IdentityGraph = ({ identities }) => {
  const graphRef = useRef();

  const nodes = identities.map(id => ({ id: id.id, name: id.name, group: id.type }));
  const links = identities.flatMap(id => id.connections?.map(conn => ({ source: id.id, target: conn })) || []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Identity Graph</h2>
      <div className="border rounded-xl p-4 bg-white shadow w-full h-[500px]">
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
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Digital Identity Ecosystem</h1>
      <IdentityForm onAdd={addIdentity} existingIdentities={identities} />
      <IdentityGraph identities={identities} />
    </div>
  );
}