"use client";

import { useState, useEffect } from "react";

interface UserProfile {
  name: string;
  email: string;
  image: string;
}

export default function ProfileDisplay() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).error || res.statusText);
        return res.json();
      })
      .then((data: UserProfile) => {
        setUser(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading profile…</p>;
  if (error)   return <p className="text-red-500">Error: {error}</p>;
  if (!user)  return <p>You’re not signed in.</p>;

  return (
    <div className="flex items-center space-x-4 p-4 border rounded">
      <img
        src={user.image}
        alt={`${user.name}’s profile`}
        className="h-12 w-12 rounded-full"
      />
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
