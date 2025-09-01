"use client";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient"; // your Supabase client
import IdentityForm from "../components/AddIdentityForm";
import AboutModelHelp from "../components/AboutModelHelp";
import ImportPublicProfile from "../components/ImportPublicProfile";
import AnalyzeOpenWeb from "../components/AnalyzeOpenWeb";
import GlobalIdentityLayer from "../components/GlobalIdentityLayer";
import Login from "../components/Login";
import Register from "../components/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import IdentitiesList from "../components/IdenditiesList";

const HomePage: React.FC<{ identities: any[]; addIdentity: (identity: any) => void }> = ({
  identities,
  addIdentity,
}) => (
  <div className="max-w-5xl mx-auto p-6 min-h-screen bg-zinc-50 text-zinc-900 flex flex-col items-center">
    <h1 className="text-3xl text-center mb-6">🌐 Digital Identity Ecosystem</h1>
    <p className="text-center text-zinc-600 mb-10">
      Map and connect your identities across platforms and purposes.
    </p>
    <IdentityForm onAdd={addIdentity} existingIdentities={identities} />
  </div>
);

export default function App() {
  const [identities, setIdentities] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // wait for auth check

  useEffect(() => {
    // Check if a user is logged in on mount
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setCurrentUser(data.user.email);
      setLoading(false);
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setCurrentUser(session.user.email);
      else setCurrentUser(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("identities") || "[]");
    setIdentities(stored);
  }, []);

  const addIdentity = (identity: any) => {
    const updated = [...identities, identity];
    setIdentities(updated);
    localStorage.setItem("identities", JSON.stringify(updated));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>; // wait for Supabase

  return (
    <Router>
      <NavBar currentUser={currentUser} onLogout={handleLogout} />
      

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login onLogin={(user) => setCurrentUser(user)} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <HomePage identities={identities} addIdentity={addIdentity} />
            </ProtectedRoute>
          }
        />
                <Route
          path="/profile"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/identities"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <IdentitiesList identities={identities} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <AboutModelHelp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/import"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <ImportPublicProfile onImport={addIdentity} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analyze"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <AnalyzeOpenWeb />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intelligence"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <GlobalIdentityLayer />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}
