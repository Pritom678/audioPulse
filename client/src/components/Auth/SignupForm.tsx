"use client";

import api from "@/lib/axios";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { gsap } from "gsap";

const SignupForm: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    try {
      await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Signup successful! Welcome aboard.");
      setTimeout(() => {
        setLoading(false);
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/");
      }, 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed.");
      setLoading(false);
    }
  };

  /* GSAP Animations */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(leftRef.current, {
      x: -70,
      opacity: 0,
      duration: 0.9,
    })
      .from(
        formRef.current,
        {
          x: 70,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.5",
      )
      .from(
        formRef.current?.querySelectorAll("input, button, p"),
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
        },
        "-=0.4",
      );

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
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-base-100 my-10">
        {/* Left Info Section */}
        <div
          ref={leftRef}
          className="hidden md:flex flex-col bg-gradient-to-br from-primary to-accent py-8 pl-3 mr-10 rounded-br-2xl rounded-tr-2xl text-white"
        >
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold leading-tight">
              Join AudioPulse today
            </h1>

            <div className="relative my-5 -ml-64">
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-72 w-72 rounded-full bg-white/20 blur-3xl auth-glow" />
              </div>

              <Image
                src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770711759/AirPods_Max__1_-removebg-preview_huhoie.png"
                width={260}
                height={240}
                alt="Auth Illustration"
                className="object-contain"
                priority
              />
            </div>

            <p className="text-white/90 max-w-sm">
              Create your account and start managing your audio experience
              seamlessly.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            {/* Name */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="input input-bordered w-full pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                >
                  {showConfirmPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-sm text-error bg-error/10 rounded-lg p-2 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-lg"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="mt-6 text-center text-sm text-neutral/70">
              Already have an account?
              <Link href="/login" className="ml-1 text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
