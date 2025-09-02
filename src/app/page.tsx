"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import AddIdentityForm from "../components/AddIdentityForm";

export default function Page() {
  const [identities, setIdentities] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("identities");
    if (saved) {
      setIdentities(JSON.parse(saved));
    }
  }, []);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Check logged-in user
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setCurrentUser(data.user.email);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) setCurrentUser(session.user.email);
        else router.push("/login");
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const addIdentity = (identity: any) => {
    const updated = [...identities, identity];
    setIdentities(updated);
    localStorage.setItem("identities", JSON.stringify(updated));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    router.push("/login");
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-zinc-50 text-zinc-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🌐 Digital Identity Ecosystem</h1>
      </div>

      <AddIdentityForm existingIdentities={identities} onAdd={addIdentity} />
    </div>
  );
}
