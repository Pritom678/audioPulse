"use client";
import api from "@/lib/axios";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-base-300/60
               bg-base-100/80 backdrop-blur-xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-primary tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-neutral/70">
            Login to continue to your account
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-neutral/80"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="input input-bordered w-full bg-base-200/60
                   focus:border-primary focus:ring-2 focus:ring-primary/30
                   transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-neutral/80"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="input input-bordered w-full bg-base-200/60 pr-12
                     focus:border-primary focus:ring-2 focus:ring-primary/30
                     transition-all"
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                     text-primary/80 hover:text-primary transition-colors"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 rounded-lg bg-error/10 text-error text-sm py-2 px-3 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-success/10 text-success text-sm py-2 px-3 text-center">
            {success}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn w-full text-lg font-semibold
                 bg-primary text-neutral-content
                 hover:bg-accent hover:shadow-lg
                 transition-all duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-neutral/70">
          Don't have an account?{" "}
          <Link
            href={"/signup"}
            className="ml-1 text-primary hover:underline cursor-pointer"
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
