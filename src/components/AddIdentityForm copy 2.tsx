"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import model from "../models/identity-ecosystem-model.json";

type Identity = {
  id?: string;
  user_id?: string;
  name: string;
  platform: string;
  type: string;
  visibility: string;
};

interface Props {}

export default function AddIdentityForm({}: Props) {
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [form, setForm] = useState<Identity>({
    name: "",
    platform: "",
    type: model.identityTypes[0],
    visibility: model.visibilityLevels[0],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load current user
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setCurrentUser(data.user.id); // store user_id
        fetchIdentities(data.user.id);
      }
      setLoading(false);
    });
  }, []);

  const fetchIdentities = async (user_id: string) => {
    const { data, error } = await supabase
      .from("identities")
      .select("*")
      .eq("user_id", user_id);
    if (error) console.error(error);
    else setIdentities(data || []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newIdentity = { ...form, user_id: currentUser };

    const { data, error } = await supabase.from("identities").insert(newIdentity).select();
    if (error) {
      console.error("Insert failed:", error);
      return;
    }

    setIdentities([...identities, data[0]]);
    setForm({
      name: "",
      platform: "",
      type: model.identityTypes[0],
      visibility: model.visibilityLevels[0],
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const { error } = await supabase.from("identities").delete().eq("id", id);
    if (error) console.error(error);
    else setIdentities(identities.filter((i) => i.id !== id));
  };

  const grouped = model.identityTypes.reduce((acc, type) => {
    acc[type] = identities.filter((id) => id.type === type);
    return acc;
  }, {} as Record<string, Identity[]>);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-zinc-50 text-zinc-900">
      <h1 className="text-4xl font-bold text-center mb-8">Digital Identities</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 mb-10 bg-white shadow rounded-xl"
      >
        <h3 className="text-2xl font-bold">Add Identity</h3>

        {["name", "platform"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium capitalize text-zinc-600 mb-1">
              {field}
            </label>
            <input
              id={field}
              name={field}
              value={form[field as keyof Identity]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-zinc-600 mb-1">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {model.identityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="visibility" className="block text-sm font-medium text-zinc-600 mb-1">
            Visibility
          </label>
          <select
            id="visibility"
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="w-full py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold"
        >
          Add Identity
        </button>
      </form>

      <div className="space-y-8">
        {model.identityTypes.map(
          (type) =>
            grouped[type]?.length && (
              <div key={type}>
                <h3 className="text-xl font-semibold mb-4 text-zinc-700">{type}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {grouped[type].map((identity) => (
                    <div
                      key={identity.id}
                      className="p-4 bg-white rounded-xl shadow border border-zinc-200"
                    >
                      <h4 className="text-lg font-bold text-zinc-800">{identity.name}</h4>
                      <p className="text-sm text-zinc-600">
                        <strong>Platform:</strong> {identity.platform}
                      </p>
                      <p className="text-sm text-zinc-600">
                        <strong>Visibility:</strong> {identity.visibility}
                      </p>
                      <button
                        onClick={() => handleDelete(identity.id)}
                        className="mt-2 text-red-600 hover:text-red-800 font-bold"
                        aria-label={`Delete identity ${identity.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
