/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { FileText, FolderKanban, Users, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    if (parsedUser.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    fetchAnalytics();
  }, [router]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      const [blogsRes, projectsRes, usersRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const blogsData = await blogsRes.json();
      const projectsData = await projectsRes.json();
      const usersData = await usersRes.json();

      setStats({
        blogs: blogsData.data?.stats || {},
        projects: projectsData.data?.stats || {},
        users: usersData.data?.stats || {},
        recentBlogs: blogsData.data?.recentBlogs || [],
        topBlogs: blogsData.data?.topBlogs || [],
        recentProjects: projectsData.data?.recentProjects || [],
        recentUsers: usersData.data?.recentUsers || [],
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const overviewCards = [
    {
      title: 'Total Blogs',
      value: stats?.blogs?.totalBlogs || 0,
      subtitle: `${stats?.blogs?.publishedBlogs || 0} published`,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Total Projects',
      value: stats?.projects?.totalProjects || 0,
      subtitle: `${stats?.projects?.completedProjects || 0} completed`,
      icon: FolderKanban,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Total Users',
      value: stats?.users?.totalUsers || 0,
      subtitle: `${stats?.users?.verifiedUsers || 0} verified`,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: 'Total Views',
      value: stats?.blogs?.totalViews || 0,
      subtitle: 'All time blog views',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Overview of your portfolio performance and statistics
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {overviewCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{card.value}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{card.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Blogs</CardTitle>
                  <CardDescription>Latest blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.recentBlogs?.map((blog: any) => (
                      <div key={blog.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{blog.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {blog.views} views
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${blog.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Blogs</CardTitle>
                  <CardDescription>Most viewed blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.topBlogs?.map((blog: any, index: number) => (
                      <div key={blog.id} className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{blog.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {blog.views} views
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Latest project updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentProjects?.map((project: any) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        project.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentUsers?.map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}