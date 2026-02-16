"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
        setIsAdmin(data.role === "ADMIN");
      } catch (error) {
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, isAdmin };
}
