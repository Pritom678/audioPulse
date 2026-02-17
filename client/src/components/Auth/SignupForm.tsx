"use client";

import api from "@/lib/axios";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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

  /* ==========================
     PRODUCTION SAFE GSAP
  ========================== */
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Animate panels
        tl.fromTo(
          leftRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, clearProps: "all" }
        ).fromTo(
          formRef.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, clearProps: "all" },
          "-=0.4"
        );

        // Animate form groups only (NOT inputs directly)
        const groups = formRef.current?.querySelectorAll(
          "form > div, form > button, form > p"
        );

        if (groups) {
          gsap.fromTo(
            groups,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.5,
              delay: 0.3,
              clearProps: "all",
            }
          );
        }

        // Glow animation
        gsap.to(".auth-glow", {
          scale: 1.06,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }, container);

      return () => ctx.revert(); // Strict mode safe cleanup
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="min-h-screen flex items-center justify-center bg-base-200 px-4"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_2fr] rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-200 my-8">
        {/* LEFT SIDE */}
        <div
          ref={leftRef}
          className="hidden md:flex relative flex-col justify-center items-center bg-gradient-to-br from-primary to-accent text-white p-12 rounded-tr-3xl rounded-br-3xl"
        >
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Join AudioPulse</h1>
            <p className="text-white/80 text-lg">
              Create your account and start your journey.
            </p>

            <div className="relative flex justify-center mt-6 right-24">
              <div className="absolute w-44 h-44 bg-white/20 rounded-full blur-3xl auth-glow" />
              <Image
                src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770711009/AirPods_Max-removebg-preview_mbxwbs.png"
                width={190}
                height={190}
                alt="AirPods Max headphone"
                className="relative object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          ref={formRef}
          className="flex items-center justify-center px-6 sm:px-12 py-10 bg-white"
        >
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">
                Create Account
              </h2>
              <p className="text-gray-500 text-sm">
                Fill in the details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-base-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-base-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-300 bg-base-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-primary transition"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-300 bg-base-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-primary transition"
                  >
                    {showConfirmPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeClosed size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="text-sm text-red-600 bg-red-100 border border-red-200 rounded-xl p-3 text-center">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
