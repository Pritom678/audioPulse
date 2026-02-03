"use client";
import api from "@/lib/axios";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import toast from "react-hot-toast";

const SignupForm: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    // Basic validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    await api.post("/auth/signup", {
      name: form.name,
      email: form.email,
      password: form.password,
    });
    setTimeout(() => {
      setSuccess("Signup successful! Welcome aboard.");
      toast.success("Signup successful! Welcome aboard.");
      setLoading(false);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    }, 1200);

    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form
        className="w-full max-w-md p-8 rounded-xl shadow-lg bg-base-100 border border-base-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          Sign Up
        </h2>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-neutral mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-200 border-base-300 focus:border-primary text-neutral"
            autoComplete="name"
            required
          />
        </div>
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
        <div className="mb-4">
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
              autoComplete="new-password"
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
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-neutral mb-1"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 focus:border-primary text-neutral pr-12"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary focus:outline-none"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <Eye /> : <EyeClosed />}
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
          {loading ? "Signing up..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
