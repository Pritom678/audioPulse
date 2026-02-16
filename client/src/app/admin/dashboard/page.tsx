"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Loading from "@/components/Shared/Loading";
import { Package, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/utils/priceFormat";

type Stats = {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  outOfStock: number;
};

type RecentProduct = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  createdAt: string;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data.stats);
        setRecentProducts(data.recentProducts);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Active Products",
      value: stats?.activeProducts || 0,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Inactive Products",
      value: stats?.inactiveProducts || 0,
      icon: XCircle,
      color: "bg-gray-500",
    },
    {
      title: "Out of Stock",
      value: stats?.outOfStock || 0,
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-neutral">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-neutral mb-6">Recent Products</h2>

        {recentProducts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No products yet</p>
        ) : (
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
