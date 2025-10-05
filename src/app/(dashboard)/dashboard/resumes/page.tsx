/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Plus, Eye, Download, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function ResumesManagementPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    fetchResumes();
  }, [router]);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resumes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        setResumes(data.data.resumes);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resumes/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        toast("Resume deleted", {
          description: "Resume has been successfully deleted",
        });
        fetchResumes();
      } else {
        toast("Error", {
          description: "Failed to delete resume",
        });
      }
    } catch {
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };

  const handleDownload = async (id: string, title: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resumes/${id}/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast("Download started", {
          description: "Your resume is being downloaded",
        });
      } else {
        toast("Error", {
          description: "Failed to download resume",
        });
      }
    } catch {
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Resumes</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and download your resumes
            </p>
          </div>
          <Button asChild>
            <Link href="/resume-builder">
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Link>
          </Button>
        </div>

        {/* Resumes List */}
        {resumes.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No resumes yet. Create your first resume!
              </p>
              <Button asChild>
                <Link href="/resume-builder">Create Resume</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                    </div>
                    <CardTitle className="text-xl mt-2">
                      {resume.title}
                    </CardTitle>
                    <CardDescription>
                      Created: {formatDate(resume.createdAt)}
                      <br />
                      Updated: {formatDate(resume.updatedAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-2">
                    <Button
                      size="sm"
                      variant="default"
                      className="w-full"
                      onClick={() => handleDownload(resume.id, resume.title)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          router.push(`/resume-builder?edit=${resume.id}`)
                        }
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View/Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(resume.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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
