"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const Profile: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user?.email) setEmail(data.user.email);
    };
    getUser();
  }, []);

  return (
    <div className="ml-64 p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>
        <strong>Email:</strong> {email}
      </p>
    </div>
  );
};

export default Profile;
