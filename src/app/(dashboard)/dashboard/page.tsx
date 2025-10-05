/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { FileText, FolderKanban, FileUser, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  blogs: { total: number; published: number; draft: number; totalViews: number };
  projects: { total: number; completed: number; inProgress: number };
  resumes: { total: number };
  users?: { total: number };
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      const [blogsRes, projectsRes, resumesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resumes/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const blogsData = await blogsRes.json();
      const projectsData = await projectsRes.json();
      const resumesData = await resumesRes.json();

      setStats({
        blogs: blogsData.data?.stats || { total: 0, published: 0, draft: 0, totalViews: 0 },
        projects: projectsData.data?.stats || { total: 0, completed: 0, inProgress: 0 },
        resumes: { total: resumesData.data?.stats?.totalResumes || 0 },
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Blogs',
      value: stats?.blogs.total || 0,
      subtitle: `${stats?.blogs.published || 0} published`,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Total Projects',
      value: stats?.projects.total || 0,
      subtitle: `${stats?.projects.completed || 0} completed`,
      icon: FolderKanban,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Total Resumes',
      value: stats?.resumes.total || 0,
      subtitle: 'Created',
      icon: FileUser,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: 'Total Views',
      value: stats?.blogs.totalViews || 0,
      subtitle: 'Blog views',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here&apos;s what&apos;s happening with your portfolio today.
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your portfolio content</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="blogs" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="blogs">Blogs</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="resumes">Resumes</TabsTrigger>
                </TabsList>

                <TabsContent value="blogs" className="space-y-4 mt-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="flex-1">
                      <Link href="/dashboard/blogs/new">
                        <FileText className="mr-2 h-4 w-4" />
                        Create New Blog
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href="/dashboard/blogs">View All Blogs</Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                      <p className="text-2xl font-bold">{stats?.blogs.published || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
                      <p className="text-2xl font-bold">{stats?.blogs.draft || 0}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4 mt-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="flex-1">
                      <Link href="/dashboard/projects/new">
                        <FolderKanban className="mr-2 h-4 w-4" />
                        Create New Project
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href="/dashboard/projects">View All Projects</Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                      <p className="text-2xl font-bold">{stats?.projects.completed || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                      <p className="text-2xl font-bold">{stats?.projects.inProgress || 0}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resumes" className="space-y-4 mt-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="flex-1">
                      <Link href="/resume-builder">
                        <FileUser className="mr-2 h-4 w-4" />
                        Create New Resume
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href="/dashboard/resumes">View All Resumes</Link>
                    </Button>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Resumes</p>
                    <p className="text-2xl font-bold">{stats?.resumes.total || 0}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}