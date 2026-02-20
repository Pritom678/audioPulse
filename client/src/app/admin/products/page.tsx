"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Loading from "@/components/Shared/Loading";
import { formatPrice } from "@/utils/priceFormat";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  isActive: boolean;
  images: string[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/admin/products");
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setToggleLoading(id);
    try {
      await api.put(`/admin/products/${id}`, {
        isActive: !currentStatus,
      });
      toast.success(
        currentStatus
          ? "Product deactivated successfully"
          : "Product activated successfully",
      );
      fetchProducts();
    } catch (error) {
      console.error("Toggle active error:", error);
      toast.error("Failed to update product status");
    } finally {
      setToggleLoading(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `You are about to delete <strong>"${name}"</strong>.<br/>This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });

    // If user confirmed
    if (result.isConfirmed) {
      setDeleteLoading(id);
      try {
        await api.delete(`/admin/products/${id}`);

        // Show success message
        Swal.fire({
          title: "Deleted!",
          text: `"${name}" has been deleted successfully.`,
          icon: "success",
          confirmButtonColor: "#3b82f6",
          timer: 2000,
          timerProgressBar: true,
        });

        fetchProducts();
      } catch (error) {
        console.error("Delete error:", error);

        // Show error message
        Swal.fire({
          title: "Error!",
          text: "Failed to delete product. Please try again.",
          icon: "error",
          confirmButtonColor: "#3b82f6",
        });
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading size="lg" text="Loading products..." />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-neutral">All Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-200 text-center"
        >
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <p className="text-gray-500 mb-4">No products found</p>
          <Link
            href="/admin/products/add"
            className="text-primary hover:underline"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                          {product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.brand || "No brand"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 font-semibold text-neutral">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock < 10
                              ? "text-orange-600"
                              : "text-green-600"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleToggleActive(product._id, product.isActive)
                        }
                        disabled={toggleLoading === product._id}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                          product.isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } ${toggleLoading === product._id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {toggleLoading === product._id ? (
                          <>
                            <span className="animate-spin">⏳</span>
                            Updating...
                          </>
                        ) : product.isActive ? (
                          <>
                            <Eye className="w-3 h-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete(product._id, product.name)
                          }
                          disabled={deleteLoading === product._id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
