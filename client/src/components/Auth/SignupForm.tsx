"use client";
import api from "@/lib/axios";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
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
    <div
      className="flex items-center justify-center min-h-screen px-4
                bg-gradient-to-br from-base-300 via-base-200 to-base-100"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl p-8
               bg-base-100/80 backdrop-blur-xl
               border border-base-300/60 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-primary tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-neutral/70">
            Join us and start your journey today
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-neutral/80"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
            className="input input-bordered w-full bg-base-200/60
                   focus:border-primary focus:ring-2 focus:ring-primary/30
                   transition-all"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-neutral/80"
          >
            Email Address
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
        <div className="mb-4">
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
              autoComplete="new-password"
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

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-1 text-sm font-medium text-neutral/80"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className="input input-bordered w-full bg-base-200/60 pr-12
                     focus:border-primary focus:ring-2 focus:ring-primary/30
                     transition-all"
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                     text-primary/80 hover:text-primary transition-colors"
            >
              {showConfirmPassword ? <Eye /> : <EyeClosed />}
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
          {loading ? "Signing up..." : "Create Account"}
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-neutral/70">
          Already have an account?
          <Link
            href={"/login"}
            className="ml-1 text-primary hover:underline cursor-pointer"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
