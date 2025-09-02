"use client";

import { useState, useEffect } from "react";
import model from "../models/identity-ecosystem-model.json";

type Identity = {
  name: string;
  platform: string;
  type: string;
  visibility: string;
};

interface Props {
  existingIdentities?: Identity[];
  onAdd?: (identity: Identity) => void;
}

export default function AddIdentityForm({
  existingIdentities = [],
  onAdd,
}: Props) {
  const [identities, setIdentities] = useState<Identity[]>(() => {
    const saved = localStorage.getItem("identities");
    return saved ? JSON.parse(saved) : existingIdentities;
  });

  const [form, setForm] = useState<Identity>({
    name: "",
    platform: "",
    type: model.identityTypes[0],
    visibility: model.visibilityLevels[0],
  });

  useEffect(() => {
    localStorage.setItem("identities", JSON.stringify(identities));
  }, [identities]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIdentities([...identities, form]);
    onAdd?.(form);
    setForm({
      name: "",
      platform: "",
      type: model.identityTypes[0],
      visibility: model.visibilityLevels[0],
    });
  };

  const handleDelete = (index: number) => {
    setIdentities((prev) => prev.filter((_, i) => i !== index));
  };

  const grouped = model.identityTypes.reduce((acc, type) => {
    acc[type] = identities.filter((id) => id.type === type);
    return acc;
  }, {} as Record<string, Identity[]>);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-zinc-50 text-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 mb-10 bg-white shadow rounded-xl"
      >
        <h3 className="text-2xl font-bold">Add Identity</h3>
        {["name", "platform"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize text-zinc-600 mb-1">
              {field}
            </label>
            <input
              name={field}
              value={form[field as keyof Identity]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">
            Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
          >
            {model.identityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">
            Visibility
          </label>
          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
          >
            {model.visibilityLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg"
        >
          Add Identity
        </button>
      </form>

      <div className="space-y-8">
        {model.identityTypes.map((type) =>
          grouped[type]?.length ? (
            <div key={type}>
              <h3 className="text-xl font-semibold mb-4 text-zinc-700">
                {type}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[type].map((identity, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-xl shadow border border-zinc-200"
                  >
                    <h4 className="text-lg font-bold">{identity.name}</h4>
                    <p>
                      <strong>Platform:</strong> {identity.platform}
                    </p>
                    <p>
                      <strong>Visibility:</strong> {identity.visibility}
                    </p>
                    <button
                      onClick={() =>
                        handleDelete(
                          identities.findIndex((id) => id === identity)
                        )
                      }
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
