"use client";
import api from "@/lib/axios";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { gsap } from "gsap";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!form.email || !form.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    try {
      await api.post("/auth/login", form);
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
  /* GSAP Animations */ useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(leftRef.current, { x: -70, opacity: 0, duration: 0.9 })
      .from(formRef.current, { x: 70, opacity: 0, duration: 0.9 }, "-=0.5")
      .from(
        formRef.current?.querySelectorAll("input, button, p"),
        { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 },
        "-=0.4",
      );
  }, []);
  useEffect(() => {
    gsap.to(".auth-glow", {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      {" "}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-base-100 my-10">
        {" "}
        {/* Left Info Section */}{" "}
        <div
          ref={leftRef}
          className="hidden md:flex flex-col bg-gradient-to-br from-primary to-accent py-8 pl-3 mr-10 rounded-br-2xl rounded-tr-2xl text-white"
        >
          {" "}
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            {" "}
            {/* Welcome Message */}{" "}
            <h1 className="text-4xl font-bold leading-tight">
              {" "}
              Welcome back to AudioPulse{" "}
            </h1>{" "}
            {/* Illustration */}{" "}
            <div className="relative my-5 -ml-64">
              {" "}
              {/* Glow / shape */}{" "}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                {" "}
                <div className="h-72 w-72 rounded-full bg-white/20 blur-3xl auth-glow" />{" "}
              </div>{" "}
              {/* Image */}{" "}
              <Image
                src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770711009/AirPods_Max-removebg-preview_mbxwbs.png"
                width={260}
                height={240}
                alt="Auth Illustration"
                className="object-contain"
                priority
              />{" "}
            </div>{" "}
            {/* Description */}{" "}
            <p className="text-white/90 max-w-sm">
              {" "}
              Sign in to continue where you left off and manage your audio
              experience seamlessly.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Right Form Section */}{" "}
        <div className="flex items-center justify-center p-8 sm:p-12">
          {" "}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            {" "}
            {/* Email */}{" "}
            <div className="mb-4">
              {" "}
              <label className="block mb-1 text-sm font-medium">
                Email
              </label>{" "}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />{" "}
            </div>{" "}
            {/* Password */}{" "}
            <div className="mb-6">
              {" "}
              <label className="block mb-1 text-sm font-medium">
                Password
              </label>{" "}
              <div className="relative">
                {" "}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pr-12"
                  required
                />{" "}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                >
                  {" "}
                  {showPassword ? <Eye /> : <EyeClosed />}{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
            {/* Error Message */}{" "}
            {error && (
              <div className="mb-4 text-sm text-error bg-error/10 rounded-lg p-2 text-center">
                {" "}
                {error}{" "}
              </div>
            )}{" "}
            {/* Submit */}{" "}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-lg"
            >
              {" "}
              {loading ? "Logging in..." : "Login"}{" "}
            </button>{" "}
            {/* Footer */}{" "}
            <p className="mt-6 text-center text-sm text-neutral/70">
              {" "}
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="ml-1 text-primary hover:underline"
              >
                {" "}
                Signup{" "}
              </Link>{" "}
            </p>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default LoginForm;
