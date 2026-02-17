"use client";

import api from "@/lib/axios";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const container = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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
      }, 1200);

      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err: unknown) {
      setError((err as Error)?.message || "Login failed.");
      setLoading(false);
    }
  };

  /* ✅ GSAP Animations (Properly Scoped) */
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(leftRef.current, {
        x: -70,
        opacity: 0,
        duration: 0.9,
      }).from(
        formRef.current,
        {
          x: 70,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.5",
      );

      // Animate form elements if they exist
      const formElements =
        formRef.current?.querySelectorAll("input, button, p");
      if (formElements) {
        tl.from(
          formElements,
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
          },
          "-=0.4",
        );
      }

      // Glow Animation
      gsap.to(".auth-glow", {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="min-h-screen flex items-center justify-center bg-base-200 px-4 sm:px-6"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-base-100 my-8 sm:my-10">
        {/* Left Section */}
        <div
          ref={leftRef}
          className="hidden md:flex flex-col bg-gradient-to-br from-primary to-accent py-6 sm:py-8 pl-3 sm:pl-6 mr-10 sm:mr-10 rounded-br-2xl sm:rounded-tr-2xl rounded-tr-2xl text-white"
        >
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Welcome back to AudioPulse
            </h1>

            <div className="relative my-4 sm:my-5 -ml-8 sm:-ml-16">
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-16 sm:h-20 w-16 sm:w-20 rounded-full bg-white/20 blur-3xl auth-glow" />
              </div>

              <Image
                src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770711009/AirPods_Max-removebg-preview_mbxwbs.png"
                width={120}
                height={120}
                className="object-contain"
                alt="AirPods Max headphone"
              />
          </div>
        </div>

        {/* Right Section */}
        <div
          ref={formRef}
          className="w-full max-w-md sm:max-w-lg px-4 sm:px-6 py-6 sm:py-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-1 sm:mb-2 text-sm sm:text-base font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input input-bordered w-full text-sm sm:text-base"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 sm:mb-2 text-sm sm:text-base font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pr-10 sm:pr-12 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 sm:right-3 top-1/2 sm:top-3 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-sm text-error bg-error/10 rounded-lg p-3 sm:p-4 text-center">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-base sm:text-lg py-3 sm:py-4 flex items-center justify-center gap-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
