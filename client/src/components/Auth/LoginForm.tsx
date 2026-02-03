"use client";
import api from "@/lib/axios";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    if (!form.email || !form.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    try {
      await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      setSuccess("Login successful! Redirecting...");
      toast.success("Login successful!");
      setTimeout(() => {
        setLoading(false);
        setForm({ email: "", password: "" });
        router.push("/");
      }, 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form
        className="w-full max-w-md p-8 rounded-xl shadow-lg bg-base-100 border border-base-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          Login
        </h2>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-neutral mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-200 border-base-300 focus:border-primary text-neutral"
            autoComplete="email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-neutral mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 focus:border-primary text-neutral pr-12"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
        </div>
        {error && (
          <div className="mb-4 text-error text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-success text-sm text-center">{success}</div>
        )}
        <button
          type="submit"
          className="btn w-full bg-primary text-neutral-content hover:bg-accent transition-colors font-semibold text-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
