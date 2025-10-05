/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function BlogsManagementPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

    fetchBlogs();
  }, [router]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchQuery, blogs]);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?published=all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
        setFilteredBlogs(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        toast("Blog deleted", {
          description: "Blog has been successfully deleted",
        });
        fetchBlogs();
      } else {
        toast("Error", {
          description: "Failed to delete blog",
        });
      }
    } catch {
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Manage Blogs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/blogs/new">
              <Plus className="mr-2 h-4 w-4" />
              Create New Blog
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search blogs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Blogs List */}
        {filteredBlogs.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchQuery
                  ? "No blogs found matching your search"
                  : "No blogs yet"}
              </p>
              <Button asChild>
                <Link href="/dashboard/blogs/new">Create Your First Blog</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">
                            {blog.title}
                          </CardTitle>
                          {blog.featured && (
                            <Badge className="bg-yellow-500">Featured</Badge>
                          )}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {blog.excerpt}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {blog.tags.slice(0, 3).map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={blog.published ? "default" : "outline"}>
                          {blog.published ? "Published" : "Draft"}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Eye className="h-4 w-4" />
                          {blog.views}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/blog/${blog.slug}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      {/* <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/blogs/edit/${blog.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button> */}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
