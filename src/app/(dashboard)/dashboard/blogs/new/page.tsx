"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogForm from "@/components/forms/BlogForm";
import { useToast } from "@/hooks/use-toast";
import { CreateBlogInput } from "@/types";

export default function CreateBlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
  }, [router]);

  const handleSubmit = async (data: CreateBlogInput) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast("Blog created", {
          description: "Your blog has been successfully created",
        });

        router.push("/dashboard/blogs");
      } else {
        toast("Error", {
          description: result.error || "Failed to create blog",
        });
      }
    } catch {
      toast("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/blogs")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Create New Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Write and publish a new blog post
          </p>
        </div>

        <BlogForm onSubmit={handleSubmit} isLoading={isLoading} />
      </motion.div>
    </div>
  );
}
